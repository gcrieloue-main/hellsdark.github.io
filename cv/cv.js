import { createApp } from 'vue/dist/vue.esm-bundler'
import * as Api from '@Shared/api.js'
import { themeToggleMixin } from '@Shared/theme-switcher.js'

const cv = createApp({
  mixins: [themeToggleMixin],
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
})
.mount('#cv')
