import { router } from '../router.js'
import { allCards } from '../cards.js'
import { BASE } from '../constants.js'
import { gsap } from 'gsap'

const rarityFrames = {
  uncommon:  'RavenCard_Green_Frame.png',
  rare:      'RavenCard_Blue_Frame.png',
  epic:      'RavenCard_Purple_Frame.png',
  legendary: 'RavenCard_Frame.png',
}

const rarityColors = {
  uncommon:  '#6ee7b7',
  rare:      '#93c5fd',
  epic:      '#c4b5fd',
  legendary: '#fcd34d',
}

const rarityGlow = {
  uncommon:  'rgba(52,211,153,0.6)',
  rare:      'rgba(96,165,250,0.7)',
  epic:      'rgba(167,139,250,0.8)',
  legendary: 'rgba(251,191,36,1)',
}

// ── RARITY RATES
const NORMAL_RATES  = { uncommon: 0.72, rare: 0.20, epic: 0.065, legendary: 0.015 }
const PREMIUM_RATES = { uncommon: 0.50, rare: 0.34, epic: 0.13,  legendary: 0.03  }

function rollRarity(rates) {
  const r = Math.random()
  if (r < rates.legendary) return 'legendary'
  if (r < rates.legendary + rates.epic) return 'epic'
  if (r < rates.legendary + rates.epic + rates.rare) return 'rare'
  return 'uncommon'
}

function generatePack(type) {
  const rates = type === 'premium' ? PREMIUM_RATES : NORMAL_RATES
  const cards = []

  // Slot 1: guaranteed rare+ for premium
  let firstRarity = rollRarity(rates)
  if (type === 'premium' && firstRarity === 'uncommon') firstRarity = 'rare'

  const byRarity = {
    uncommon:  allCards.filter(c => c.rarity === 'uncommon'),
    rare:      allCards.filter(c => c.rarity === 'rare'),
    epic:      allCards.filter(c => c.rarity === 'epic'),
    legendary: allCards.filter(c => c.rarity === 'legendary'),
  }

  function pickCard(rarity) {
    const pool = byRarity[rarity]
    return { ...pool[Math.floor(Math.random() * pool.length)] }
  }

  cards.push(pickCard(firstRarity))
  for (let i = 1; i < 5; i++) {
    cards.push(pickCard(rollRarity(rates)))
  }

  return cards
}

// ── RENDER PACK SELECT
export function renderPackOpening() {
  document.querySelector('#app').innerHTML = `
    <div class="packopen-screen">
      <div class="packopen-bg"></div>

      <div class="packopen-content" id="packopen-content">
        <h1 class="packopen-title">Open a Pack</h1>
        <p class="packopen-sub">Choose your pack and reveal your cards</p>

        <div class="pack-select-row">

          <div class="pack-choice" id="pack-normal" data-type="normal">
            <div class="pack-img-wrap">
              <img src="${BASE}packs/normal.png" class="pack-img" alt="Normal Pack" />
              <div class="pack-glow normal-glow"></div>
            </div>
            <div class="pack-choice-info">
              <div class="pack-choice-name">Normal Pack</div>
              <div class="pack-choice-desc">5 cards · Standard drop rates</div>
              <div class="pack-rates">
                <span class="rate uncommon">Uncommon 72%</span>
                <span class="rate rare">Rare 20%</span>
                <span class="rate epic">Epic 6.5%</span>
                <span class="rate legendary">Legendary 1.5%</span>
              </div>
            </div>
          </div>

          <div class="pack-choice premium" id="pack-premium" data-type="premium">
            <div class="pack-img-wrap">
              <img src="${BASE}packs/premium.png" class="pack-img" alt="Premium Pack" />
              <div class="pack-glow premium-glow"></div>
            </div>
            <div class="pack-choice-info">
              <div class="pack-choice-name">Premium Pack</div>
              <div class="pack-choice-desc">5 cards · Guaranteed Rare · Higher rates</div>
              <div class="pack-rates">
                <span class="rate uncommon">Uncommon 50%</span>
                <span class="rate rare">Rare 34%</span>
                <span class="rate epic">Epic 13%</span>
                <span class="rate legendary">Legendary 3%</span>
              </div>
            </div>
          </div>

        </div>

        <button class="btn-back packopen-back" id="btn-back-pack">← Back to Menu</button>
      </div>

      <!-- Opening stage (hidden until pack clicked) -->
      <div class="packopen-stage" id="packopen-stage" style="display:none;">
        <div class="stage-pack-wrap" id="stage-pack-wrap">
          <img id="stage-pack-img" src="" class="stage-pack-img" />
          <div class="stage-pack-shine" id="stage-pack-shine"></div>
        </div>
        <div class="stage-cards-row" id="stage-cards-row"></div>
        <button class="btn-open-again" id="btn-open-again" style="display:none;">Open Another</button>
        <button class="btn-back-from-open" id="btn-back-from-open" style="display:none;">← Back to Menu</button>
      </div>

    </div>
  `

  attachPackEvents()
  animatePackChoices()
}

