import { createApp } from 'vue/dist/vue.esm-bundler'
import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import * as Api from '@Shared/api.js'
import { themeToggleMixin } from '@Shared/theme-switcher.js'
import { messages } from '../js/i18n'

const params = new URLSearchParams(window.location.search)
const lang = params.get('lang')

const i18n = createI18n({
  locale: lang || 'fr', // set locale
  fallbackLocale: 'fr', // set fallback locale
  messages, // set locale messages
})

const cv = createApp({
  mixins: [themeToggleMixin],
  data: () => {
    return {
      workExperiences: [],
      paragraphs: {},
    }
  },
  created: function () {
    const lang = params.get('lang')
    this.getData(lang)
  },
  methods: {
    getData(lang) {
      Api.getWorkExperiences(lang).then(
        (response) => (this.workExperiences = response)
      )
      Api.getCvParagraphs(lang).then((response) => (this.paragraphs = response))
    },
  },
})
  .use(i18n)
  .mount('#app')
