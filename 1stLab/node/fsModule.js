const fs = require('fs');

fs.writeFile("hello.txt","hello world", (err) =>{
    if(err){
        console.error("error",err); 
    }
    else{
        console.log("Success");
    }
});

fs.readFile("hello.txt","utf-8",(err,data) =>{
    if (err){
        console.error("error reading file",err);
    }
    else{
        console.log("File content: ", data);
    }
});