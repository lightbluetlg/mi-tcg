import { animateCardHit, animateCardDeath, animateCardLunge, animateHeroHit, animateCardPlayed, animateCardPlayedFromHand, floatDamage } from './main.js'
import { allCards } from './cards.js'
import { allHeroes } from './heroes.js'
import { playSound } from './audio.js'

// ── HELPERS
let uidCounter = 1
function makeUID() { return uidCounter++ }

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(slot = 1) {
  const saved = localStorage.getItem(`ravenclash_deck_${slot}`)
  const data = saved ? JSON.parse(saved) : null
  const cards = data?.cards || (Array.isArray(data) ? data : null)
  const base = cards && cards.length > 0 ? cards : [...allCards, ...allCards].slice(0, 20)
  return shuffle([...base]).map(card => ({
    ...card,
    uid: makeUID(),
    currentHp: card.hp,
    canAttack: false,
    exhausted: false,
    isOpponent: false,
  }))
}

function buildOpponentDeck() {
  const pool = [...allCards, ...allCards, ...allCards, ...allCards]
  return shuffle(pool).slice(0, 20).map(card => ({
    ...card,
    uid: makeUID(),
    currentHp: card.hp,
    canAttack: false,
    exhausted: false,
    isOpponent: true,
  }))
}

// ── GAME STATE
export const gameState = {
  turn: 'player',
  phase: 'play',
  turnNumber: 1,
  selectedCard: null,
  gameOver: false,
  winner: null,
  log: ['🎮 Game started! Your turn.'],
  _opponentGoesFirst: false,
  _skipOpponentManaIncrement: false,
  _omenPending: null,
  _abilityTargeting: false,
  hero: null,
  heroAbilityUsed: false,
  player: {
    hp: 20,
    mana: 0,
    maxMana: 0,
    hand: [],
    board: [],
    deck: [],
    graveyard: [],
    fatigueDamage: 0,
  },
  opponent: {
    hp: 20,
    mana: 0,
    maxMana: 0,
    hand: [],
    board: [],
    deck: [],
    graveyard: [],
    fatigueDamage: 0,
  }
}

// Deal opening hands
const playerDeck = buildDeck()
const opponentDeck = buildOpponentDeck()
gameState.player.deck = playerDeck.slice(5)
gameState.player.hand = playerDeck.slice(0, 5)
gameState.opponent.deck = opponentDeck.slice(5)
gameState.opponent.hand = opponentDeck.slice(0, 5)

// Random first player
if (Math.random() < 0.5) {
  gameState.turn = 'opponent'
  gameState.log = ['🎲 Opponent goes first!']
  gameState._opponentGoesFirst = true
  gameState._skipOpponentManaIncrement = true
  gameState.opponent.mana = 1
  gameState.opponent.maxMana = 1
} else {
  gameState.log = ['🎲 You go first!']
  gameState.player.mana = 1
  gameState.player.maxMana = 1
}

// ── PLAY A CARD FROM HAND
export function playCard(uid) {
  if (gameState.turn !== 'player' || gameState.phase !== 'play') return
  const idx = gameState.player.hand.findIndex(c => c.uid === uid)
  if (idx === -1) return
  const card = gameState.player.hand[idx]
  if (card.mana > gameState.player.mana) {
    gameState.log.push(`❌ Not enough mana to play ${card.name}.`)
    return
  }
  gameState.player.mana -= card.mana
  gameState.player.hand.splice(idx, 1)

  // Ambush: can attack immediately
  let hasAmbush = card.keywords?.includes('Ambush')

  // Hero passives on play
  const hero = gameState.hero
  if (hero) {
    if (hero.id === 'skorn' && card.keywords?.includes('Warden')) {
      card.hp += 1
      card.currentHp += 1
      gameState.log.push(`🖤 Lord Skorn's passive: ${card.name} gains +1 HP!`)
    }
    if (hero.id === 'djinn' && card.keywords?.includes('Ambush')) {
      card.attack += 1
      gameState.log.push(`✨ Djinn Colossus passive: ${card.name} gains +1 Attack!`)
    }
    if (hero.id === 'djinn' && !hasAmbush) {
      // Unleash effect carries over if active
    }
  }

  card.canAttack = hasAmbush ? true : false
  card.exhausted = false
  gameState.player.board.push(card)
  gameState.log.push(`▶️ You played ${card.name}.`)
  playSound('card_play')
  setTimeout(() => animateCardPlayed(card.uid), 50)

  // Omen: look at top 3 cards, pick 1 to keep on top
  if (card.keywords?.includes('Omen')) {
    triggerOmen(gameState.player)
  }
}

