import * as Vue from './vue.min.js';
import * as VueRouter from './vue-router.js';
import * as Prism from './prism.js';
import * as Api from './api.js';

var router = new VueRouter({
        mode: 'history',
        routes: []
});
var blog=new Vue({
    router,
    el:"#blog",
    data:{
        contents:[{fields:{title:''}}],
        page:1
    },
    created:function(){
        var page = this.$route.query.page;
        if (page === undefined){
            this.page = 1;
        }
        else{
            this.page = page;
        }
        this.getContent();
    },
    updated:function(){
        Prism.highlightAll();
    },
    methods:{
        getContent(){
            Api.getArticles(this.$route.query.page).then(response => this.contents=response);
        }
    }
});

