var router = new VueRouter({
        mode: 'history',
        routes: []
});
var blog=new Vue({
    router,
    el:"#blog",
    data:{contents:[{fields:{title:''}}],
    page=0},
    created:function(){
        var page = this.$route.query.page;
        if (page === undefined){
            this.page = 0;
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
            getArticles(this.$route.query.page).then(response => this.contents=response);
        }
    }
});

