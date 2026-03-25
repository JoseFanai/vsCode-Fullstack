const http = require("http");
const fs = require("fs");
const url=require("url");
const path=require("path");

function handler(req,res){

const server = http.createServer((req, res) => {
    if (req.url ==="/favicon.ico") return res.end();
    const log = `${Date.now()}:new request received\n`;
    const logFilePath = path.join(__dirname, "log.txt");
    fs.appendFile("log.txt", log, (error,data) => {
        const myUrl = url.parse(req.url,true);
        console.log(myUrl);
        switch (myUrl.pathname) {
        case "/":
            res.end("hello from server");
            break;
            case "/signup":
                if (req.method === "GET") res.end("Welcome to the signup page");
                else if (req.method === "POST") res.end("Signup form submitted");
                else res.end("Invalid request method");
                break;
            case "/about":
                const userName = myUrl.query.userName;
                res.end(`Welcome ${userName} to about page`);
                break;
                case "/contact":
                    res.end("This is the contact page");
                    break;

                        default:
                            res.end("404 page not found");

    }
});


    // console.log(req.url);
    // console.log("HTTP server created");
    
    // res.end("hello from server");
});
}
const server = http.createServer(handler);
server.listen(4000, () => 
    console.log("Server is running on port 4000")
);