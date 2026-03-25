const express=require("express");
const app=express();
const port= 4000;

app.get('/',(req,res)=>{
    res.send('Welcome');
});
app.get('/about',(req,res)=>{
    const name = req.query.name || 'Guest';
    const age = req.query.age || 'Unknown';
    res.send(`Hello, ${name}! your age is ${age}`);
});
app.listen(port,()=>{
    console.log('Server is running at port 4000')
});
