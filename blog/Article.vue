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
      content: { fields: { title: '' } },
    }
  },
  created: function () {
    this.getContent()
  },
  updated: Prism.highlightAll,
  methods: {
    getContent() {
      Api.getArticle(this.$route.params.id)
        .then((response) => {
          this.content = response
        })
        .catch(() => this.router.push({ path: `/articles/page/1` }))
    },
    goToList() {
      this.router.push({ path: '/articles' })
    },
  },
}

</script>
  
<template>
   <div>
    <article v-cloak>
      <header>
        <h2>{{ content.fields.title }}</h2>
        <time v-if="content.fields.date!=null">{{content.fields.date}}</time>
      </header>
      <div v-html="content.fields.content"></div>
    </article>
    <p class="txtcenter"><button class="btn" v-on:click="goToList">Liste des articles</button></p>
  </div>
</template>