// ── ATTACK WITH A CARD
export async function attackWithCard(uid) {
  if (gameState.turn !== 'player' || gameState.phase !== 'attack') return

  const attacker = gameState.player.board.find(c => c.uid === uid)

  // Clicking your own creature to select it
  if (attacker && !attacker.isOpponent) {
    if (!attacker.canAttack) {
      gameState.log.push(`😴 ${attacker.name} has summoning sickness — wait a turn.`)
      gameState.selectedCard = null
      return
    }
    if (attacker.exhausted) {
      gameState.log.push(`😓 ${attacker.name} already attacked this turn.`)
      gameState.selectedCard = null
      return
    }
    gameState.selectedCard = attacker
    gameState.log.push(`🎯 ${attacker.name} ready — click an enemy creature or the opponent's hero.`)
    return
  }

  // Clicking an opponent creature as target
  if (gameState.selectedCard) {
    const selected = gameState.selectedCard
    const target = gameState.opponent.board.find(c => c.uid === uid)
    if (target) {
      // Warden check: must attack a Warden if one exists
      const wardens = gameState.opponent.board.filter(c => c.keywords?.includes('Warden'))
      if (wardens.length > 0 && !target.keywords?.includes('Warden')) {
        gameState.log.push(`🛡️ You must attack a Warden creature first!`)
        gameState.selectedCard = null
        return
      }
      await resolveCombat(selected, target)
      gameState.selectedCard = null
    }
  }
}

// ── ATTACK HERO
export function attackHero(attackerUid) {
  if (gameState.turn !== 'player' || gameState.phase !== 'attack') return
  const attacker = gameState.player.board.find(c => c.uid === attackerUid)
  if (!attacker || !attacker.canAttack || attacker.exhausted) return

  // Warden check: cannot attack hero while any Warden is on opponent board
  const wardens = gameState.opponent.board.filter(c => c.keywords?.includes('Warden'))
  if (wardens.length > 0) {
    gameState.log.push(`🛡️ Can't attack the hero — a Warden is protecting them!`)
    gameState.selectedCard = null
    return
  }

  // Apex: double damage to heroes
  const damage = attacker.keywords?.includes('Apex')
    ? attacker.attack * 2
    : attacker.attack

  gameState.opponent.hp -= damage
  attacker.exhausted = true
  gameState.selectedCard = null
  animateHeroHit('opponent')
  playSound('attack')
  gameState.log.push(`⚔️ ${attacker.name} attacked the enemy hero for ${damage}!${attacker.keywords?.includes('Apex') ? ' (Apex - double damage!)' : ''}`)

  // Leech: heal your hero for damage dealt
  if (attacker.keywords?.includes('Leech')) {
    gameState.player.hp = Math.min(30, gameState.player.hp + damage)
    gameState.log.push(`🩸 ${attacker.name} leeched ${damage} HP back to you!`)
  }

  checkWin()
  import('./main.js').then(m => m.renderBoard())
}

