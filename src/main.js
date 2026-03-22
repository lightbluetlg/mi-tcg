import './style.css'
import { gsap } from 'gsap'
import { router } from './router.js'
import { renderMenu } from './pages/menu.js'
import { renderDeckBuilder, getSavedDeck, getAllDecks } from './pages/deckbuilder.js'
import { renderPreMatch } from './pages/prematch.js'
import { renderPackOpening } from './pages/packopening.js'
import { gameState, playCard, attackWithCard, attackHero, endTurn, checkWin, resolveOmen, useHeroAbility, resolveAbilityTarget } from './game.js'
import { allCards } from './cards.js'
import { playSound, toggleMute, isMuted } from './audio.js'
export const BASE = '/mi-tcg/'

let tooltipCooldown = false

const keywordDescriptions = {
  Ambush:  'Can attack the turn it is played.',
  Warden:  'Enemies must attack this creature first.',
  Leech:   'Heals your hero for damage dealt.',
  Apex:    'Deals double damage to heroes.',
  Hollow:  'Spawns a 1/1 Echo token when it dies.',
  Omen:    'On play, look at the top 3 cards of your deck and keep 1 on top.',
}

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
        <img src="${BASE}cards/${card.image}" alt="${card.name}" />
        <div class="art-vignette"></div>
      </div>
      <div class="card-frame">
        <img src="${BASE}${rarityFrames[card.rarity]}" alt="frame" />
      </div>
      <div class="card-mana">
        <img class="mana-icon-img" src="${BASE}pngicons/mana.png" />
        <span class="mana-number">${card.mana}</span>
      </div>
      <div class="card-name">${card.name}</div>
      <div class="card-stats">
        <div class="stat-badge attack-badge">
          <img class="badge-icon-img" src="${BASE}pngicons/crossed_swords.png" />
          <span class="badge-value">${card.attack}</span>
        </div>
        <div class="stat-badge defense-badge">
          <img class="badge-icon-img" src="${BASE}pngicons/heart.png" />
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
        <div class="battlefield opponent-field ${gs.turn === 'opponent' ? 'opponent-turn' : ''}" id="opponent-field">
          ${gs.opponent.board.map(c => renderCard(c, 'board')).join('')}
          ${gs.opponent.board.length === 0 ? '' : ''}
        </div>
        <div class="hero-info">
          <div class="hero-portrait opponent-portrait ${gs.selectedCard && gs.phase === 'attack' && gs.turn === 'player' ? 'attackable-hero' : ''}" id="opponent-hero"
            style="${gs.oppHero ? `border-color: ${gs.oppHero.borderColor}; box-shadow: 0 0 12px ${gs.oppHero.glowColor};` : ''}">
            <div class="hero-name" style="${gs.oppHero ? `color: ${gs.oppHero.borderColor};` : ''}">
              ${gs.selectedCard && gs.phase === 'attack' && gs.turn === 'player' ? 'Attack!' : gs.oppHero ? gs.oppHero.name : 'Opponent'}
            </div>
            <div class="hero-hp ${parseInt(gs.opponent.hp) <= 5 ? 'danger' : ''}"><img class="hero-icon-img" src="${BASE}pngicons/heart.png" /> ${gs.opponent.hp}</div>
          </div>
          <div class="mana-display">
            <span class="mana-label">MANA</span>
            <span class="mana-value">${gs.opponent.mana}/${gs.opponent.maxMana}</span>
          </div>
          <div class="graveyard-icon" id="graveyard-opponent" data-side="opponent">
            <img class="hero-icon-img" src="${BASE}pngicons/skull.png" /> <span class="graveyard-count">${gs.opponent.graveyard.length}</span>
          </div>
          <div class="deck-icon">
            <img class="hero-icon-img" src="${BASE}pngicons/cards_stack.png" /> <span class="deck-count-display">${gs.opponent.deck.length}</span>
          </div>
        </div>
      </div>

      <div class="board-divider">
        <div class="turn-info">
          <span class="turn-label">${gs.turn === 'player' ? `<img class="hero-icon-img" src="${BASE}pngicons/crossed_swords.png" /> Your Turn` : `<img class="hero-icon-img" src="${BASE}pngicons/hourglass.png" /> Opponent's Turn`}</span>
          <span class="phase-label">${gs.phase === 'play' ? 'Play Phase' : 'Attack Phase'}</span>
        </div>
        <div class="action-buttons" id="action-buttons">
          <button class="btn-back-menu" id="btn-back-menu">Menu</button>
          <button class="btn-mute" id="btn-mute">${isMuted() ? '🔇' : '🔊'}</button>
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
        <div class="battlefield player-field ${gs.turn === 'player' ? 'your-turn' : ''}" id="player-field">
          ${gs.player.board.map(c => renderCard(c, 'board')).join('')}
          ${gs.player.board.length === 0 ? '' : ''}
        </div>
        <div class="hero-info">
          <div class="hero-portrait player-portrait" style="${gs.hero ? `border-color: ${gs.hero.borderColor}; box-shadow: 0 0 12px ${gs.hero.glowColor};` : ''}">
            <div class="hero-name" style="${gs.hero ? `color: ${gs.hero.borderColor};` : ''}">${gs.hero ? gs.hero.name : 'You'}</div>
            <div class="hero-hp ${parseInt(gs.player.hp) <= 5 ? 'danger' : ''}"><img class="hero-icon-img" src="${BASE}pngicons/heart.png" /> ${gs.player.hp}</div>
          </div>
          ${gs.hero && gs.turn === 'player' ? `
            <button class="btn-hero-ability ${gs.heroAbilityUsed ? 'used' : ''} ${gs._abilityTargeting ? 'targeting' : ''}"
              id="btn-hero-ability"
              ${gs.heroAbilityUsed ? 'disabled' : ''}
              style="--hero-color: ${gs.hero.borderColor}; --hero-glow: ${gs.hero.glowColor};">
              <span class="ability-name">${gs.hero.abilityName}</span>
              <span class="ability-cost">${gs.hero.abilityCost} mana</span>
            </button>
          ` : ''}
          <div class="mana-display">
            <span class="mana-label">MANA</span>
            <span class="mana-value">${gs.player.mana}/${gs.player.maxMana}</span>
          </div>
          <div class="graveyard-icon" id="graveyard-player" data-side="player">
            <img class="hero-icon-img" src="${BASE}pngicons/skull.png" /> <span class="graveyard-count">${gs.player.graveyard.length}</span>
          </div>
          <div class="deck-icon">
            <img class="hero-icon-img" src="${BASE}pngicons/cards_stack.png" /> <span class="deck-count-display">${gs.player.deck.length}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="message-log" id="message-log" id="message-log">
    </div>

    ${graveyardOpen ? renderGraveyardOverlay() : ''}
    ${gs.gameOver ? `
      <div class="game-over-overlay">
        <div class="game-over-box ${gs.winner === 'player' ? 'victory-box' : 'defeat-box'}">
          <div class="game-over-icon">${gs.winner === 'player' ? '⚔' : '✕'}</div>
          <div class="game-over-title">${gs.winner === 'player' ? 'Victory' : 'Defeat'}</div>
          <div class="game-over-sub">${gs.winner === 'player' ? 'The opponent has fallen' : 'You have been defeated'}</div>
          <div class="game-over-buttons">
            <button class="btn-gameover-primary" id="btn-restart">Play Again</button>
            <button class="btn-gameover-secondary" id="btn-menu">Back to Menu</button>
          </div>
        </div>
      </div>
    ` : ''}
  `
  const logEl = document.getElementById('message-log')
  if (logEl) {
    logEl.innerHTML = gs.log.slice(-4).map(m => {
      const clean = m.replace(/<[^>]+>/g, '')
      let cls = ''
      if (clean.includes('💀') || clean.includes('died') || clean.includes('Fatigue') || clean.includes('lost')) cls = 'log-death'
      else if (clean.includes('⚔️') || clean.includes('attacked') || clean.includes('❌') || clean.includes('damage')) cls = 'log-damage'
      else if (clean.includes('🩸') || clean.includes('leeched') || clean.includes('heal')) cls = 'log-heal'
      else if (clean.includes('⏭️') || clean.includes('ended') || clean.includes('🎮') || clean.includes('🎲')) cls = 'log-turn'
      else cls = 'log-special'
      return `<div class="log-entry ${cls}">${clean}</div>`
    }).join('')
  }
  attachEvents()
}

// ── TOOLTIP
function showTooltip(card, el) {
  if (tooltipCooldown) return
  removeTooltip()
  const rarityLabels = { uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' }
  const rarityColors = { uncommon: '#6ee7b7', rare: '#93c5fd', epic: '#c4b5fd', legendary: '#fcd34d' }

  const tooltip = document.createElement('div')
  tooltip.className = `card-tooltip rarity-border-${card.rarity}`
  tooltip.id = 'card-tooltip'
  tooltip.innerHTML = `
    <div class="tooltip-art">
      <img src="${BASE}cards/${card.image}" alt="${card.name}" />
      <div class="tooltip-art-vignette"></div>
      <div class="tooltip-frame">
        <img src="${BASE}${rarityFrames[card.rarity]}" alt="" />
      </div>
      <div class="tooltip-mana">
        <img class="mana-icon-img" src="${BASE}pngicons/mana.png" />
        <span class="mana-number">${card.mana}</span>
      </div>
    </div>
    <div class="tooltip-body">
      <div class="tooltip-name">${card.name}</div>
      <div class="tooltip-rarity" style="color:${rarityColors[card.rarity]}">${rarityLabels[card.rarity]}</div>
      <div class="tooltip-stats">
        <div class="tooltip-stat attack">
          <img class="ts-icon-img" src="${BASE}pngicons/crossed_swords.png" />
          <span class="ts-label">Attack</span>
          <span class="ts-value">${card.attack}</span>
        </div>
        <div class="tooltip-stat hp">
          <img class="ts-icon-img" src="${BASE}pngicons/heart.png" />
          <span class="ts-label">HP</span>
          <span class="ts-value">${card.currentHp !== undefined ? card.currentHp : card.hp}</span>
        </div>
        <div class="tooltip-stat mana">
          <img class="ts-icon-img" src="${BASE}pngicons/mana.png" />
          <span class="ts-label">Mana</span>
          <span class="ts-value">${card.mana}</span>
        </div>
      </div>
      <div class="tooltip-keywords">
        <div class="tooltip-keyword-list">${card.keywords && card.keywords.length > 0 ? card.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('') : '<span class="no-keywords">No abilities yet</span>'}</div>
        ${card.keywords && card.keywords.length > 0 ? `
          <div class="tooltip-keyword-descs">
            ${card.keywords.map(k => keywordDescriptions[k] ? `
              <div class="tooltip-keyword-desc">
                <span class="keyword-desc-text">${keywordDescriptions[k]}</span>
              </div>
            ` : '').join('')}
          </div>
        ` : ''}
      </div>
      <div class="tooltip-lore">
        <div class="tooltip-lore-divider"></div>
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

