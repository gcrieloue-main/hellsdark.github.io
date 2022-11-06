import { createApp } from 'vue/dist/vue.esm-bundler'
import { ThemeToggle } from './theme-switcher'

const app = createApp({})
  .component('theme-toggle', ThemeToggle)
  .mount('#landing')
