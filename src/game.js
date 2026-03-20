import { allCards } from './cards.js'

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

function buildDeck() {
  const pool = [...allCards, ...allCards, ...allCards, ...allCards]
  return shuffle(pool).slice(0, 20).map(card => ({
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
  },
  opponent: {
    hp: 20,
    mana: 0,
    maxMana: 0,
    hand: [],
    board: [],
    deck: [],
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
}

// ── ATTACK WITH A CARD
export function attackWithCard(uid) {
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
      resolveCombat(selected, target)
      gameState.selectedCard = null
    }
  }
}

// ── COMBAT RESOLUTION
function resolveCombat(attacker, defender) {
  attacker.currentHp -= defender.attack
  defender.currentHp -= attacker.attack
  attacker.exhausted = true
  gameState.log.push(`⚔️ ${attacker.name} (${attacker.attack} atk) vs ${defender.name} (${defender.attack} atk)`)

  gameState.player.board   = gameState.player.board.filter(c => c.currentHp > 0)
  gameState.opponent.board = gameState.opponent.board.filter(c => c.currentHp > 0)

  if (attacker.currentHp <= 0) gameState.log.push(`💀 ${attacker.name} died.`)
  if (defender.currentHp <= 0) gameState.log.push(`💀 ${defender.name} died.`)
}

// ── END TURN
export function endTurn() {
  gameState.phase = 'play'
  gameState.selectedCard = null
  gameState.turn = 'opponent'
  gameState.log.push(`⏭️ You ended your turn.`)
  setTimeout(() => { opponentTurn() }, 800)
}

// ── OPPONENT AI
function opponentTurn() {
  const opp = gameState.opponent

  // Gain mana (skip increment on very first turn if opponent went first)
  if (gameState._skipOpponentManaIncrement) {
    gameState._skipOpponentManaIncrement = false
  } else {
    opp.maxMana = Math.min(10, opp.maxMana + 1)
    opp.mana = opp.maxMana
  }

  // Enable attacking only for creatures already on board
  opp.board.forEach(c => { c.canAttack = true; c.exhausted = false })

  // Play cards (new ones get summoning sickness)
  let played = true
  while (played) {
    played = false
    const idx = opp.hand.findIndex(c => c.mana <= opp.mana)
    if (idx !== -1) {
      const card = opp.hand.splice(idx, 1)[0]
      opp.mana -= card.mana
      card.canAttack = false
      card.exhausted = false
      opp.board.push(card)
      gameState.log.push(`🤖 Opponent played ${card.name}.`)
      played = true
    }
  }

  // Attack with eligible creatures
  opp.board.forEach(attacker => {
    if (attacker.canAttack && !attacker.exhausted) {
      if (gameState.player.board.length > 0) {
        const target = gameState.player.board[Math.floor(Math.random() * gameState.player.board.length)]
        resolveCombat(attacker, target)
      } else {
        gameState.player.hp -= attacker.attack
        attacker.exhausted = true
        gameState.log.push(`🤖 ${attacker.name} attacked your hero for ${attacker.attack}!`)
        checkWin()
      }
    }
  })

  // Draw a card
  if (opp.deck.length > 0) opp.hand.push(opp.deck.shift())

  // Start player turn
  gameState.turn = 'player'
  gameState.phase = 'play'
  gameState.turnNumber++

  gameState.player.maxMana = Math.min(10, gameState.player.maxMana + 1)
  gameState.player.mana = gameState.player.maxMana
  gameState.player.board.forEach(c => { c.canAttack = true; c.exhausted = false })
  if (gameState.player.deck.length > 0) gameState.player.hand.push(gameState.player.deck.shift())

  gameState.log.push(`🎮 Your turn! Mana: ${gameState.player.mana}`)

  import('./main.js').then(m => m.renderBoard())
}

// ── WIN CHECK
export function checkWin() {
  if (gameState.opponent.hp <= 0) {
    gameState.gameOver = true
    gameState.winner = 'player'
    gameState.log.push('🏆 You win!')
  }
  if (gameState.player.hp <= 0) {
    gameState.gameOver = true
    gameState.winner = 'opponent'
    gameState.log.push('💀 You lost!')
  }
}

// Trigger opponent first turn if they won the coin flip
if (gameState._opponentGoesFirst) {
  setTimeout(() => { opponentTurn() }, 1200)
}

export function freshGame() {
  const pd = buildDeck()
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
    player: { hp: 20, mana: 0, maxMana: 0, hand: pd.slice(0, 5), deck: pd.slice(5), board: [] },
    opponent: { hp: 20, mana: 0, maxMana: 0, hand: od.slice(0, 5), deck: od.slice(5), board: [] },
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