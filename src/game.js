import { animateCardHit, animateCardDeath, animateCardLunge, animateHeroHit, animateCardPlayed, animateCardPlayedFromHand, floatDamage } from './main.js'
import { allCards } from './cards.js'
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
  card.canAttack = false
  card.exhausted = false
  gameState.player.board.push(card)
  gameState.log.push(`▶️ You played ${card.name}.`)
  playSound('card_play')
  setTimeout(() => animateCardPlayed(card.uid), 50)
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
      await resolveCombat(selected, target)
      gameState.selectedCard = null
    }
  }
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

  // Death animations
  const dyingUids = []
  if (attacker.currentHp <= 0) { dyingUids.push(attacker.uid); gameState.log.push(`💀 ${attacker.name} died.`) }
  if (defender.currentHp <= 0) { dyingUids.push(defender.uid); gameState.log.push(`💀 ${defender.name} died.`) }

  if (dyingUids.length > 0) {
    playSound('death')
    await Promise.all(dyingUids.map(uid => animateCardDeath(uid)))
  }

  // Move dead creatures to graveyard
  gameState.player.board.forEach(c => { if (c.currentHp <= 0) gameState.player.graveyard.push({...c}) })
  gameState.opponent.board.forEach(c => { if (c.currentHp <= 0) gameState.opponent.graveyard.push({...c}) })
  gameState.player.board   = gameState.player.board.filter(c => c.currentHp > 0)
  gameState.opponent.board = gameState.opponent.board.filter(c => c.currentHp > 0)
}

// ── END TURN
export function endTurn() {
  gameState.phase = 'play'
  gameState.selectedCard = null
  gameState.turn = 'opponent'
  gameState.log.push(`⏭️ You ended your turn.`)
  setTimeout(() => { opponentTurn() }, 800)
}

// ── AI HELPERS

// Score a card by value (attack + hp relative to mana)
function cardValue(card) {
  return card.attack + card.currentHp
}

// Find the best trade: attacker kills defender without dying
function findBestTrade(attacker, targets) {
  // First priority: kill target without dying
  const safekills = targets.filter(t =>
    attacker.attack >= t.currentHp && t.attack < attacker.currentHp
  )
  if (safekills.length > 0) {
    // Among safe kills, pick highest value target
    return safekills.reduce((best, t) => cardValue(t) > cardValue(best) ? t : best)
  }

  // Second priority: kill target even if we die (trade if target is worth more)
  const trades = targets.filter(t =>
    attacker.attack >= t.currentHp && cardValue(t) >= cardValue(attacker)
  )
  if (trades.length > 0) {
    return trades.reduce((best, t) => cardValue(t) > cardValue(best) ? t : best)
  }

  // Third priority: damage highest HP target to set up future kills
  return targets.reduce((best, t) => cardValue(t) > cardValue(best) ? t : best)
}

// Can we lethal the player this turn?
function canLethal(attackers) {
  const totalDamage = attackers.reduce((sum, a) => sum + a.attack, 0)
  return totalDamage >= gameState.player.hp
}

