const path = require("path");
const http = require("http");
const fs = require("fs");
let server = http.createServer(function(request,response){
   if(request.url = "/joke" && request.method == "GET"){
    getAllJokes();
   } 
})
const port = 6000;
server.listen(port);
function getAllJokes(request,response){
fs.readdirSync(__dirname/data,"data")
}