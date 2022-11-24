<script setup>
import { useRouter, onBeforeRouteLeave } from 'vue-router'

const router = useRouter()

onBeforeRouteLeave((to, from) => {
  searchStore.value.search('')
})
</script>

<script>
import * as Api from '@Shared/api.js'
import { searchStore } from './searchStore'
import { watch } from 'vue/dist/vue.esm-bundler'
import debounce from 'lodash.debounce'

export default {
  data: () => {
    return {
      contents: [],
      searchEmpty: true,
      isLoading: false,
    }
  },
  mounted() {
    watch(searchStore.value, this.watchSearch)
  },
  methods: {
    watchSearch: debounce(function (text) {
      if (text.value.length > 2) {
        this.getContent(text.value)
      } else {
        this.searchEmpty = true
        this.contents = []
      }
    }, 200),
    getContent(text) {
      this.contents = []
      this.isLoading = true
      Api.searchArticles(text).then((response) => {
        this.isLoading = false
        this.contents = response
        this.searchEmpty = false
      })
    },
    cancel() {
      this.router.push({ path: `/articles/page/1` })
    },
  },
}
</script>

<template>
  <div id="search-results">
    <p v-if="isLoading" v-cloak class="loading"></p>
    <p v-if="!isLoading && searchEmpty" v-cloak>Que cherchez vous ?</p>
    <p v-if="!isLoading && !contents.length && !searchEmpty" v-cloak>
      Aucun résultat
    </p>
    <ul v-cloak>
      <li v-for="content in contents">
        <span>
          <RouterLink
            :to="{
              name: 'Article',
              params: { id: content.fields.slug || content.sys.id },
            }"
            >{{ content.fields.title }}</RouterLink
          >
        </span>
        <span>{{ content.fields.date }}</span>
      </li>
    </ul>
    <p class="txtcenter">
      <button class="btn" @click="cancel">Annuler</button>
    </p>
  </div>
</template>
