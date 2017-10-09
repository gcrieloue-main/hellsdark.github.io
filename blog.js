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
        console.log(this.$route.query);
        console.log(this.$route.params);
    },
    updated:function(){
        Prism.highlightAll();
    },
    methods:{
        getContent(){
            getArticles().then(response => this.contents=response);
        }
    }
});

