import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', {
  state: () => ({
    files: [],
    pin_files: []
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    setValue (value) {
      const ids = this.pin_files.map((elm) => elm?.id)
      this.files = value.filter((elm) => !ids.includes(elm.id))
    },
    pinFile (id) {
      const index = this.files.findIndex((elm) => elm.id === id)
      const file_pin = this.files[index]
      this.files.splice(index, 1)
      this.pin_files.push(file_pin)
    },
    unPinFile (id) {
      const index = this.pin_files.findIndex((elm) => elm.id === id)
      const file_pin = this.pin_files[index]
      this.pin_files.splice(index, 1)
      this.files.push(file_pin)
    },
    delete (id) {
      const index = this.files.findIndex((elm) => elm.id === id)
      this.files.splice(index, 1)
    },
    append (elm) {
      this.files.push(elm)
    }
  },
  persist: true
})
