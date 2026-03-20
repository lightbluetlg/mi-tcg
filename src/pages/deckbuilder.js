import { router } from '../router.js'
import { allCards } from '../cards.js'

const DECK_KEY = 'ravenclash_deck_1'
const MAX_COPIES = 2
const DECK_SIZE = 20

export function getSavedDeck() {
  try {
    const saved = localStorage.getItem(DECK_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

function saveDeck(deck) {
  localStorage.setItem(DECK_KEY, JSON.stringify(deck))
}

const rarityFrames = {
  uncommon: 'RavenCard_Green_Frame.png',
  rare:     'RavenCard_Blue_Frame.png',
  epic:     'RavenCard_Purple_Frame.png',
  legendary:'RavenCard_Frame.png',
}

const rarityOrder = { uncommon: 1, rare: 2, epic: 3, legendary: 4 }

let filters = { search: '', rarity: 'all', mana: 'all' }
let deck = getSavedDeck()

function getFilteredCards() {
  return allCards.filter(card => {
    const matchSearch = card.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchRarity = filters.rarity === 'all' || card.rarity === filters.rarity
    const matchMana = filters.mana === 'all' || card.mana === parseInt(filters.mana)
    return matchSearch && matchRarity && matchMana
  }).sort((a, b) => a.mana - b.mana || rarityOrder[a.rarity] - rarityOrder[b.rarity])
}

function countInDeck(cardId) {
  return deck.filter(c => c.id === cardId).length
}

function renderCardThumb(card) {
  const count = countInDeck(card.id)
  const maxed = count >= MAX_COPIES
  return `
    <div class="thumb-card ${maxed ? 'maxed' : ''} rarity-${card.rarity}" data-id="${card.id}">
      <div class="thumb-image">
        <img src="/cards/${card.image}" alt="${card.name}" />
        <div class="thumb-frame">
          <img src="/${rarityFrames[card.rarity]}" alt="" />
        </div>
        <div class="thumb-mana">${card.mana}</div>
        ${count > 0 ? `<div class="thumb-count">×${count}</div>` : ''}
      </div>
      <div class="thumb-name">${card.name}</div>
      <div class="thumb-stats">⚔️${card.attack} 🩸${card.hp}</div>
    </div>
  `
}

function renderDeckList() {
  const grouped = {}
  deck.forEach(card => {
    if (!grouped[card.id]) grouped[card.id] = { card, count: 0 }
    grouped[card.id].count++
  })

  const entries = Object.values(grouped).sort((a, b) => a.card.mana - b.card.mana)

  return entries.map(({ card, count }) => `
    <div class="deck-entry rarity-${card.rarity}" data-id="${card.id}">
      <div class="deck-entry-mana">${card.mana}</div>
      <div class="deck-entry-name">${card.name}</div>
      <div class="deck-entry-count">×${count}</div>
      <button class="deck-entry-remove" data-id="${card.id}">✕</button>
    </div>
  `).join('')
}

export function renderDeckBuilder() {
  const filtered = getFilteredCards()
  const deckCount = deck.length

  document.querySelector('#app').innerHTML = `
    <div class="deckbuilder-screen">

      <!-- LEFT: Card Collection -->
      <div class="collection-panel">
        <div class="collection-header">
          <h2 class="panel-title">📖 Collection</h2>
          <div class="filters">
            <input class="filter-search" id="filter-search" placeholder="Search cards..." value="${filters.search}" />
            <select class="filter-select" id="filter-rarity">
              <option value="all" ${filters.rarity==='all'?'selected':''}>All Rarities</option>
              <option value="uncommon" ${filters.rarity==='uncommon'?'selected':''}>Uncommon</option>
              <option value="rare" ${filters.rarity==='rare'?'selected':''}>Rare</option>
              <option value="epic" ${filters.rarity==='epic'?'selected':''}>Epic</option>
              <option value="legendary" ${filters.rarity==='legendary'?'selected':''}>Legendary</option>
            </select>
            <select class="filter-select" id="filter-mana">
              <option value="all" ${filters.mana==='all'?'selected':''}>All Mana</option>
              ${[1,2,3,4,5,6,7,8].map(m => `
                <option value="${m}" ${filters.mana==m?'selected':''}>${m} Mana</option>
              `).join('')}
            </select>
          </div>
          <div class="collection-count">${filtered.length} cards</div>
        </div>
        <div class="card-grid" id="card-grid">
          ${filtered.map(renderCardThumb).join('')}
        </div>
      </div>

      <!-- RIGHT: Deck -->
      <div class="deck-panel">
        <div class="deck-header">
          <h2 class="panel-title">🗡️ Your Deck</h2>
          <div class="deck-count ${deckCount === DECK_SIZE ? 'complete' : ''}">${deckCount} / ${DECK_SIZE}</div>
        </div>

        <div class="deck-list" id="deck-list">
          ${deck.length === 0
            ? '<div class="deck-empty">Click cards to add them</div>'
            : renderDeckList()
          }
        </div>

        <div class="deck-actions">
          ${deckCount === DECK_SIZE
            ? `<button class="btn-save-deck" id="btn-save">✅ Deck Saved!</button>`
            : `<button class="btn-save-deck inactive" id="btn-save">Need ${DECK_SIZE - deckCount} more cards</button>`
          }
          <button class="btn-clear-deck" id="btn-clear">🗑 Clear</button>
          <button class="btn-back" id="btn-back">← Back to Menu</button>
        </div>
      </div>

    </div>
  `
  attachDeckEvents()
}

function attachDeckEvents() {
      const grid = document.getElementById('card-grid')
  const savedScroll = grid ? grid.scrollTop : 0
  // Search
  document.getElementById('filter-search')?.addEventListener('input', e => {
    filters.search = e.target.value
    renderDeckBuilder()
  })

  // Rarity filter
  document.getElementById('filter-rarity')?.addEventListener('change', e => {
    filters.rarity = e.target.value
    renderDeckBuilder()
  })

  // Mana filter
  document.getElementById('filter-mana')?.addEventListener('change', e => {
    filters.mana = e.target.value
    renderDeckBuilder()
  })

  // Add card
  document.querySelectorAll('.thumb-card').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.id)
      const card = allCards.find(c => c.id === id)
      if (!card) return
      if (deck.length >= DECK_SIZE) return
      if (countInDeck(id) >= MAX_COPIES) return
      const scrollPos = document.getElementById('card-grid')?.scrollTop || 0
      deck.push(card)
      saveDeck(deck)
      renderDeckBuilder()
      requestAnimationFrame(() => {
        const newGrid = document.getElementById('card-grid')
        if (newGrid) newGrid.scrollTop = scrollPos
      })
    })
  })

  // Remove card
  document.querySelectorAll('.deck-entry-remove').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation()
      const id = parseInt(el.dataset.id)
      const idx = deck.findIndex(c => c.id === id)
      if (idx !== -1) deck.splice(idx, 1)
      saveDeck(deck)
      renderDeckBuilder()
    })
  })

  // Clear deck
  document.getElementById('btn-clear')?.addEventListener('click', () => {
    deck = []
    saveDeck(deck)
    renderDeckBuilder()
  })

  // Back
  document.getElementById('btn-back')?.addEventListener('click', () => {
    router.go('menu')
  })
}