'use strict'

var express = require("express");
var app = express.Router();
var Today = require("../controllers/today");

app.get("/getReminders", Today.getReminders);
app.get("/getReminder/:id", Today.getReminder);
app.post("/createReminder", Today.createReminder);
app.put("/updateReminder/:id", Today.updateReminder);
app.delete("/deleteReminder/:id", Today.removeReminder);

module.exports = app;
