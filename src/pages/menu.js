import { router as appRouter } from '../router.js'
import { getAllDecks } from './deckbuilder.js'
import { allCards } from '../cards.js'
import { BASE } from '../main.js'

const rarityFrames = {
  uncommon: 'RavenCard_Green_Frame.png',
  rare:     'RavenCard_Blue_Frame.png',
  epic:     'RavenCard_Purple_Frame.png',
  legendary:'RavenCard_Frame.png',
}

const gameModes = [
  { id: 'vs-ai',     label: 'vs AI',      desc: 'Battle the computer',    available: true  },
  { id: 'vs-player', label: 'vs Player',  desc: 'Challenge a friend',     available: false },
]

let selectedMode = 'vs-ai'
let selectedSlot = null

function getPlayerName() {
  return localStorage.getItem('ravenclash_player_name') || 'Traveler'
}

function savePlayerName(name) {
  localStorage.setItem('ravenclash_player_name', name)
}

function getReadyDecks(decks) {
  return decks.filter(d => d.cards && d.cards.length === 20)
}

export function renderMenu() {
  const decks = getAllDecks()
  const readyDecks = getReadyDecks(decks)
  const playerName = getPlayerName()

  // Auto-select first ready deck if none selected
  if (selectedSlot === null && readyDecks.length > 0) {
    selectedSlot = readyDecks[0].slot
  }

  const selectedDeck = decks.find(d => d.slot === selectedSlot)
  const canPlay = selectedMode === 'vs-ai' && selectedDeck && selectedDeck.cards && selectedDeck.cards.length === 20

  document.querySelector('#app').innerHTML = `
    <div class="newmenu-screen">

      <!-- TOP BAR -->
      <div class="newmenu-topbar">
        <div class="topbar-logo">RavenClash</div>
        <div class="topbar-profile">
          <div class="topbar-avatar">⚔️</div>
          <div class="topbar-info">
            <div class="topbar-name-wrapper">
              <input class="topbar-name-input" id="topbar-name" value="${playerName}" maxlength="20" />
              <span class="topbar-name-pencil">✏️</span>
            </div>
            <div class="topbar-stats">${readyDecks.length} deck${readyDecks.length !== 1 ? 's' : ''} ready</div>
          </div>
        </div>
        <div class="topbar-actions">
          <button class="topbar-btn" id="btn-collection">📖 Collection</button>
        </div>
      </div>

      <div class="newmenu-body">

        <!-- LEFT SIDEBAR: Game Modes -->
        <div class="newmenu-sidebar">
          <div class="sidebar-title">Game Modes</div>
          ${gameModes.map(mode => `
            <div class="sidebar-mode ${mode.id === selectedMode ? 'active' : ''} ${!mode.available ? 'coming-soon' : ''}" data-mode="${mode.id}">
              <div class="mode-art">
                ${readyDecks.length > 0 && mode.available ? `
                  <img src="${BASE}cards/${allCards[Math.floor(Math.random() * 10)].image}" style="width:100%;height:100%;object-fit:cover;opacity:0.4;" />
                ` : ''}
              </div>
              <div class="mode-info">
                <div class="mode-label">${mode.label}</div>
                <div class="mode-desc">${mode.available ? mode.desc : 'Coming Soon'}</div>
              </div>
              ${mode.id === selectedMode ? '<div class="mode-active-bar"></div>' : ''}
            </div>
          `).join('')}
        </div>

        <!-- CENTER: Deck Selection + Play -->
        <div class="newmenu-center">
          <div class="center-title">
            ${selectedMode === 'vs-ai' ? '🤖 vs AI — Select Your Deck' : '👥 vs Player — Coming Soon'}
          </div>

          ${selectedMode === 'vs-ai' ? `
            <div class="center-decks">
              ${decks.map(d => {
                const ready = d.cards && d.cards.length === 20
                const isSelected = d.slot === selectedSlot
                const coverCard = d.coverId ? allCards.find(c => c.id === d.coverId) : null
                const frame = coverCard ? rarityFrames[coverCard.rarity] : null

                return `
                  <div class="center-deck ${ready ? 'ready' : 'empty'} ${isSelected ? 'selected' : ''}" data-slot="${d.slot}">
                    <div class="center-deck-art">
                      ${coverCard ? `
                        <img src="${BASE}cards/${coverCard.image}" style="width:100%;height:100%;object-fit:cover;" />
                        <div style="position:absolute;inset:0;">
                          <img src="${BASE}${frame}" style="width:100%;height:100%;object-fit:fill;" />
                        </div>
                      ` : '<div class="center-deck-empty-art">?</div>'}
                      ${isSelected ? '<div class="deck-selected-overlay">✓</div>' : ''}
                    </div>
                    <div class="center-deck-info">
                      <div class="center-deck-name">${d.name || `Deck ${d.slot}`}</div>
                      <div class="center-deck-status ${ready ? 'status-ready' : 'status-empty'}">
                        ${ready ? `${d.cards.length} cards` : 'Empty'}
                      </div>
                    </div>
                  </div>
                `
              }).join('')}
            </div>

            <div class="center-play-area">
              <button class="btn-play ${canPlay ? '' : 'disabled'}" id="btn-play">
                ${canPlay ? '⚔️ PLAY' : readyDecks.length === 0 ? 'Build a deck first' : 'Select a deck'}
              </button>
              <button class="btn-go-builder" id="btn-go-builder">+ Build / Edit Decks</button>
            </div>
          ` : `
            <div class="coming-soon-center">
              <div class="coming-soon-icon">🛡️</div>
              <div class="coming-soon-text">Multiplayer coming soon</div>
            </div>
          `}
        </div>

      </div>
    </div>
  `

  attachMenuEvents(decks, canPlay)
}

function attachMenuEvents(decks, canPlay) {
  // Player name
  document.getElementById('topbar-name')?.addEventListener('change', e => {
    savePlayerName(e.target.value)
  })

  // Game mode selection
  document.querySelectorAll('.sidebar-mode').forEach(el => {
    el.addEventListener('click', () => {
      const mode = el.dataset.mode
      const modeObj = gameModes.find(m => m.id === mode)
      if (!modeObj?.available) return
      selectedMode = mode
      renderMenu()
    })
  })

  // Deck selection
  document.querySelectorAll('.center-deck.ready').forEach(el => {
    el.addEventListener('click', () => {
      selectedSlot = parseInt(el.dataset.slot)
      renderMenu()
    })
  })

  // Play button
  document.getElementById('btn-play')?.addEventListener('click', () => {
    if (!canPlay) return
    appRouter.go('game', { slot: selectedSlot })
  })

  // Collection / deck builder
  document.getElementById('btn-collection')?.addEventListener('click', () => {
    appRouter.go('deckbuilder')
  })

  document.getElementById('btn-go-builder')?.addEventListener('click', () => {
    appRouter.go('deckbuilder')
  })
}