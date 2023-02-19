const path = require("path");
const http = require("http");
const fs = require("fs");
let server = http.createServer(function(request,response){
   if(request.url = "/api/joke" && request.method == "GET"){
    let allJokes = getAllJokes();
    response.writeHead(200,{"Content-type":"text/json"});
    response.end(JSON.stringify(allJokes));
   } 
  else if(request.url = "/api/joke" && request.method == "POST"){
   let data = '';
   request.on('data', function (chunk){
      data += chunk;
   });
   request.on('end', function(){
      addJoke(data);
   })
   response.end();
   }
})
const port = 6000;
server.listen(port);
function getAllJokes(request,response){
let arrayOfJokes = [];
let pathToData = path.join(__dirname,"data");
let data = fs.readdirSync(pathToData);
for(let i = 0;i< data.length; i++){
   let pathToFile = path.join(pathToData, `${i}.json`);
   let jokeString = fs.readFileSync(pathToFile, "utf-8");
   let joke = JSON.parse(jokeString);
   arrayOfJokes.push(joke);
}
return arrayOfJokes;

}
function addJoke(jokeString){
let joke = JSON.parse(jokeString);
joke.likes = 0;
joke.dislikes = 0;
let pathToData = path.join(__dirname, 'data');
let pathToFile = path.join(pathToData, `${fs.readdirSync(pathToData).length}.json`);
fs.writeFileSync(pathToFile, JSON.stringify(joke));

}