export function removeTooltip() {
  document.getElementById('card-tooltip')?.remove()
}

// ── ANIMATIONS
export function floatDamage(amount, el, isHeal = false) {
  const rect = el.getBoundingClientRect()
  const num = document.createElement('div')
  num.className = `damage-number ${isHeal ? 'heal-dmg' : 'attack-dmg'}`
  num.textContent = isHeal ? `+${amount}` : `-${amount}`
  num.style.left = `${rect.left + rect.width / 2 - 20}px`
  num.style.top = `${rect.top + rect.height / 2 - 20}px`
  document.body.appendChild(num)
  setTimeout(() => num.remove(), 1200)
}

export function animateCardHit(uid) {
  const el = document.querySelector(`[data-uid="${uid}"]`)
  if (!el) return
  el.classList.remove('card-shake', 'card-hit')
  void el.offsetWidth // force reflow
  el.classList.add('card-shake', 'card-hit')
  floatDamage('💥', el)
  setTimeout(() => el.classList.remove('card-shake', 'card-hit'), 400)
}

export function animateCardDeath(uid) {
  return new Promise(resolve => {
    const el = document.querySelector(`[data-uid="${uid}"]`)
    if (!el) return resolve()
    el.classList.add('card-dying')
    setTimeout(resolve, 600)
  })
}

