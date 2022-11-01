import { createApp } from 'vue/dist/vue.esm-bundler'
import * as Api from '../root-js/api'
import { themeToggleMixin } from '../root-js/theme-switcher.js'

const cv = createApp({
  data: () => {
    return {
      workExperiences: [],
      paragraphs: {}
    }
  },
  created: function () {
    this.getData()
  },
  methods: {
    getData() {
      Api.getWorkExperiences().then(
        (response) => (this.workExperiences = response)
      )
      Api.getCvParagraphs().then((response) => (this.paragraphs = response))
    },
  },
  mixins:  [themeToggleMixin]
}
)
.mount('#cv')
