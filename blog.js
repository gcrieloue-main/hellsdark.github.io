import Vue from "./vue.min.js";
import VueRouter from "./vue-router.js";
import Prism from "./prism.js";
import * as Api from "./api.js";
//import debounce from "lodash.debounce"

Vue.use(VueRouter);

const bus = new Vue();

const Articles = {
  router,
  template: `<div><article v-for="content in contents" v-cloak>
  <aside><p class="date" v-if="content.fields.date!=null">{{content.fields.date}}</p></aside>
  <h2>{{ content.fields.title }}</h2>
  <div v-html="content.fields.content"></div>
  </article>
  <p class="txtcenter">
  <button class="btn" v-on:click="previousPage" v-cloak v-if="page>1">Articles suivants</button>
  <button class="btn" v-cloak v-on:click="nextPage" v-if="contents.length == 10">Articles précédents</button>
  </p></div>`,
  data: () => {
    return {
      contents: [{ fields: { title: "" } }],
      page: 1
    };
  },
  created: function() {
    this.getContent(1);
  },
  watch: {
    "$route.params.page": function(page) {
      this.page = Number(this.$route.params.page) || 1;
      this.getContent(page);
    }
  },
  updated: Prism.highlightAll,
  methods: {
    getContent(page) {
      Api.getArticles(page).then(response => {
        this.contents = response;
      });
    },
    nextPage() {
      router.push({ path: `/articles/page/${++this.page}` });
    },
    previousPage() {
      if (this.page > 1) {
        router.push({ path: `/articles/page/${--this.page}` });
      }
    }
  }
};

const Article = {
  router,
  template: `<div><article v-cloak>
             <aside><p class="date" v-if="content.fields.date!=null">{{content.fields.date}}</p></aside>
             <h2>{{ content.fields.title }}</h2>
             <div v-html="content.fields.content"></div>
             </article>
             </div>`,
  data: () => {
    return {
      content: { fields: { title: "" } }
    };
  },
  created: function() {
    this.getContent();
  },
  updated: Prism.highlightAll,
  methods: {
    getContent() {
      Api.getArticle(this.$route.params.id).then(response => {
        this.content = response;
      });
    }
  }
};

const Search = {
  router,
  template: `<div id="search-results">
  <p v-if="searchEmpty" v-cloak>Que cherchez vous ?</p>
  <p v-if="!contents.length && !searchEmpty" v-cloak>Aucun résultat</p>
  <ul v-cloak>
       <li v-for="content in contents"><span><router-link :to="{name:'Article',params:{id:content.sys.id}}">{{ content.fields.title }}</router-link></span>
       <span>{{content.fields.date}}</span></li>
  </ul>
  <p class="txtcenter"><button class="btn" v-on:click="cancel">Annuler</button></p>
  </div>`,
  data: () => {
    return {
      contents: [],
      searchEmpty: true
    };
  },
  created: function() {
    bus.$on("search", text => {
      //todo : optimize with debounce function
      if (text.length > 2) {
        this.getContent(text);
        this.searchEmpty = false;
      } else {
        this.searchEmpty = true;
        this.contents = [];
      }
    });
  },
  beforeRouteLeave: function(to, from, next) {
    bus.$emit("clearSearch");
    next();
  },
  methods: {
    getContent(text) {
      Api.searchArticles(text).then(response => {
        this.contents = response;
      });
    },
    cancel: function(event) {
      router.push({ path: `/articles/page/1` });
    }
  }
};

const SearchInput = {
  router,
  template:
    '<p><input type="text" placeholder="Rechercher…" v-bind:value="value" v-on:input="search($event.target.value)" /></p>',
  props: ["value"],
  created: function() {
    bus.$on("clearSearch", () => {
      this.value = "";
    });
  },
  methods: {
    search: function(value) {
      router.push({ path: `/search` });
      bus.$emit("search", value);
    }
  }
};

const routes = [
  { name: "Articles", path: "/articles", component: Articles },
  { name: "ArticlesPage", path: "/articles/page/:page", component: Articles },
  { name: "Article", path: "/article/:id", component: Article },
  { name: "Search", path: "/search", component: Search },
  { path: "*", redirect: "/articles" }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

Vue.use(router);

const app = new Vue({
  el: "#app",
  router,
  components: {
    articles: Articles,
    article: Article,
    search: Search,
    "search-input": SearchInput
  }
});
