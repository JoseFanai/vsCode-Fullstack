const http = require("http");
const fs = require("fs");
const url=require("url");

const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("hello from express server");
});
app.get("/search",(req,res)=>{
    res.send(`Your name is ${req.query.name}`);
});


app.listen(3000,()=>{
    console.log("Express server is running on port 3000");
});