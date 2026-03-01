const express=require('express');
const app=express();
const path=require('path');
const {v4:uuidv4}=require('uuid');
const PORT=9090;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("server working well");
})

let posts=[
    {   id:uuidv4(),
        username:"mr_rohi__123",
        content:"i am a person"
    },
    {   
        id:uuidv4(),
        username:"rohi__mr__123",
       content:"college"
    },
    {
        id:uuidv4(),
    username:"rohi.123",
    content:"HOmeee"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index",{posts});
});
app.get("/posts/new",(req,res)=>{
     res.render("new");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4(); 
    posts.push({id, username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
     let {id}=req.params;
     let post=posts.find((p)=>id===p.id);
     if(!post){
        return res.status(404).send("Post not found!");
     }
     res.render("show",{post});
});

app.patch("/posts/:id",(req,res)=>{
     let {id}=req.params;
     let newcon=req.body.content;
      let post=posts.find((p)=>id===p.id);
      post.content=newcon;
      console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    res.render("edit",{posts});
})

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  posts = posts.filter(p => p.id !== id);

  res.redirect("/posts");
});

app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}...`);
});