export function animateCardPlayed(uid) {
  const el = document.querySelector(`[data-uid="${uid}"]`)
  if (!el) return

  gsap.from(el, {
    duration: 0.4,
    y: 80,
    scale: 0.8,
    rotation: -6,
    opacity: 0,
    ease: 'back.out(1.4)',
  })
}

export function animateCardLunge(uid, direction = 'up') {
  return new Promise(resolve => {
    const el = document.querySelector(`[data-uid="${uid}"]`)
    if (!el) return resolve()
    el.classList.add(`card-lunge-${direction}`)
    setTimeout(() => {
      el.classList.remove(`card-lunge-${direction}`)
      resolve()
    }, 400)
  })
}

export function animateHeroHit(side) {
  const el = document.querySelector(`.${side}-portrait`)
  if (!el) return
  el.classList.add('hero-shake', 'hero-hit')
  const rect = el.getBoundingClientRect()
  floatDamage('💥', el)
  setTimeout(() => el.classList.remove('hero-shake', 'hero-hit'), 500)
}

// ── GRAVEYARD
let graveyardOpen = false
let graveyardSide = 'player'

export function toggleGraveyard(side) {
  if (graveyardOpen && graveyardSide === side) {
    graveyardOpen = false
  } else {
    graveyardOpen = true
    graveyardSide = side
  }
  renderBoard()
}

