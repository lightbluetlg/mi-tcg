export const router = {
  current: 'menu',
  params: {},
  listeners: [],

  go(page, params = {}) {
    this.current = page
    this.params = params
    this.listeners.forEach(fn => fn(page, params))
  },

  onChange(fn) {
    this.listeners.push(fn)
  }
}