function animatePackChoices() {
  gsap.fromTo('.pack-choice',
    { opacity: 0 },
    { opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' }
  )
  gsap.fromTo('.packopen-title',
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power2.out' }
  )
}

function attachPackEvents() {
  document.getElementById('btn-back-pack')?.addEventListener('click', () => {
    router.go('menu')
  })

  document.querySelectorAll('.pack-choice').forEach(el => {
    el.addEventListener('click', () => {
      const type = el.dataset.type
      startPackOpening(type)
    })
  })
}

function startPackOpening(type) {
  const content = document.getElementById('packopen-content')
  const stage = document.getElementById('packopen-stage')
  const packImg = document.getElementById('stage-pack-img')

  packImg.src = `${BASE}packs/${type}.png`

  gsap.to(content, {
    duration: 0.3,
    opacity: 0,
    y: -20,
    onComplete: () => {
      content.style.display = 'none'
      stage.style.display = 'flex'
      gsap.from(stage, { duration: 0.3, opacity: 0 })
      animatePackOpen(type)
    }
  })
}

function animatePackOpen(type) {
  const packWrap = document.getElementById('stage-pack-wrap')
  const shine = document.getElementById('stage-pack-shine')
  const cards = generatePack(type)
  const isPremium = type === 'premium'

  // Pack entrance
  gsap.from(packWrap, {
    duration: 0.5,
    scale: 0.5,
    opacity: 0,
    ease: 'back.out(1.7)',
  })

  // Pack idle float — only starts after entrance animation
  gsap.to(packWrap, {
    duration: 2,
    y: -12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5,
  })

  // Shine sweep on pack
  setTimeout(() => {
    gsap.fromTo(shine,
      { x: '-100%', opacity: 0.8 },
      { x: '200%', opacity: 0, duration: 0.6, ease: 'power1.inOut' }
    )
  }, 600)

  // Premium pack extra glow pulse
  if (isPremium) {
    gsap.to(packWrap, {
      duration: 0.8,
      filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.9))',
      repeat: 2,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 0.3,
    })
  }

  // Click to open
  packWrap.style.cursor = 'pointer'
  packWrap.addEventListener('click', () => {
    gsap.killTweensOf(packWrap)
    revealCards(cards, isPremium)
  }, { once: true })

  // Hint text
  const hint = document.createElement('div')
  hint.className = 'pack-click-hint'
  hint.textContent = 'Click to open'
  packWrap.parentElement.appendChild(hint)
  gsap.from(hint, { duration: 0.5, opacity: 0, delay: 0.8 })
}

