const express= require("express");
const app =express();
const port =8080;
app.use(express.urlencoded({extended:true}));
const path =require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride('_method'));


let post=[
    {
        id:uuidv4(),
        username:"piyush",
        content:"hello my name is piyush"

    },
    {
        id:uuidv4(),
        username:"om",
        content:"hello my name is om"
    },  
     {
        id:uuidv4(),
        username:"amit",
        content:"hello my name is amit"
    },
];

app.get("/post",(req,res)=>{
    res.render("index.ejs",{post});
});

app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/post",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    post.push({id,username,content});
    res.redirect("/post");
});


app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let p=post.find((p)=>id===p.id);
    res.render("edit.ejs",{p});
}); 
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let p1=post.find((p)=>id===p.id);
    let newcontent =req.body.content;
    p1.content=newcontent;
    res.redirect("/post");
});

app.get("/post/:id/show",(req,res)=>{
    let {id}=req.params;
    let p=post.find((p)=>id===p.id);
    res.render("show.ejs",{p});
});
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    post=post.filter((p)=>id!==p.id);
    res.redirect("/post");
    
});
app.listen(port,()=>{
    console.log(`listen is start on ${port}`);
});