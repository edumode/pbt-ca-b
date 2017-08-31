'use strict'

var express = require("express");
var app = express.Router();
var Guideline = require("../controllers/guideline");

app.get("/getGuideline", Guideline.getGuideline);
app.get("/getOneGuideline/:id", Guideline.getOneGuideline);
app.post("/create-topic", Guideline.createTopic);
app.put("/update-topic/:id", Guideline.updateTopic);
app.delete("/delete-topic/:id", Guideline.removeTopic);



module.exports = app;
