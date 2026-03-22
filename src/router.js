export const router = {
  current: 'menu',
  params: {},
  listeners: [],

  go(page, params = {}) {
    const app = document.querySelector('#app')
    if (app) {
      app.style.transition = 'opacity 0.2s ease, transform 0.2s ease'
      app.style.pointerEvents = 'none'
      app.style.opacity = '0'
      app.style.transform = 'translateY(-6px)'
      setTimeout(() => {
        app.style.transition = ''
        app.style.opacity = ''
        app.style.transform = ''
        app.style.pointerEvents = ''
        this.current = page
        this.params = params
        this.listeners.forEach(fn => fn(page, params))
      }, 220)
    } else {
      this.current = page
      this.params = params
      this.listeners.forEach(fn => fn(page, params))
    }
  },

  onChange(fn) {
    this.listeners.push(fn)
  }
}