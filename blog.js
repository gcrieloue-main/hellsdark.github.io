import Vue from './vue.min.js';
import VueRouter from './vue-router.js';
import Prism from './prism.js';
import * as Api from './api.js';

Vue.use(VueRouter);

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
        var page = 1;
        if (page === undefined){
            this.page = this.$route.query.page;
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
            Api.getArticles(this.page).then(response => this.contents=response);
        }
    }
});

