'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Get routes
var user = require("./routes/user");
var tools = require("./routes/tools");
var releases = require("./routes/releases");
var guideline = require("./routes/guideline");
var today = require("./routes/today");

//Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next()
})

app.use(express.static(__dirname + '/dist'));

// respond with "hello world" when a GET request is made to the homepage
app.use('/api', user);
app.use('/api', tools);
app.use('/api', releases);
app.use('/api', guideline);
app.use('/api', today);


module.exports = app;
