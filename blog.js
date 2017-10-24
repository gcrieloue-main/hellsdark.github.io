import Vue from './vue.min.js';
import VueRouter from './vue-router.js';
import Prism from './prism.js';
import * as Api from './api.js';

var router = new VueRouter({
        mode: 'history',
        routes: []
});

Vue.use(VueRouter);

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
            Api.getArticles(1).then(response => this.contents=response);
        }
    }
});