// ── COMBAT RESOLUTION
async function resolveCombat(attacker, defender) {
  // Lunge animations
  const attackerIsPlayer = !attacker.isOpponent
  await animateCardLunge(attacker.uid, attackerIsPlayer ? 'up' : 'down')

  // Hit animations + sound
  playSound('attack')
  animateCardHit(defender.uid)
  animateCardHit(attacker.uid)

  // Floating damage numbers
  const defenderEl = document.querySelector(`[data-uid="${defender.uid}"]`)
  const attackerEl = document.querySelector(`[data-uid="${attacker.uid}"]`)
  if (defenderEl) floatDamage(attacker.attack, defenderEl)
  if (attackerEl) floatDamage(defender.attack, attackerEl)

  // Apply damage
  attacker.currentHp -= defender.attack
  defender.currentHp -= attacker.attack
  attacker.exhausted = true

  gameState.log.push(`⚔️ ${attacker.name} (${attacker.attack} atk) vs ${defender.name} (${defender.attack} atk)`)

  // Leech: attacker heals its owner's hero for damage dealt
  if (attacker.keywords?.includes('Leech')) {
    const leecher = attacker.isOpponent ? gameState.opponent : gameState.player
    leecher.hp = Math.min(30, leecher.hp + attacker.attack)
    gameState.log.push(`🩸 ${attacker.name} leeched ${attacker.attack} HP!`)
  }

  // Death animations
  const dyingUids = []
  if (attacker.currentHp <= 0) { dyingUids.push(attacker.uid); gameState.log.push(`💀 ${attacker.name} died.`) }
  if (defender.currentHp <= 0) { dyingUids.push(defender.uid); gameState.log.push(`💀 ${defender.name} died.`) }

  if (dyingUids.length > 0) {
    playSound('death')
    await Promise.all(dyingUids.map(uid => animateCardDeath(uid)))
  }

  // Hollow: spawn a 1/1 Echo token for each dying Hollow creature
  const allDying = [
    ...gameState.player.board.filter(c => c.currentHp <= 0),
    ...gameState.opponent.board.filter(c => c.currentHp <= 0),
  ]
  for (const dying of allDying) {
    if (dying.keywords?.includes('Hollow')) {
      const owner = dying.isOpponent ? gameState.opponent : gameState.player
      if (owner.board.length < 7) {
        const echo = {
          uid: makeUID(),
          id: 0,
          name: `${dying.name} Echo`,
          image: dying.image,
          mana: 1,
          attack: 1,
          hp: 1,
          currentHp: 1,
          rarity: dying.rarity,
          keywords: [],
          lore: '',
          canAttack: false,
          exhausted: false,
          isOpponent: dying.isOpponent,
        }
        owner.board.push(echo)
        gameState.log.push(`👻 ${dying.name}'s Hollow summoned a 1/1 Echo token!`)
      }
    }
  }

  // Move dead creatures to graveyard
  gameState.player.board.forEach(c => { if (c.currentHp <= 0) gameState.player.graveyard.push({...c}) })
  gameState.opponent.board.forEach(c => { if (c.currentHp <= 0) gameState.opponent.graveyard.push({...c}) })
  gameState.player.board   = gameState.player.board.filter(c => c.currentHp > 0)
  gameState.opponent.board = gameState.opponent.board.filter(c => c.currentHp > 0)
}

// ── END TURN
export function endTurn() {
  // Clean up temp Unleash keywords
  gameState.player.board.forEach(c => {
    if (c._unleashTemp) {
      c.keywords = c.keywords.filter(k => k !== 'Ambush')
      c._unleashTemp = false
    }
  })
  gameState.phase = 'play'
  gameState.selectedCard = null
  gameState._abilityTargeting = null
  gameState.turn = 'opponent'
  gameState.log.push(`⏭️ You ended your turn.`)
  setTimeout(() => { opponentTurn() }, 800)
}

// ── AI HELPERS

function cardValue(card) {
  return card.attack + card.currentHp
}

function findBestTrade(attacker, targets) {
  const safekills = targets.filter(t =>
    attacker.attack >= t.currentHp && t.attack < attacker.currentHp
  )
  if (safekills.length > 0) {
    return safekills.reduce((best, t) => cardValue(t) > cardValue(best) ? t : best)
  }
  const trades = targets.filter(t =>
    attacker.attack >= t.currentHp && cardValue(t) >= cardValue(attacker)
  )
  if (trades.length > 0) {
    return trades.reduce((best, t) => cardValue(t) > cardValue(best) ? t : best)
  }
  return targets.reduce((best, t) => cardValue(t) > cardValue(best) ? t : best)
}

function canLethal(attackers) {
  const totalDamage = attackers.reduce((sum, a) => sum + a.attack, 0)
  return totalDamage >= gameState.player.hp
}

