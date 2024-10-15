import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', {
  state: () => ({
    token: ''
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    setValue (value) {
      this.token = value
    },
    isAuthenticated () {
      return this.token.length > 0
    }
  },
  persist: true
})
