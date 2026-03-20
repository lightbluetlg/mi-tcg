import { router } from '../router.js'
import { getAllDecks } from './deckbuilder.js'
import { allCards } from '../cards.js'

const rarityFrames = {
  uncommon: 'RavenCard_Green_Frame.png',
  rare:     'RavenCard_Blue_Frame.png',
  epic:     'RavenCard_Purple_Frame.png',
  legendary:'RavenCard_Frame.png',
}

export function renderPreMatch() {
  const decks = getAllDecks()
  const readyDecks = decks.filter(d => d.cards && d.cards.length === 20)

  document.querySelector('#app').innerHTML = `
    <div class="prematch-screen">
      <div class="prematch-content">
        <h1 class="prematch-title">Choose Your Deck</h1>
        <p class="prematch-sub">Select a deck to battle with</p>

        <div class="prematch-decks">
          ${decks.map(d => {
            const ready = d.cards && d.cards.length === 20
            const coverCard = d.coverId ? allCards.find(c => c.id === d.coverId) : null
            const frame = coverCard ? rarityFrames[coverCard.rarity] : null

            return `
              <div class="prematch-deck ${ready ? 'ready' : 'empty'}" data-slot="${d.slot}">
                <div class="prematch-deck-art">
                  ${coverCard ? `
                    <div style="position:relative;width:100%;height:100%;">
                      <img src="/cards/${coverCard.image}" style="width:100%;height:100%;object-fit:cover;" />
                      <div style="position:absolute;inset:0;">
                        <img src="/${frame}" style="width:100%;height:100%;object-fit:fill;" />
                      </div>
                    </div>
                  ` : '<div class="prematch-no-art">?</div>'}
                </div>
                <div class="prematch-deck-info">
                  <div class="prematch-deck-name">${d.name || `Deck ${d.slot}`}</div>
                  <div class="prematch-deck-status ${ready ? 'status-ready' : 'status-empty'}">
                    ${ready ? `✅ ${d.cards.length} cards` : 'Empty'}
                  </div>
                </div>
              </div>
            `
          }).join('')}
        </div>

        <button class="btn-back prematch-back" id="btn-back">← Back</button>
      </div>
    </div>
  `

  document.querySelectorAll('.prematch-deck.ready').forEach(el => {
    el.addEventListener('click', () => {
      const slot = parseInt(el.dataset.slot)
      router.go('game', { slot })
    })
  })

  document.getElementById('btn-back')?.addEventListener('click', () => {
    router.go('menu')
  })
}