// Pick the best cards to play given remaining mana
function pickCardsToPlay(hand, mana) {
  // Sort by value descending (best card first)
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

  // Gain mana
  if (gameState._skipOpponentManaIncrement) {
    gameState._skipOpponentManaIncrement = false
  } else {
    opp.maxMana = Math.min(10, opp.maxMana + 1)
    opp.mana = opp.maxMana
  }

  // Step 1 — mark existing creatures as able to attack
  opp.board.forEach(c => { c.canAttack = true; c.exhausted = false })
  const existingAttackerUids = opp.board.map(c => c.uid)

  // Step 2 — smart card playing
  // Pick best combination of cards to play with available mana
  const cardsToPlay = pickCardsToPlay(opp.hand, opp.mana)
  for (const card of cardsToPlay) {
    const idx = opp.hand.findIndex(c => c.uid === card.uid)
    if (idx === -1) continue
    if (card.mana > opp.mana) continue
    opp.hand.splice(idx, 1)
    opp.mana -= card.mana
    card.canAttack = false
    card.exhausted = false
    gameState.log.push(`🤖 Opponent played ${card.name}.`)
    playSound('card_play')
    await animateCardPlayedFromHand(card, true)
    opp.board.push(card)
    import('./main.js').then(m => m.renderBoard())
    await new Promise(r => setTimeout(r, 300))
  }

  // Step 3 — smart attacking
  const playerBoard = gameState.player.board

  // Check if we can win this turn (lethal check)
  const availableAttackers = existingAttackerUids
    .map(uid => opp.board.find(c => c.uid === uid))
    .filter(c => c && c.currentHp > 0 && !c.exhausted)

  if (playerBoard.length === 0 && canLethal(availableAttackers)) {
    // Go face for lethal
    for (const attacker of availableAttackers) {
      if (attacker.currentHp <= 0 || attacker.exhausted) continue
      gameState.player.hp -= attacker.attack
      attacker.exhausted = true
      animateHeroHit('player')
      playSound('attack')
      gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${attacker.attack}! (LETHAL)`)
      checkWin()
      if (gameState.gameOver) break
    }
  } else {
    // Smart trading and face damage
    for (const uid of existingAttackerUids) {
      const attacker = opp.board.find(c => c.uid === uid)
      if (!attacker || attacker.currentHp <= 0 || attacker.exhausted) continue

      const currentPlayerBoard = gameState.player.board

      if (currentPlayerBoard.length > 0) {
        // Find best trade
        const target = findBestTrade(attacker, currentPlayerBoard)
        await resolveCombat(attacker, target)
      } else {
        // No creatures — go face
        gameState.player.hp -= attacker.attack
        attacker.exhausted = true
        animateHeroHit('player')
        playSound('attack')
        gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${attacker.attack}!`)
        checkWin()
      }

      if (gameState.gameOver) break
    }

    // After clearing board, any remaining attackers go face
    for (const uid of existingAttackerUids) {
      const attacker = opp.board.find(c => c.uid === uid)
      if (!attacker || attacker.currentHp <= 0 || attacker.exhausted) continue
      if (gameState.player.board.length === 0) {
        gameState.player.hp -= attacker.attack
        attacker.exhausted = true
        animateHeroHit('player')
        playSound('attack')
        gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${attacker.attack}!`)
        checkWin()
        if (gameState.gameOver) break
      }
    }
  }

  // Draw a card (opponent) — fatigue if empty
  if (opp.deck.length > 0) {
    opp.hand.push(opp.deck.shift())
  } else {
    opp.fatigueDamage += 1
    opp.hp -= opp.fatigueDamage
    gameState.log.push(`💀 Opponent has no cards! Fatigue deals ${opp.fatigueDamage} damage.`)
    checkWin()
  }

  // Start player turn
  gameState.turn = 'player'
  gameState.phase = 'play'
  gameState.turnNumber++

  gameState.player.maxMana = Math.min(10, gameState.player.maxMana + 1)
  gameState.player.mana = gameState.player.maxMana
  gameState.player.board.forEach(c => { c.canAttack = true; c.exhausted = false })

  // Draw a card (player) — fatigue if empty
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

export function freshGame(slot = 1) {
  const pd = buildDeck(slot)
  const od = buildOpponentDeck()
  const fresh = {
    turn: 'player',
    phase: 'play',
    turnNumber: 1,
    selectedCard: null,
    gameOver: false,
    winner: null,
    log: [],
    _opponentGoesFirst: false,
    _skipOpponentManaIncrement: false,
    player: { hp: 20, mana: 0, maxMana: 0, hand: pd.slice(0, 5), deck: pd.slice(5), board: [], graveyard: [], fatigueDamage: 0 },
    opponent: { hp: 20, mana: 0, maxMana: 0, hand: od.slice(0, 5), deck: od.slice(5), board: [], graveyard: [], fatigueDamage: 0 },
  }
  if (Math.random() < 0.5) {
    fresh.turn = 'opponent'
    fresh.log = ['🎲 Opponent goes first!']
    fresh._opponentGoesFirst = true
    fresh._skipOpponentManaIncrement = true
    fresh.opponent.mana = 1
    fresh.opponent.maxMana = 1
  } else {
    fresh.log = ['🎲 You go first!']
    fresh.player.mana = 1
    fresh.player.maxMana = 1
  }
  return fresh
}

export function triggerOpponentFirst() {
  if (gameState._opponentGoesFirst) {
    opponentTurn()
  }
}