function pickCardsToPlay(hand, mana) {
  const sorted = [...hand].sort((a, b) => cardValue(b) - cardValue(a))
  const toPlay = []
  let remaining = mana
  for (const card of sorted) {
    if (card.mana <= remaining) {
      toPlay.push(card)
      remaining -= card.mana
    }
  }
  return toPlay
}

// ── OPPONENT AI (HARD)
async function opponentTurn() {
  const opp = gameState.opponent

  if (gameState._skipOpponentManaIncrement) {
    gameState._skipOpponentManaIncrement = false
  } else {
    opp.maxMana = Math.min(10, opp.maxMana + 1)
    opp.mana = opp.maxMana
  }

  opp.board.forEach(c => { c.canAttack = true; c.exhausted = false })
  const existingAttackerUids = opp.board.map(c => c.uid)

  const cardsToPlay = pickCardsToPlay(opp.hand, opp.mana)
  for (const card of cardsToPlay) {
    const idx = opp.hand.findIndex(c => c.uid === card.uid)
    if (idx === -1) continue
    if (card.mana > opp.mana) continue
    opp.hand.splice(idx, 1)
    opp.mana -= card.mana
    card.canAttack = card.keywords?.includes('Ambush') ? true : false
    card.exhausted = false
    gameState.log.push(`🤖 Opponent played ${card.name}.`)
    playSound('card_play')
    await animateCardPlayedFromHand(card, true)
    opp.board.push(card)
    import('./main.js').then(m => m.renderBoard())
    await new Promise(r => setTimeout(r, 300))
  }

  const playerBoard = gameState.player.board
  const availableAttackers = existingAttackerUids
    .map(uid => opp.board.find(c => c.uid === uid))
    .filter(c => c && c.currentHp > 0 && !c.exhausted)

  // AI respects player's Warden creatures
  const playerWardens = gameState.player.board.filter(c => c.keywords?.includes('Warden'))

  if (playerBoard.length === 0 && canLethal(availableAttackers)) {
    for (const attacker of availableAttackers) {
      if (attacker.currentHp <= 0 || attacker.exhausted) continue
      const damage = attacker.keywords?.includes('Apex') ? attacker.attack * 2 : attacker.attack
      gameState.player.hp -= damage
      attacker.exhausted = true
      animateHeroHit('player')
      playSound('attack')
      gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${damage}! (LETHAL)`)
      checkWin()
      if (gameState.gameOver) break
    }
  } else {
    for (const uid of existingAttackerUids) {
      const attacker = opp.board.find(c => c.uid === uid)
      if (!attacker || attacker.currentHp <= 0 || attacker.exhausted) continue

      const currentPlayerBoard = gameState.player.board
      const currentWardens = currentPlayerBoard.filter(c => c.keywords?.includes('Warden'))

      if (currentPlayerBoard.length > 0) {
        // Must target a Warden if one exists
        const targets = currentWardens.length > 0 ? currentWardens : currentPlayerBoard
        const target = findBestTrade(attacker, targets)
        await resolveCombat(attacker, target)
      } else {
        // No creatures — go face
        const damage = attacker.keywords?.includes('Apex') ? attacker.attack * 2 : attacker.attack
        gameState.player.hp -= damage
        attacker.exhausted = true
        animateHeroHit('player')
        playSound('attack')
        gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${damage}!`)
        checkWin()
      }

      if (gameState.gameOver) break
    }

    for (const uid of existingAttackerUids) {
      const attacker = opp.board.find(c => c.uid === uid)
      if (!attacker || attacker.currentHp <= 0 || attacker.exhausted) continue
      if (gameState.player.board.length === 0) {
        const damage = attacker.keywords?.includes('Apex') ? attacker.attack * 2 : attacker.attack
        gameState.player.hp -= damage
        attacker.exhausted = true
        animateHeroHit('player')
        playSound('attack')
        gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${damage}!`)
        checkWin()
        if (gameState.gameOver) break
      }
    }
  }

  if (opp.deck.length > 0) {
    opp.hand.push(opp.deck.shift())
  } else {
    opp.fatigueDamage += 1
    opp.hp -= opp.fatigueDamage
    gameState.log.push(`💀 Opponent has no cards! Fatigue deals ${opp.fatigueDamage} damage.`)
    checkWin()
  }

  gameState.turn = 'player'
  gameState.phase = 'play'
  gameState.turnNumber++
  gameState.heroAbilityUsed = false

  gameState.player.maxMana = Math.min(10, gameState.player.maxMana + 1)
  gameState.player.mana = gameState.player.maxMana
  gameState.player.board.forEach(c => { c.canAttack = true; c.exhausted = false })

  if (gameState.player.deck.length > 0) {
    gameState.player.hand.push(gameState.player.deck.shift())
  } else {
    gameState.player.fatigueDamage += 1
    gameState.player.hp -= gameState.player.fatigueDamage
    gameState.log.push(`💀 You have no cards! Fatigue deals ${gameState.player.fatigueDamage} damage.`)
    checkWin()
  }

  playSound('turn')
  playSound('card_draw')
  gameState.log.push(`🎮 Your turn! Mana: ${gameState.player.mana}`)

  import('./main.js').then(m => m.renderBoard())
}

// ── WIN CHECK
export function checkWin() {
  if (gameState.opponent.hp <= 0) {
    gameState.gameOver = true
    gameState.winner = 'player'
    gameState.log.push('🏆 You win!')
    playSound('victory')
  }
  if (gameState.player.hp <= 0) {
    gameState.gameOver = true
    gameState.winner = 'opponent'
    gameState.log.push('💀 You lost!')
    playSound('defeat')
  }
}

export function freshGame(slot = 1, heroId = null) {
  const pd = buildDeck(slot)
  const od = buildOpponentDeck()
  const hero = heroId ? allHeroes.find(h => h.id === heroId) || null : null

  // Igneas passive: opponent starts with 1 less mana on turn 1
  const igneasActive = hero?.id === 'igneas'

  const fresh = {
    turn: 'player',
    phase: 'play',
    turnNumber: 1,
    selectedCard: null,
    gameOver: false,
    winner: null,
    log: hero ? [`⚔️ ${hero.name} enters the battle!`] : [],
    _opponentGoesFirst: false,
    _skipOpponentManaIncrement: false,
    _omenPending: null,
    _abilityTargeting: null,
    hero,
    heroAbilityUsed: false,
    player: { hp: 20, mana: 0, maxMana: 0, hand: pd.slice(0, 5), deck: pd.slice(5), board: [], graveyard: [], fatigueDamage: 0 },
    opponent: { hp: 20, mana: 0, maxMana: 0, hand: od.slice(0, 5), deck: od.slice(5), board: [], graveyard: [], fatigueDamage: 0 },
  }

  if (Math.random() < 0.5) {
    fresh.turn = 'opponent'
    fresh.log.push('🎲 Opponent goes first!')
    fresh._opponentGoesFirst = true
    fresh._skipOpponentManaIncrement = true
    fresh.opponent.mana = igneasActive ? 0 : 1
    fresh.opponent.maxMana = igneasActive ? 0 : 1
  } else {
    fresh.log.push('🎲 You go first!')
    fresh.player.mana = 1
    fresh.player.maxMana = 1
    if (igneasActive) {
      fresh.opponent.mana = 0
      fresh.opponent.maxMana = 0
      fresh.log.push(`🔵 Igneas passive: Opponent starts with 0 mana!`)
    }
  }

  // Serafine passive: draw 1 extra card on first turn
  if (hero?.id === 'serafine' && fresh.turn === 'player') {
    if (fresh.player.deck.length > 0) {
      fresh.player.hand.push(fresh.player.deck.shift())
      fresh.log.push(`💜 Serafine's passive: You draw an extra card!`)
    }
  }

  return fresh
}

