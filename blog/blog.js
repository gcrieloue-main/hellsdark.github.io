import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHashHistory } from 'vue-router'
import { ThemeToggle } from '@Shared/theme-switcher.js'
import Articles from './Articles.vue'
import Article from './Article.vue'
import Search from './Search.vue'
import SearchInput from './SearchInput.vue'

const routes = [
  { path: '/articles', component: Articles },
  { path: '/articles/page/:page', component: Articles },
  { name:'Article', path: '/article/:id', component: Article },
  { path: '/search', component: Search },
  { path: '/:pathMatch(.*)', redirect: '/articles' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const urlId = to?.params?.id
  const separator = ' / '
  if (urlId) {
    document.title = document.title.includes(separator)
      ? `${document.title.substring(
          0,
          document.title.indexOf(separator)
        )}${separator}${urlId}`
      : `${document.title}${separator}${urlId}`
  } else {
    document.title = document.title.includes(separator)
      ? `${document.title.substring(0, document.title.indexOf(separator))}`
      : `${document.title}`
  }
  next()
})

const app = createApp({})
  .component('articles', Articles)
  .component('article-view', Article)
  .component('search', Search)
  .component('search-input', SearchInput)
  .component('theme-toggle', ThemeToggle)
  .use(router)
  .mount('#app')
