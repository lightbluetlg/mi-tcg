import './style.css'
import { router } from './router.js'
import { renderMenu } from './pages/menu.js'
import { renderDeckBuilder, getSavedDeck } from './pages/deckbuilder.js'
import { gameState, playCard, attackWithCard, endTurn, checkWin } from './game.js'
import { allCards } from './cards.js'

const rarityFrames = {
  uncommon:  'RavenCard_Green_Frame.png',
  rare:      'RavenCard_Blue_Frame.png',
  epic:      'RavenCard_Purple_Frame.png',
  legendary: 'RavenCard_Frame.png',
}

export function renderCard(card, context = 'hand') {
  const isLegendary = card.rarity === 'legendary'
  const canPlay = context === 'hand' && card.mana <= gameState.player.mana && gameState.phase === 'play'
  const canAttack = context === 'board' && card.canAttack && gameState.phase === 'attack' && !card.isOpponent
  const isSelected = gameState.selectedCard && gameState.selectedCard.uid === card.uid

  return `
    <div class="card rarity-${card.rarity}
      ${canPlay ? 'playable' : ''}
      ${canAttack ? 'can-attack' : ''}
      ${isSelected ? 'selected' : ''}
      ${card.exhausted ? 'exhausted' : ''}"
      data-uid="${card.uid}"
      data-context="${context}">
      ${isLegendary ? `<div class="sparkle-container">
        <span class="sparkle">✦</span><span class="sparkle">✦</span>
        <span class="sparkle">✦</span><span class="sparkle">✦</span>
        <span class="sparkle">✦</span>
      </div>` : ''}
      <div class="card-image">
        <img src="/cards/${card.image}" alt="${card.name}" />
        <div class="art-vignette"></div>
      </div>
      <div class="card-frame">
        <img src="/${rarityFrames[card.rarity]}" alt="frame" />
      </div>
      <div class="card-mana">${card.mana}</div>
      <div class="card-name">${card.name}</div>
      <div class="card-stats">
        <div class="stat-badge attack-badge">
          <span class="badge-icon">⚔️</span>
          <span class="badge-value">${card.attack}</span>
        </div>
        <div class="stat-badge defense-badge">
          <span class="badge-icon">🩸</span>
          <span class="badge-value">${card.currentHp !== undefined ? card.currentHp : card.hp}</span>
        </div>
      </div>
    </div>
  `
}

export function renderBoard() {
  const gs = gameState
  document.querySelector('#app').innerHTML = `
    <div class="board">
      <div class="player-area opponent-area">
        <div class="hand-area opponent-hand">
          ${gs.opponent.hand.map(() => `<div class="card-back"></div>`).join('')}
        </div>
        <div class="battlefield opponent-field" id="opponent-field">
          ${gs.opponent.board.map(c => renderCard(c, 'board')).join('')}
          ${gs.opponent.board.length === 0 ? '<div class="empty-field-hint">Opponent\'s field</div>' : ''}
        </div>
        <div class="hero-info">
          <div class="hero-portrait opponent-portrait ${gs.selectedCard && gs.phase === 'attack' && gs.turn === 'player' ? 'attackable-hero' : ''}" id="opponent-hero">
            <div class="hero-name">${gs.selectedCard && gs.phase === 'attack' && gs.turn === 'player' ? '⚔️ Attack!' : 'Opponent'}</div>
            <div class="hero-hp">❤️ ${gs.opponent.hp}</div>
          </div>
          <div class="mana-display">
            <span class="mana-label">MANA</span>
            <span class="mana-value">${gs.opponent.mana}/${gs.opponent.maxMana}</span>
          </div>
        </div>
      </div>

      <div class="board-divider">
        <div class="turn-info">
          <span class="turn-label">${gs.turn === 'player' ? '⚔️ Your Turn' : '⏳ Opponent\'s Turn'}</span>
          <span class="phase-label">${gs.phase === 'play' ? 'Play Phase' : 'Attack Phase'}</span>
        </div>
        <div class="action-buttons">
          <button class="btn-back-menu" id="btn-back-menu">🏠 Menu</button>
          ${gs.turn === 'player' ? `
            ${gs.phase === 'play' ? `<button class="btn-phase" id="btn-attack-phase">Attack Phase →</button>` : ''}
            ${gs.phase === 'attack' ? `<button class="btn-end-turn" id="btn-end-turn">End Turn ⏭</button>` : ''}
          ` : ''}
        </div>
      </div>

      <div class="player-area player-area-bottom">
        <div class="hand-area player-hand" id="player-hand">
          ${gs.player.hand.map(c => renderCard(c, 'hand')).join('')}
        </div>
        <div class="battlefield player-field" id="player-field">
          ${gs.player.board.map(c => renderCard(c, 'board')).join('')}
          ${gs.player.board.length === 0 ? '<div class="empty-field-hint">Your field — play cards here</div>' : ''}
        </div>
        <div class="hero-info">
          <div class="hero-portrait player-portrait">
            <div class="hero-name">You</div>
            <div class="hero-hp">❤️ ${gs.player.hp}</div>
          </div>
          <div class="mana-display">
            <span class="mana-label">MANA</span>
            <span class="mana-value">${gs.player.mana}/${gs.player.maxMana}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="message-log" id="message-log">
      ${gs.log.slice(-4).map(m => `<div class="log-entry">${m}</div>`).join('')}
    </div>

    ${gs.gameOver ? `
      <div class="game-over-overlay">
        <div class="game-over-box">
          <div class="game-over-title">${gs.winner === 'player' ? '🏆 Victory!' : '💀 Defeat'}</div>
          <div class="game-over-sub">${gs.winner === 'player' ? 'The opponent has fallen!' : 'You have been defeated!'}</div>
          <button class="btn-restart" id="btn-restart">Play Again</button>
          <button class="btn-restart" id="btn-menu" style="margin-top:10px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-color:#c9a84c;">🏠 Menu</button>
        </div>
      </div>
    ` : ''}
  `
  attachEvents()
}