function revealCards(cards, isPremium) {
  const packWrap = document.getElementById('stage-pack-wrap')
  const cardsRow = document.getElementById('stage-cards-row')
  const hint = document.querySelector('.pack-click-hint')
  if (hint) hint.remove()

  // Pack burst animation
  gsap.to(packWrap, {
    duration: 0.2,
    scale: 1.3,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(packWrap, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        ease: 'power2.in',
        onComplete: () => {
          packWrap.style.display = 'none'
          showCards(cards, isPremium, cardsRow)
        }
      })
    }
  })

  // Flash effect
  const flash = document.createElement('div')
  flash.style.cssText = `
    position: fixed; inset: 0; background: white;
    pointer-events: none; z-index: 999; opacity: 0;
  `
  document.body.appendChild(flash)
  gsap.to(flash, {
    opacity: isPremium ? 0.6 : 0.3,
    duration: 0.1,
    onComplete: () => gsap.to(flash, { opacity: 0, duration: 0.4, onComplete: () => flash.remove() })
  })
}

function showCards(cards, isPremium, container) {
  container.style.display = 'flex'

  cards.forEach((card, i) => {
    const cardEl = document.createElement('div')
    cardEl.className = `revealed-card rarity-${card.rarity}`
    cardEl.innerHTML = `
      <div class="revealed-card-inner" id="rcard-${i}">
        <div class="revealed-card-back">
          <img src="${BASE}Cardback.webp" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />
        </div>
        <div class="revealed-card-front">
          <div class="card-image" style="position:absolute;inset:0;border-radius:8px;overflow:hidden;z-index:1;">
            <img src="${BASE}cards/${card.image}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />
          </div>
          <div class="card-frame" style="position:absolute;inset:0;z-index:5;pointer-events:none;">
            <img src="${BASE}${rarityFrames[card.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
          </div>
          <div style="position:absolute;top:3px;left:3px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;z-index:20;">
            <img src="${BASE}pngicons/mana.png" style="position:absolute;width:36px;height:36px;object-fit:contain;z-index:1;" />
            <span style="position:relative;z-index:3;font-family:Barlow,sans-serif;font-weight:900;font-size:13px;color:#fff;margin-top:0px;text-shadow:0 0 4px rgba(0,0,0,1),0 0 8px rgba(0,0,0,1),0 0 16px rgba(0,0,0,1),-1px -1px 0 rgba(0,0,0,1),1px -1px 0 rgba(0,0,0,1),-1px 1px 0 rgba(0,0,0,1),1px 1px 0 rgba(0,0,0,1);">${card.mana}</span>
          </div>
          <div style="position:absolute;bottom:28px;left:4px;right:4px;z-index:20;text-align:center;font-family:'Passion One',sans-serif;font-size:10px;letter-spacing:0.8px;text-transform:uppercase;padding:2px 4px;border-radius:2px;background:rgba(0,0,0,0.6);color:${rarityColors[card.rarity]};text-shadow:0 1px 2px rgba(0,0,0,0.9);">${card.name}</div>
          <div style="position:absolute;bottom:4px;left:4px;right:4px;display:flex;justify-content:space-between;z-index:20;">
            <div style="display:flex;align-items:center;gap:2px;font-family:Barlow,sans-serif;font-size:14px;font-weight:700;padding:2px 5px;border-radius:4px;background:rgba(5,5,5,0.92);border:1px solid rgba(180,40,40,0.6);color:#ff7070;">
              <img src="${BASE}pngicons/crossed_swords.png" style="width:12px;height:12px;" />${card.attack}
            </div>
            <div style="display:flex;align-items:center;gap:2px;font-family:Barlow,sans-serif;font-size:14px;font-weight:700;padding:2px 5px;border-radius:4px;background:rgba(5,5,5,0.92);border:1px solid rgba(180,20,40,0.6);color:#ff4466;">
              <img src="${BASE}pngicons/heart.png" style="width:12px;height:12px;" />${card.hp}
            </div>
          </div>
          ${card.rarity === 'legendary' ? `
            <div style="position:absolute;inset:0;border-radius:8px;pointer-events:none;z-index:25;overflow:hidden;">
              <span style="position:absolute;top:20%;left:12%;color:#fde68a;font-size:8px;opacity:0;animation:sparkle-float 4s ease-in-out infinite 0s;">✦</span>
              <span style="position:absolute;top:30%;right:14%;color:#fde68a;font-size:8px;opacity:0;animation:sparkle-float 4s ease-in-out infinite 0.9s;">✦</span>
              <span style="position:absolute;top:55%;left:9%;color:#fde68a;font-size:8px;opacity:0;animation:sparkle-float 4s ease-in-out infinite 1.8s;">✦</span>
            </div>
          ` : ''}
        </div>
      </div>
      <div class="revealed-card-rarity" style="color:${rarityColors[card.rarity]}">${card.rarity.toUpperCase()}</div>
    `
    container.appendChild(cardEl)
  })

  // Staggered entrance then flip
  gsap.from('.revealed-card', {
    duration: 0.4,
    y: 60,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.4)',
    onComplete: () => {
      flipCardsSequentially(cards, isPremium)
    }
  })
}

