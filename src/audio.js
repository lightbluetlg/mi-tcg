// ── AUDIO SYSTEM
const sounds = {
  card_play:  new Audio('/sounds/card_play.wav'),
  attack:     new Audio('/sounds/attack.wav'),
  death:      new Audio('/sounds/death.wav'),
  victory:    new Audio('/sounds/victory.wav'),
  defeat:     new Audio('/sounds/defeat.mp3'),
  card_draw:  new Audio('/sounds/card_draw.mp3'),
  turn:       new Audio('/sounds/turn.wav'),
}

// Preload all sounds
Object.values(sounds).forEach(audio => {
  audio.preload = 'auto'
  audio.volume = 0.5
})

// Individual volume tweaks
sounds.victory.volume = 0.7
sounds.defeat.volume  = 0.7
sounds.turn.volume    = 0.3
sounds.card_draw.volume = 0.4

let muted = false

export function playSound(name) {
  if (muted) return
  const sound = sounds[name]
  if (!sound) return
  sound.currentTime = 0
  sound.play().catch(() => {})
}

export function toggleMute() {
  muted = !muted
  return muted
}

export function isMuted() {
  return muted
}