// ── TOOLTIP
function showTooltip(card, el) {
  removeTooltip()
  const rarityLabels = { uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' }
  const rarityColors = { uncommon: '#6ee7b7', rare: '#93c5fd', epic: '#c4b5fd', legendary: '#fcd34d' }

  const tooltip = document.createElement('div')
  tooltip.className = `card-tooltip rarity-border-${card.rarity}`
  tooltip.id = 'card-tooltip'
  tooltip.innerHTML = `
    <div class="tooltip-art">
      <img src="/cards/${card.image}" alt="${card.name}" />
      <div class="tooltip-art-vignette"></div>
      <div class="tooltip-frame">
        <img src="/${rarityFrames[card.rarity]}" alt="" />
      </div>
      <div class="tooltip-mana">${card.mana}</div>
    </div>
    <div class="tooltip-body">
      <div class="tooltip-name">${card.name}</div>
      <div class="tooltip-rarity" style="color:${rarityColors[card.rarity]}">${rarityLabels[card.rarity]}</div>
      <div class="tooltip-stats">
        <div class="tooltip-stat attack">
          <span class="ts-icon">⚔️</span>
          <span class="ts-label">Attack</span>
          <span class="ts-value">${card.attack}</span>
        </div>
        <div class="tooltip-stat hp">
          <span class="ts-icon">🩸</span>
          <span class="ts-label">HP</span>
          <span class="ts-value">${card.currentHp !== undefined ? card.currentHp : card.hp}</span>
        </div>
        <div class="tooltip-stat mana">
          <span class="ts-icon">💧</span>
          <span class="ts-label">Mana</span>
          <span class="ts-value">${card.mana}</span>
        </div>
      </div>
      <div class="tooltip-keywords">
        <div class="tooltip-section-title">Keywords</div>
        <div class="tooltip-keyword-list">${card.keywords ? card.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('') : '<span class="no-keywords">No abilities yet</span>'}</div>
      </div>
      <div class="tooltip-lore">
        <div class="tooltip-section-title">Lore</div>
        <div class="tooltip-lore-text">${card.lore || 'Ancient and mysterious, this creature\'s origins are lost to time...'}</div>
      </div>
    </div>
  `

  document.body.appendChild(tooltip)

  const rect = el.getBoundingClientRect()
  const tooltipWidth = 260
  const tooltipHeight = 420
  let left = rect.right + 12
  let top = rect.top - 40

  if (left + tooltipWidth > window.innerWidth) left = rect.left - tooltipWidth - 12
  if (top + tooltipHeight > window.innerHeight) top = window.innerHeight - tooltipHeight - 60
  if (top < 8) top = 8

  tooltip.style.left = `${left}px`
  tooltip.style.top = `${top}px`
}

function removeTooltip() {
  document.getElementById('card-tooltip')?.remove()
}

// ── ATTACH EVENTS
function attachEvents() {
  // Tooltips
  document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const uid = parseInt(el.dataset.uid)
      const card =
        gameState.player.hand.find(c => c.uid === uid) ||
        gameState.player.board.find(c => c.uid === uid) ||
        gameState.opponent.board.find(c => c.uid === uid)
      if (card) showTooltip(card, el)
    })
    el.addEventListener('mouseleave', removeTooltip)
  })

  // Play card from hand
  document.querySelectorAll('.card[data-context="hand"]').forEach(el => {
    el.addEventListener('click', () => {
      const uid = parseInt(el.dataset.uid)
      playCard(uid)
      renderBoard()
    })
  })

  // Attack with board card
  document.querySelectorAll('.card[data-context="board"]').forEach(el => {
    el.addEventListener('click', () => {
      const uid = parseInt(el.dataset.uid)
      attackWithCard(uid)
      renderBoard()
    })
  })

  // Attack opponent hero
  document.getElementById('opponent-hero')?.addEventListener('click', () => {
    if (gameState.selectedCard && gameState.phase === 'attack' && gameState.turn === 'player') {
      const attacker = gameState.selectedCard
      gameState.opponent.hp -= attacker.attack
      attacker.exhausted = true
      gameState.log.push(`⚔️ ${attacker.name} struck the opponent hero for ${attacker.attack} damage!`)
      gameState.selectedCard = null
      checkWin()
      renderBoard()
    }
  })

  // Phase buttons
  document.getElementById('btn-attack-phase')?.addEventListener('click', () => {
    gameState.phase = 'attack'
    gameState.log.push('⚔️ Attack phase started.')
    renderBoard()
  })

  document.getElementById('btn-end-turn')?.addEventListener('click', () => {
    endTurn()
    renderBoard()
  })

  // Navigation
  document.getElementById('btn-back-menu')?.addEventListener('click', () => {
    removeTooltip()
    router.go('menu')
  })

  document.getElementById('btn-restart')?.addEventListener('click', () => {
    router.go('game')
  })

  document.getElementById('btn-menu')?.addEventListener('click', () => {
    removeTooltip()
    router.go('menu')
  })
}

// ── ROUTER
router.onChange((page) => {
  removeTooltip()
  if (page === 'menu') renderMenu()
  if (page === 'deckbuilder') renderDeckBuilder()
  if (page === 'game') {
    import('./game.js').then(m => {
      Object.assign(gameState, m.freshGame())
      renderBoard()
    })
  }
})

// ── START
renderMenu()