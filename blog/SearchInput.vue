<script setup>
import { useRouter } from 'vue-router'
import { searchStore } from './searchStore'
import { watch, ref } from 'vue/dist/vue.esm-bundler'

const router = useRouter()
const inputValue = ref('')
</script>

<script>
export default {
  watch: {
    inputValue() {
      if (this.inputValue){
        this.router.push({ path: `/search` })
        this.searchStore.search(this.inputValue)
      }
    },
    'searchStore.value': {
      handler: function (val) {
        this.inputValue = val
      },
    },
  },
  methods: {
    onSubmit() {
      // unfocus the field on submit
      // this way, the virtual keyboard is hidden on mobiles when they press enter
      this.$refs.searchInput.blur()
    },
  },
}
</script>

<template>
  <form v-on:submit.prevent="onSubmit">
    <p>
      <input
        ref="searchInput"
        type="text"
        placeholder="Rechercher…"
        v-model="inputValue"
      />
    </p>
  </form>
</template>
