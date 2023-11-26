import {i18n} from './i18n'

export const languageToggleMixin = {
  data: () => {
    return {
      language: 'fr',
    }
  },
  created: function () {
    this.language = localStorage.getItem('language')
    this.setLanguage(this.language)
  },
  methods: {
    setLanguage: function (lang) {
      localStorage.setItem('language', lang)
      this.setTitle()
      this.language = lang
      i18n.locale = lang
      console.log('locale', i18n.locale)
    },
  },
}

export const LanguageToggle = {
  mixins: [languageToggleMixin],
  template: `<div class="language-switch-container" v-bind:title="title">
  <label for="language-fr" :class="{active: isLanguage('fr')}"><input id="language-fr" type="checkbox" v-on:change="setLanguage('fr')" /> FR</label> - 
  <label for="language-en" :class="{active: isLanguage('en')}"><input id="language-en" type="checkbox" v-on:change="setLanguage('en')" /> EN</label>
</div>`,
  data: () => {
    return {
      language: 'fr',
      title: '',
    }
  },
  created: function () {
    this.setTitle()
  },
  methods: {
    isLanguage:  function (lang) {return this.language === lang},
    setTitle: function () {},
  },
}
