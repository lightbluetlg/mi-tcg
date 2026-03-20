import { router } from '../router.js'
import { allCards } from '../cards.js'

const MAX_COPIES = 2
const DECK_SIZE = 20
const MAX_DECKS = 5

export function getDeckKey(slot) {
  return `ravenclash_deck_${slot}`
}

export function getSavedDeck(slot = 1) {
  try {
    const saved = localStorage.getItem(getDeckKey(slot))
    return saved ? JSON.parse(saved) : null
  } catch { return null }
}

export function getAllDecks() {
  return Array.from({ length: MAX_DECKS }, (_, i) => {
    const slot = i + 1
    const data = getSavedDeck(slot)
    return { slot, ...( data || { cards: [], name: `Deck ${slot}`, coverId: null }) }
  })
}

function saveDeck(slot, cards, name, coverId) {
  localStorage.setItem(getDeckKey(slot), JSON.stringify({ cards, name, coverId }))
}

const rarityFrames = {
  uncommon: 'RavenCard_Green_Frame.png',
  rare:     'RavenCard_Blue_Frame.png',
  epic:     'RavenCard_Purple_Frame.png',
  legendary:'RavenCard_Frame.png',
}

const rarityOrder = { uncommon: 1, rare: 2, epic: 3, legendary: 4 }

let currentSlot = 1
let filters = { search: '', rarity: 'all', mana: 'all' }
let deck = []
let deckName = 'My Deck'
let coverId = null
let pickingCover = false