// ── HERO ABILITY
export function useHeroAbility() {
  const hero = gameState.hero
  if (!hero) return
  if (gameState.heroAbilityUsed) {
    gameState.log.push(`❌ Hero ability already used this turn.`)
    import('./main.js').then(m => m.renderBoard())
    return
  }
  if (gameState.player.mana < hero.abilityCost) {
    gameState.log.push(`❌ Not enough mana for ${hero.abilityName}.`)
    import('./main.js').then(m => m.renderBoard())
    return
  }
  if (gameState.turn !== 'player') return

  const effect = hero.abilityEffect

  // Non-targeting abilities
  if (effect === 'foresight') {
    gameState.player.mana -= hero.abilityCost
    gameState.heroAbilityUsed = true
    gameState.log.push(`🔮 Serafine's Foresight activated!`)
    triggerOmen(gameState.player)
    import('./main.js').then(m => m.renderBoard())
    return
  }

  // Targeting abilities — set targeting mode
  gameState._abilityTargeting = effect
  gameState.player.mana -= hero.abilityCost
  gameState.heroAbilityUsed = true

  if (effect === 'fortify') {
    gameState.log.push(`🛡️ Fortify: Click a friendly creature to give it +2 HP.`)
  } else if (effect === 'bloodprice') {
    gameState.log.push(`🩸 Blood Price: Click any creature to deal 3 damage to it.`)
  } else if (effect === 'unleash') {
    gameState.log.push(`⚡ Unleash: Click a friendly creature to give it Ambush.`)
  } else if (effect === 'glacialgrasp') {
    gameState.log.push(`❄️ Glacial Grasp: Click an enemy creature to exhaust it.`)
  }

  import('./main.js').then(m => m.renderBoard())
}