function renderGraveyardOverlay() {
  const graveyard = graveyardSide === 'player'
    ? gameState.player.graveyard
    : gameState.opponent.graveyard
  const title = graveyardSide === 'player' ? 'Your Graveyard' : "Opponent's Graveyard"

  return `
    <div class="graveyard-overlay" id="graveyard-overlay">
      <div class="graveyard-panel">
        <div class="graveyard-header">
          <div class="graveyard-title"><img class="hero-icon-img" src="${BASE}pngicons/skull.png" style="vertical-align:middle;margin-right:6px;" /> ${title}</div>
          <button class="graveyard-close" id="graveyard-close">✕</button>
        </div>
        <div class="graveyard-cards">
          ${graveyard.length === 0
            ? '<div class="graveyard-empty">No dead creatures yet</div>'
            : graveyard.map(card => `
              <div class="graveyard-card rarity-${card.rarity}">
                <div class="thumb-image" style="width:80px;height:107px;position:relative;border-radius:6px;overflow:hidden;">
                  <img src="${BASE}cards/${card.image}" style="width:100%;height:100%;object-fit:cover;" />
                  <div class="thumb-frame" style="position:absolute;inset:0;">
                    <img src="${BASE}${rarityFrames[card.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
                  </div>
                  <div style="position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7ec8ff,#1a5fa0,#0a2040);border:1px solid #90cdf4;display:flex;align-items:center;justify-content:center;font-family:Barlow,sans-serif;font-size:10px;font-weight:700;color:#fff;z-index:10;">${card.mana}</div>
                </div>
                <div style="font-family:'Passion One',sans-serif;font-size:9px;color:#f0d080;text-align:center;margin-top:4px;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:80px;">${card.name}</div>
                <div style="font-family:'Barlow',sans-serif;font-size:9px;text-align:center;color:rgba(255,255,255,0.4);">⚔️${card.attack} 🩸${card.hp}</div>
              </div>
            `).join('')
          }
        </div>
      </div>
    </div>
  `
}