function flipCardsSequentially(cards, isPremium) {
  cards.forEach((card, i) => {
    setTimeout(() => {
      const inner = document.getElementById(`rcard-${i}`)
      if (!inner) return

      gsap.to(inner, {
        duration: 0.2,
        rotateY: 90,
        ease: 'power2.in',
        onComplete: () => {
          inner.classList.add('flipped')
          gsap.to(inner, {
            duration: 0.2,
            rotateY: 0,
            ease: 'power2.out',
            onComplete: () => {
              // Rarity-specific reveal effects
              const cardEl = inner.closest('.revealed-card')
              if (card.rarity === 'legendary') {
                createParticleBurst(cardEl, '#fcd34d', 20)
                gsap.to(cardEl, {
                  duration: 0.4,
                  filter: `drop-shadow(0 0 24px ${rarityGlow.legendary})`,
                  ease: 'power2.out',
                })
              } else if (card.rarity === 'epic') {
                createParticleBurst(cardEl, '#c4b5fd', 12)
                gsap.to(cardEl, {
                  duration: 0.4,
                  filter: `drop-shadow(0 0 18px ${rarityGlow.epic})`,
                  ease: 'power2.out',
                })
              } else if (card.rarity === 'rare') {
                gsap.to(cardEl, {
                  duration: 0.3,
                  filter: `drop-shadow(0 0 12px ${rarityGlow.rare})`,
                  ease: 'power2.out',
                })
              }
            }
          })
        }
      })
    }, i * 250)
  })

  // Show buttons after all cards revealed
  setTimeout(() => {
    const again = document.getElementById('btn-open-again')
    const back = document.getElementById('btn-back-from-open')
    if (again) {
      again.style.display = 'block'
      gsap.from(again, { duration: 0.4, y: 20, opacity: 0, ease: 'back.out(1.4)' })
      again.addEventListener('click', () => renderPackOpening())
    }
    if (back) {
      back.style.display = 'block'
      back.style.opacity = '1'
      gsap.fromTo(back, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.4)' })
      back.addEventListener('click', () => router.go('menu'))
    }
  }, cards.length * 250 + 600)
}

function createParticleBurst(el, color, count) {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div')
    p.style.cssText = `
      position: fixed;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: ${color};
      pointer-events: none;
      z-index: 999;
      left: ${cx}px;
      top: ${cy}px;
      box-shadow: 0 0 6px ${color};
    `
    document.body.appendChild(p)

    const angle = (i / count) * Math.PI * 2
    const dist = 60 + Math.random() * 80
    const tx = Math.cos(angle) * dist
    const ty = Math.sin(angle) * dist

    gsap.to(p, {
      duration: 0.6 + Math.random() * 0.4,
      x: tx,
      y: ty,
      opacity: 0,
      scale: 0.2,
      ease: 'power2.out',
      onComplete: () => p.remove(),
    })
  }
}
