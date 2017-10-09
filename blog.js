var router = new VueRouter({
        mode: 'history',
        routes: []
});
var blog=new Vue({
    router,
    el:"#blog",
    data:{contents:[{fields:{title:''}}]},
    created:function(){
        this.getContent();
    },
    updated:function(){
        Prism.highlightAll();
    },
    methods:{
        getContent(){
            getArticles(this.$route.query.page).then(response => this.contents=response);
        }
    }
});

