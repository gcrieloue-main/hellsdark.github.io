import { ref } from 'vue'

export const searchStore = ref({
  value: '',
  search(text) {
    this.value = text
  },
})
