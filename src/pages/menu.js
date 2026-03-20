import { router } from '../router.js'
import { getAllDecks } from './deckbuilder.js'

export function renderMenu() {
  const decks = getAllDecks()
  const hasReadyDeck = decks.some(d => d.cards && d.cards.length === 20)

  document.querySelector('#app').innerHTML = `
    <div class="menu-screen">
      <div class="menu-content">
        <div class="menu-logo">
          <h1 class="logo-title">RavenClash</h1>
          <div class="logo-sub">The Card Game</div>
        </div>

        <div class="menu-buttons">
          <div class="menu-section-title">⚔️ Battle</div>
          <button class="menu-btn primary ${!hasReadyDeck ? 'disabled' : ''}" id="btn-vs-ai">
            <span class="btn-icon">🤖</span>
            <span class="btn-text">
              <span class="btn-label">vs AI</span>
              <span class="btn-desc">${hasReadyDeck ? 'Choose your deck and fight' : 'Build a deck first'}</span>
            </span>
          </button>
          <button class="menu-btn disabled" id="btn-vs-player">
            <span class="btn-icon">👥</span>
            <span class="btn-text">
              <span class="btn-label">vs Player</span>
              <span class="btn-desc">Coming soon</span>
            </span>
          </button>

          <div class="menu-section-title" style="margin-top:24px">🃏 Collection</div>
          <button class="menu-btn" id="btn-deck-builder">
            <span class="btn-icon">📖</span>
            <span class="btn-text">
              <span class="btn-label">Deck Builder</span>
              <span class="btn-desc">${hasReadyDeck ? `${decks.filter(d => d.cards && d.cards.length === 20).length} deck(s) ready` : 'Build your 20-card deck'}</span>
            </span>
          </button>
          <button class="menu-btn disabled" id="btn-card-packs">
            <span class="btn-icon">📦</span>
            <span class="btn-text">
              <span class="btn-label">Card Packs</span>
              <span class="btn-desc">Coming soon</span>
            </span>
          </button>
        </div>

        <div class="menu-footer">RavenClash Alpha v0.1</div>
      </div>
    </div>
  `

  document.getElementById('btn-vs-ai')?.addEventListener('click', () => {
    if (!hasReadyDeck) return
    router.go('prematch')
  })

  document.getElementById('btn-deck-builder')?.addEventListener('click', () => {
    router.go('deckbuilder')
  })
}