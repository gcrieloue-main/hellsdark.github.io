
const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "oamir411dfuu",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "fe844e41216f12522cc40b8a179e7c81c8a0f17b797503155ba949afbb6aca96"
});

var converter = new showdown.Converter({headerLevelStart: 4});

function getArticles(){
    return client.getEntries({
        content_type: "article"
    })
        .then((response) => response.items.map(function(element){
        console.log(element);
        element.fields.content=converter.makeHtml(element.fields.content);
        var date = new Date(element.fields.date);
        var formattedNumber = ("0" + date.getMonth()).slice(-2);
        if (element.fields.date!=undefined){
        element.fields.date=date.getDate()+"/"+formattedNumber;
        }
        return element
    }))
        .catch((error) => {
        console.error(error)
    })   
}

function getWorkExperiences(){
    return client.getEntries({
        content_type: "workExperience",
           order:"-fields.periodBegin"
    })
        .then((response) => response.items.map(function(element){
        console.log(element);
        element.fields.description=converter.makeHtml(element.fields.description);
        return element
    }))
        .catch((error) => {
        console.error(error)
    })   
}

function getCvParagraphs(){
    return client.getEntries({
        content_type: "paragraph"
    })
        .then((response) => response.items.map(function(element){
        console.log(element);
        element.fields.text=converter.makeHtml(element.fields.text);
        return element
    }))
        .catch((error) => {
        console.error(error)
    })   
}

var app=new Vue({
    el:"#app",
    data:{contents:[{fields:{title:''}}]},
    created:function(){
        this.getContent();
    },
    methods:{
        getContent(){
            getArticles().then(response => this.contents=response);
        }
    }
});

var cv=new Vue({
    el:"#cv",
    data:{
        workExperiences:[{fields:{title:''}}],
        paragraphs:{}
    },
    created:function(){
    this.getData();
    },
    methods:{
        getData(){
            getWorkExperiences().then(response => this.workExperiences=response);
            getCvParagraphs().then(response => this.paragraphs=response);
        }
    }
});
