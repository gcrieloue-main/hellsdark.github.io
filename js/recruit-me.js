import Vue from './vue.min.js'
import * as Api from './api.js'


const app = new Vue({
  el: '#recruit-me',
  data: {
      contents: [],
  },
  created: function () {
    this.getContent()
  },
  methods: {
    getContent() {
      this.contents = []
      this.isLoading = true
      Api.getRecruitMeSections().then((response) => {
        this.contents = response.items
      })
    },
  },
})
