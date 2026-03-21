import { router } from '../router.js'
import { getAllDecks } from './deckbuilder.js'
import { allCards } from '../cards.js'
import { allHeroes } from '../heroes.js'
import { BASE } from '../constants.js'

const rarityFrames = {
  uncommon: 'RavenCard_Green_Frame.png',
  rare:     'RavenCard_Blue_Frame.png',
  epic:     'RavenCard_Purple_Frame.png',
  legendary:'RavenCard_Frame.png',
}

let selectedHeroId = null
let currentSlot = 1

export function renderPreMatch(params) {
  selectedHeroId = null
  currentSlot = params?.slot || 1
  renderHeroSelect()
}

function renderHeroSelect() {
  document.querySelector('#app').innerHTML = `
    <div class="prematch-screen">
      <div class="prematch-content">
        <h1 class="prematch-title">Choose Your Hero</h1>
        <p class="prematch-sub">Your hero's power will shape the battle</p>

        <div class="hero-select-grid">
          ${allHeroes.map(hero => `
            <div class="hero-card ${selectedHeroId === hero.id ? 'selected' : ''}"
              data-hero="${hero.id}"
              style="--hero-color: ${hero.color}; --hero-border: ${hero.borderColor}; --hero-glow: ${hero.glowColor};">
              <div class="hero-portrait-art">
                ${hero.image
                  ? `<img src="${BASE}heroes/${hero.image}" style="width:100%;height:100%;object-fit:cover;" />`
                  : `<div class="hero-placeholder" style="background: linear-gradient(135deg, ${hero.color}, #0d0d1a);">
                      <span style="font-size:48px;">⚔️</span>
                    </div>`
                }
              </div>
              <div class="hero-card-info">
                <div class="hero-card-name" style="color:${hero.borderColor}">${hero.name}</div>
                <div class="hero-card-passive">✦ ${hero.passive}</div>
                <div class="hero-card-ability">
                  <span class="hero-ability-name">${hero.abilityName}</span>
                  <span class="hero-ability-cost">${hero.abilityCost} mana</span>
                </div>
                <div class="hero-card-ability-desc">${hero.abilityDesc}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="btn-confirm-hero" id="btn-confirm-hero" style="display:none;">⚔️ Confirm Hero</button>
        <button class="btn-back prematch-back" id="btn-back">← Back</button>
      </div>
    </div>
  `

  document.querySelectorAll('.hero-card').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.hero-card').forEach(h => h.classList.remove('selected'))
      el.classList.add('selected')
      selectedHeroId = el.dataset.hero
      const confirmBtn = document.getElementById('btn-confirm-hero')
      if (confirmBtn) confirmBtn.style.display = 'block'
    })
  })

  document.getElementById('btn-confirm-hero')?.addEventListener('click', () => {
    if (!selectedHeroId) return
    router.go('game', { slot: currentSlot, heroId: selectedHeroId })
  })

  document.getElementById('btn-back')?.addEventListener('click', () => {
    router.go('menu')
  })
}

