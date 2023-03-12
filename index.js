const path = require("path");
const http = require("http");
const fs = require("fs");
const url = require("url");
let server = http.createServer(function(request,response){
   if(request.url == "/api/joke" && request.method == "GET"){
    let allJokes = getAllJokes();
    response.writeHead(200,{"Content-type":"text/json"});
    response.end(JSON.stringify(allJokes));
   } 
  else if(request.url == "/api/joke" && request.method == "POST"){
   let data = '';
   request.on('data', function (chunk){
      data += chunk;
   });
   request.on('end', function(){
      addJoke(data);
   })
   response.end();
   }else
    if(request.url.startsWith('/api/like')){
      const params = url.parse(request.url, true).query;
      if(isNaN(params.id)){
         response.writeHead(400);
         response.end();

      }
     const pathToData = path.join(__dirname,"data");
     const numberOfJokes = fs.readdirSync(pathToData).length;
     if(params.id<0 || params.id >= numberOfJokes){
      response.writeHead(400);
      response.end();
     }
     let pathToFile = path.join(pathToData, `${params.id}.json`);
     let joke = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
     
     joke.likes++;
     console.log(joke);
     fs.writeFileSync(pathToFile, JSON.stringify(joke));
     response.writeHead(200);
     response.end();
   }else
   if(request.url.startsWith('/api/dislike')){
     const params = url.parse(request.url, true).query;
     if(isNaN(params.id)){
        response.writeHead(400);
        response.end();

     }
    const pathToData = path.join(__dirname,"data");
    const numberOfJokes = fs.readdirSync(pathToData).length;
    if(params.id<0 || params.id >= numberOfJokes){
     response.writeHead(400);
     response.end();
    }
    let pathToFile = path.join(pathToData, `${params.id}.json`);
    let joke = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    
    joke.dislikes++;
    console.log(joke);
    fs.writeFileSync(pathToFile, JSON.stringify(joke));
    response.writeHead(200);
    response.end();
  }
   else{
      response.writeHead(404);
      response.end();
   }
})
const port = 6000;
server.listen(port);
function getAllJokes(){
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