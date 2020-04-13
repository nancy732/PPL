var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var router = require("./router");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://nancy1312:Nancy@1312@cluster0-texqj.mongodb.net/testMongoose?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(error => handleError(error));

console.log("we are on server.js");

app.use("/", router);
app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || 8081, () => {
  console.log("8081");
});
