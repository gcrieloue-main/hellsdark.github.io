import Vue from './vue.min.js'
import * as Api from './api.js'

const cv = new Vue({
  el: '#cv',
  data: {
    workExperiences: [],
    paragraphs: {},
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
