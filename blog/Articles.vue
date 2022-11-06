<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<script>
import * as Api from '@Shared/api.js'
import Prism from '@Shared/prism.js'

export default {
  data: () => {
    return {
      contents: [],
      page: 1,
      nbArticles: 6,
      isLoading: false,
    }
  },
  created() {
    this.page = Number(this.$route.params.page) || 1
    this.getContent(this.page)
  },
  watch: {
    '$route.params.page': function (page) {
      this.page = Number(this.$route.params.page) || 1
      this.getContent(page)
    },
  },
  updated: Prism.highlightAll,
  methods: {
    openArticle(content) {
      this.router.push({
        path: `/article/${content.fields.slug || content.sys.id}`,
      })
    },
    getContent(page) {
      this.contents = []
      this.isLoading = true
      Api.getArticles(page, this.nbArticles).then((response) => {
        this.isLoading = false
        this.contents = response
      })
    },
    nextPage() {
      this.router.push({ path: `/articles/page/${++this.page}` })
    },
    previousPage() {
      if (this.page > 1) {
        this.router.push({ path: `/articles/page/${--this.page}` })
      }
    },
  },
}
</script>

<template>
  <div>
    <p v-if="!isLoading && !contents.length" class="no-articles" v-cloak>
      That's all folks !
    </p>
    <div v-if="isLoading">
      <article class="skeleton"></article>
      <article class="skeleton"></article>
      <article class="skeleton"></article>
    </div>
    <article v-for="content in contents" v-cloak>
      <header>
        <time v-if="content.fields.date != null">{{
          content.fields.date
        }}</time>
        <h2>
          <a @click="openArticle(content)">{{ content.fields.title }}</a>
        </h2>
      </header>
      <div v-html="content.fields.content"></div>
    </article>
    <p class="txtcenter">
      <button class="btn" @click="previousPage" v-cloak v-if="page > 1">
        Articles suivants
      </button>
      <button
        class="btn"
        v-cloak
        @click="nextPage"
        v-if="contents.length == nbArticles"
      >
        Articles précédents
      </button>
    </p>
  </div>
</template>