export function animateCardPlayedFromHand(card, isOpponent = false) {
  return new Promise(resolve => {
    const rarityFrame = rarityFrames[card.rarity]

    const clone = document.createElement('div')
    clone.className = `card rarity-${card.rarity}`
    clone.style.cssText = `
      position: fixed;
      width: ${isOpponent ? '60px' : '80px'};
      height: ${isOpponent ? '84px' : '112px'};
      z-index: 300;
      pointer-events: none;
      border-radius: 8px;
      overflow: hidden;
      background: #000;
    `

    clone.innerHTML = `
      <div class="card-image" style="position:absolute;inset:0;border-radius:8px;overflow:hidden;z-index:1;">
        <img src="${BASE}cards/${card.image}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="card-frame" style="position:absolute;inset:0;z-index:5;pointer-events:none;">
        <img src="${BASE}${rarityFrame}" style="width:100%;height:100%;object-fit:fill;" />
      </div>
    `

    const handArea = document.querySelector(isOpponent ? '.opponent-hand' : '.player-hand')
    const boardArea = document.querySelector(isOpponent ? '.opponent-field' : '.player-field')
    if (!handArea || !boardArea) return resolve()

    const handRect = handArea.getBoundingClientRect()
    const boardRect = boardArea.getBoundingClientRect()

    const startX = handRect.left + handRect.width / 2 - (isOpponent ? 30 : 40)
    const startY = handRect.top
    const endY = boardRect.top + boardRect.height / 2 - (isOpponent ? 42 : 56)
    const midY = startY + (endY - startY) * 0.4 - 60

    clone.style.left = `${startX}px`
    clone.style.top = `${startY}px`
    document.body.appendChild(clone)

    gsap.timeline({ onComplete: () => { clone.remove(); resolve() } })
      .set(clone, { opacity: 1, scale: 1 })
      .to(clone, {
        duration: 0.25,
        y: midY - startY,
        scale: 1.3,
        rotation: isOpponent ? 15 : -15,
        ease: 'power2.out'
      })
      .to(clone, {
        duration: 0.3,
        y: endY - startY,
        scale: 1.05,
        rotation: 0,
        ease: 'power2.in'
      })
      .to(clone, {
        duration: 0.15,
        opacity: 0,
        scale: 0.95,
        ease: 'power1.in'
      }, '-=0.1')
  })
}
// ── ATTACH EVENTS
function attachEvents() {
  // Tooltips
  document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const uid = parseInt(el.dataset.uid)
      const gameCard =
        gameState.player.hand.find(c => c.uid === uid) ||
        gameState.player.board.find(c => c.uid === uid) ||
        gameState.opponent.board.find(c => c.uid === uid)
      if (gameCard) {
        const baseCard = allCards.find(c => c.id === gameCard.id) || {}
        showTooltip({ ...baseCard, ...gameCard }, el)
      }
    })
    el.addEventListener('mouseleave', removeTooltip)
  })

  // Graveyard icons
  document.getElementById('graveyard-opponent')?.addEventListener('click', () => toggleGraveyard('opponent'))
  document.getElementById('graveyard-player')?.addEventListener('click', () => toggleGraveyard('player'))
  document.getElementById('graveyard-close')?.addEventListener('click', () => {
    graveyardOpen = false
    renderBoard()
  })
  // Play card from hand
  document.querySelectorAll('.card[data-context="hand"]').forEach(el => {
    el.addEventListener('click', () => {
      const uid = parseInt(el.dataset.uid)
      playCard(uid)
      removeTooltip()
      tooltipCooldown = true
      setTimeout(() => { tooltipCooldown = false }, 600)
      renderBoard()
    })
  })

  // Attack with board card (or resolve ability target)
  document.querySelectorAll('.card[data-context="board"]').forEach(el => {
    el.addEventListener('click', async () => {
      const uid = parseInt(el.dataset.uid)
      if (gameState._abilityTargeting) {
        resolveAbilityTarget(uid)
        return
      }
      await attackWithCard(uid)
      renderBoard()
    })
  })

  // Attack opponent hero
  document.getElementById('opponent-hero')?.addEventListener('click', () => {
    if (gameState.selectedCard && gameState.phase === 'attack' && gameState.turn === 'player') {
      attackHero(gameState.selectedCard.uid)
      renderBoard()
    }
  })

  document.getElementById('btn-mute')?.addEventListener('click', () => {
    toggleMute()
    renderBoard()
  })

  document.getElementById('btn-attack-phase')?.addEventListener('click', () => {
    gameState.phase = 'attack'
    gameState.log.push('<span class="log-damage">⚔️ Attack phase started.</span>')
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

  document.getElementById('btn-hero-ability')?.addEventListener('click', () => {
    useHeroAbility()
  })
}

// ── OMEN MODAL
export function showOmenModal(cards) {
  // Remove any existing modal
  document.getElementById('omen-modal')?.remove()

  const modal = document.createElement('div')
  modal.id = 'omen-modal'
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.75);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 20px;
  `

  modal.innerHTML = `
    <div style="
      font-family: 'Passion One', sans-serif;
      font-size: 22px; color: #c9a84c;
      text-transform: uppercase; letter-spacing: 2px;
      text-shadow: 0 0 12px rgba(201,168,76,0.6);
    ">🔮 Omen — Choose a card to keep on top</div>
    <div style="font-family: Barlow, sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); margin-top: -12px;">
      The other cards go to the bottom of your deck.
    </div>
    <div id="omen-choices" style="display: flex; gap: 20px; align-items: center;">
      ${cards.map(card => `
        <div class="omen-card-choice card rarity-${card.rarity}" data-uid="${card.uid}" style="
          cursor: pointer; position: relative;
          width: 100px; height: 140px;
          border-radius: 10px; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0px rgba(201,168,76,0);
        ">
          <div style="position:absolute;inset:0;z-index:1;">
            <img src="${BASE}cards/${card.image}" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div style="position:absolute;inset:0;z-index:2;">
            <img src="${BASE}${rarityFrames[card.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
          </div>
          <div style="position:absolute;top:3px;left:3px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:10;">
            <img src="${BASE}pngicons/mana.png" style="position:absolute;width:32px;height:32px;object-fit:contain;" />
            <span style="position:relative;z-index:2;font-family:Barlow,sans-serif;font-size:11px;font-weight:700;color:#fff;text-shadow:0 0 6px rgba(0,0,0,1),0 0 12px rgba(0,0,0,1);margin-top:4px;">${card.mana}</span>
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;z-index:10;
            background:linear-gradient(transparent,rgba(0,0,0,0.85));
            padding:4px 4px 5px;text-align:center;">
            <div style="font-family:'Passion One',sans-serif;font-size:9px;color:#f0d080;
              text-transform:uppercase;letter-spacing:0.5px;
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${card.name}
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:2px;">
              <div style="display:flex;align-items:center;gap:2px;background:rgba(0,0,0,0.85);border:1px solid rgba(180,40,40,0.6);border-radius:4px;padding:2px 5px;">
                <img src="${BASE}pngicons/crossed_swords.png" style="width:10px;height:10px;" />
                <span style="font-family:Barlow,sans-serif;font-size:11px;font-weight:700;color:#ff7070;text-shadow:0 0 6px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,1);">${card.attack}</span>
              </div>
              <div style="display:flex;align-items:center;gap:2px;background:rgba(0,0,0,0.85);border:1px solid rgba(180,20,40,0.6);border-radius:4px;padding:2px 5px;">
                <img src="${BASE}pngicons/heart.png" style="width:10px;height:10px;" />
                <span style="font-family:Barlow,sans-serif;font-size:11px;font-weight:700;color:#ff4466;text-shadow:0 0 6px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,1);">${card.hp}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="font-family:Barlow,sans-serif;font-size:12px;color:rgba(255,255,255,0.35);">
      Click a card to place it on top of your deck
    </div>
  `

  document.body.appendChild(modal)

  // Hover glow effect
  modal.querySelectorAll('.omen-card-choice').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.08) translateY(-4px)'
      el.style.boxShadow = '0 0 20px rgba(201,168,76,0.7)'
    })
    el.addEventListener('mouseleave', () => {
      el.style.transform = ''
      el.style.boxShadow = '0 0 0px rgba(201,168,76,0)'
    })
    el.addEventListener('click', () => {
      const uid = parseInt(el.dataset.uid)
      resolveOmen(uid)
      modal.remove()
    })
  })
}

// ── ROUTER
router.onChange((page, params) => {
  removeTooltip()
  if (page === 'menu') renderMenu()
  if (page === 'deckbuilder') renderDeckBuilder()
  if (page === 'prematch') renderPreMatch(params)
  if (page === 'packs') renderPackOpening()
  if (page === 'game') {
    import('./game.js').then(m => {
      const fresh = m.freshGame(params?.slot, params?.heroId)
      Object.assign(gameState, fresh)
      renderBoard()
      if (fresh._opponentGoesFirst) {
        setTimeout(() => {
          import('./game.js').then(g => g.triggerOpponentFirst())
        }, 1200)
      }
    })
  }
})

// ── START
renderMenu()