export function resolveAbilityTarget(uid) {
  const effect = gameState._abilityTargeting
  if (!effect) return false

  const playerCard = gameState.player.board.find(c => c.uid === uid)
  const opponentCard = gameState.opponent.board.find(c => c.uid === uid)

  if (effect === 'fortify') {
    if (!playerCard) return false
    playerCard.hp += 2
    playerCard.currentHp += 2
    gameState.log.push(`🛡️ ${playerCard.name} gains +2 HP from Fortify!`)
  } else if (effect === 'bloodprice') {
    const target = playerCard || opponentCard
    if (!target) return false
    target.currentHp -= 3
    gameState.player.hp -= 1
    gameState.log.push(`🩸 Blood Price deals 3 damage to ${target.name}! You lose 1 HP.`)
    // Remove dead creatures
    gameState.player.board.forEach(c => { if (c.currentHp <= 0) gameState.player.graveyard.push({...c}) })
    gameState.opponent.board.forEach(c => { if (c.currentHp <= 0) gameState.opponent.graveyard.push({...c}) })
    gameState.player.board = gameState.player.board.filter(c => c.currentHp > 0)
    gameState.opponent.board = gameState.opponent.board.filter(c => c.currentHp > 0)
    checkWin()
  } else if (effect === 'unleash') {
    if (!playerCard) return false
    if (!playerCard.keywords) playerCard.keywords = []
    playerCard.keywords.push('Ambush')
    playerCard.canAttack = true
    playerCard._unleashTemp = true
    gameState.log.push(`⚡ ${playerCard.name} gains Ambush from Unleash!`)
  } else if (effect === 'glacialgrasp') {
    if (!opponentCard) return false
    opponentCard.exhausted = true
    opponentCard.canAttack = false
    opponentCard._frosted = true
    gameState.log.push(`❄️ ${opponentCard.name} is frozen by Glacial Grasp!`)
  }

  gameState._abilityTargeting = null
  import('./main.js').then(m => m.renderBoard())
  return true
}

// ── OMEN
export function triggerOmen(playerState) {
  const deck = playerState.deck
  if (deck.length === 0) return
  const revealed = deck.splice(0, Math.min(3, deck.length))
  gameState._omenPending = { owner: playerState, cards: revealed }
  import('./main.js').then(m => m.showOmenModal(revealed))
}

export function resolveOmen(chosenUid) {
  const pending = gameState._omenPending
  if (!pending) return
  const { owner, cards } = pending
  const chosen = cards.find(c => c.uid === chosenUid)
  const rest = cards.filter(c => c.uid !== chosenUid)
  owner.deck.unshift(chosen)
  owner.deck.push(...rest)
  gameState._omenPending = null
  gameState.log.push(`🔮 Omen resolved — card placed on top of your deck.`)
  import('./main.js').then(m => m.renderBoard())
}

export function triggerOpponentFirst() {
  if (gameState._opponentGoesFirst) {
    opponentTurn()
  }
}