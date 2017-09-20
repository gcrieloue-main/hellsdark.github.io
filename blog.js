var blog=new Vue({
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
            getArticles().then(response => this.contents=response);
        }
    }
});

