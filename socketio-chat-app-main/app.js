 dksfdksf.sdnfm//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
var WebSocket = require('ws')



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));




///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/start_game")

.get(function(req, res){
    res.render('game')
  
})

.post(function(req, res){

  data = {
    title: req.body.title,
    content: req.body.content}
  

})

.delete(function(req, res){

  
});

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){

  
})

.put(function(req, res){

})

.patch(function(req, res){

 
})

.delete(function(req, res){

 
});



var server = app.listen(3000, function() {
  console.log("Server started on port 3000");
});


const wss = new WebSocket.Server({
  port: 8080,
});

connectedClients = {}
id = 0;
wss.on('connection', (ws,req) => {
  ws.id = id+=1;
  ws.send('Connected');



  ws.on('message', (data) => {

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        toBeSent = {id:id,data:data.event}
        client.send(JSON.stringify(toBeSent));
      }
    });
  });

});