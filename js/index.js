import { createApp } from 'vue/dist/vue.esm-bundler'
import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import { ThemeToggle } from './theme-switcher'

import { messages } from './i18n'

const params = new URLSearchParams(window.location.search)
const lang = params.get('lang')

const i18n = createI18n({
  locale: lang || 'fr', // set locale
  fallbackLocale: 'fr', // set fallback locale
  messages, // set locale messages
})

const app = createApp({})
  .component('theme-toggle', ThemeToggle)
  .use(i18n)
  .mount('#landing')
