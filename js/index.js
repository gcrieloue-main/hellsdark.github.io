import Vue from './vue.min.js'
import { ThemeToggle } from './theme-switcher'

const app = new Vue({
  el: '#landing',
  components: {
    'theme-toggle': ThemeToggle,
  },
})
