//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/test";

//Express
var app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cors());

//Get Data from database
app.get("/event",function(req,response){

var sessionID=req.query.sessionID;
var userName=req.query.userName;
console.log("sessionID:",sessionID);
MongoClient.connect(url, function(err, db) {

  if (err) throw err;
  db.collection("mycollection").find({'userName':req.query.userName}).toArray(function(err, res) {
    if (err) throw err;
    response.send(res);
    db.close();
  });
});


});
//Store data in database:
app.post("/create-event",function(req,response){

console.log("Request",req);
var inputRequest=req.body;

inputRequest.userName=inputRequest.sessionID.substr(inputRequest.sessionID.indexOf("_")+1);
console.log("InputRequest:",inputRequest);
MongoClient.connect(url, function(err, db) {

  if (err) throw err; //var myobj = { 'url': 'www.google.com'};
  db.collection("mycollection").insertOne(inputRequest,function(err, res) {
    if (err) throw err;
   response.send("Record is inserted in database");
    db.close();
  });
});


});

app.listen(3001);

console.log('Server listening at port 3000');