function loadSlot(slot) {
  currentSlot = slot
  const saved = getSavedDeck(slot)
  if (!saved) {
    deck = []
    deckName = `Deck ${slot}`
    coverId = null
  } else if (Array.isArray(saved)) {
    // Old format — plain array
    deck = [...saved]
    deckName = `Deck ${slot}`
    coverId = null
  } else {
    // New format — object with cards/name/coverId
    deck = saved.cards ? [...saved.cards] : []
    deckName = saved.name || `Deck ${slot}`
    coverId = saved.coverId || null
  }
  pickingCover = false
}

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
  const isCover = coverId === card.id
  return `
    <div class="thumb-card ${maxed && !pickingCover ? 'maxed' : ''} ${isCover ? 'is-cover' : ''} rarity-${card.rarity}" data-id="${card.id}">
      <div class="thumb-image">
        <img src="/cards/${card.image}" alt="${card.name}" />
        <div class="thumb-frame">
          <img src="/${rarityFrames[card.rarity]}" alt="" />
        </div>
        <div class="thumb-mana">${card.mana}</div>
        ${isCover ? '<div class="cover-badge">✦</div>' : ''}
        ${count > 0 && !pickingCover ? `<div class="thumb-count">×${count}</div>` : ''}
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

export function renderDeckBuilder(slot = currentSlot) {
  if (slot !== currentSlot) loadSlot(slot)
  const filtered = getFilteredCards()
  const deckCount = deck.length
  const deckReady = deckCount === DECK_SIZE
  const coverCard = coverId ? allCards.find(c => c.id === coverId) : null

  document.querySelector('#app').innerHTML = `
    <div class="deckbuilder-screen">

      <!-- LEFT: Card Collection -->
      <div class="collection-panel">
        <div class="collection-header">

          <!-- Deck slot selector -->
          <div class="deck-slots">
            ${Array.from({ length: MAX_DECKS }, (_, i) => {
              const s = i + 1
              const d = getSavedDeck(s)
              const ready = d && d.cards && d.cards.length === DECK_SIZE
              return `<button class="deck-slot-btn ${s === currentSlot ? 'active' : ''} ${ready ? 'ready' : ''}" data-slot="${s}">
                ${d && d.coverId ? `<img src="/cards/${allCards.find(c => c.id === d.coverId)?.image}" class="slot-cover" />` : ''}
                <span class="slot-label">${d && d.name ? d.name : `Deck ${s}`}</span>
                ${ready ? '<span class="slot-ready">✓</span>' : ''}
              </button>`
            }).join('')}
          </div>

          <div class="deck-name-row">
            <h2 class="panel-title">📖 Collection</h2>
            <input class="deck-name-input" id="deck-name-input" value="${deckName}" placeholder="Deck name..." maxlength="20" />
          </div>

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

          ${pickingCover ? `<div class="cover-hint">✦ Click any card to set it as your deck cover</div>` : ''}
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
          <div class="deck-count ${deckReady ? 'complete' : ''}">${deckCount} / ${DECK_SIZE}</div>
        </div>

        <!-- Cover card preview -->
        <div class="deck-cover-section">
          ${coverCard ? `
            <div class="deck-cover-preview">
              <div class="thumb-image" style="width:70px;height:95px;position:relative;border-radius:6px;overflow:hidden;">
                <img src="/cards/${coverCard.image}" style="width:100%;height:100%;object-fit:cover;" />
                <div class="thumb-frame" style="position:absolute;inset:0;">
                  <img src="/${rarityFrames[coverCard.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
                </div>
              </div>
              <span class="cover-card-name">${coverCard.name}</span>
            </div>
          ` : '<div class="no-cover">No cover selected</div>'}
          <button class="btn-pick-cover ${pickingCover ? 'active' : ''}" id="btn-pick-cover">
            ${pickingCover ? '✕ Cancel' : '🖼 Set Cover'}
          </button>
        </div>

        <div class="deck-list" id="deck-list">
          ${deck.length === 0
            ? '<div class="deck-empty">Click cards to add them</div>'
            : renderDeckList()
          }
        </div>

        <div class="deck-actions">
          ${deckReady
            ? `<button class="btn-save-deck" id="btn-save">✅ Deck Ready!</button>`
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
  // Slot selector
  document.querySelectorAll('.deck-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.dataset.slot)
      filters = { search: '', rarity: 'all', mana: 'all' }
      renderDeckBuilder(slot)
    })
  })

  // Deck name
  document.getElementById('deck-name-input')?.addEventListener('input', e => {
    deckName = e.target.value
    saveDeck(currentSlot, deck, deckName, coverId)
  })

  // Search
  document.getElementById('filter-search')?.addEventListener('input', e => {
    filters.search = e.target.value
    renderDeckBuilder(currentSlot)
  })

  // Rarity filter
  document.getElementById('filter-rarity')?.addEventListener('change', e => {
    filters.rarity = e.target.value
    renderDeckBuilder(currentSlot)
  })

  // Mana filter
  document.getElementById('filter-mana')?.addEventListener('change', e => {
    filters.mana = e.target.value
    renderDeckBuilder(currentSlot)
  })

  // Pick cover button
  document.getElementById('btn-pick-cover')?.addEventListener('click', () => {
    pickingCover = !pickingCover
    renderDeckBuilder(currentSlot)
  })

  // Card click
  document.querySelectorAll('.thumb-card').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.id)
      const card = allCards.find(c => c.id === id)
      if (!card) return

      if (pickingCover) {
        coverId = id
        pickingCover = false
        saveDeck(currentSlot, deck, deckName, coverId)
        renderDeckBuilder(currentSlot)
        return
      }

      if (deck.length >= DECK_SIZE) return
      if (countInDeck(id) >= MAX_COPIES) return
      const scrollPos = document.getElementById('card-grid')?.scrollTop || 0
      deck.push(card)
      saveDeck(currentSlot, deck, deckName, coverId)
      renderDeckBuilder(currentSlot)
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
      saveDeck(currentSlot, deck, deckName, coverId)
      renderDeckBuilder(currentSlot)
    })
  })

  // Clear deck
  document.getElementById('btn-clear')?.addEventListener('click', () => {
    deck = []
    saveDeck(currentSlot, deck, deckName, coverId)
    renderDeckBuilder(currentSlot)
  })

  // Back
  document.getElementById('btn-back')?.addEventListener('click', () => {
    router.go('menu')
  })
}