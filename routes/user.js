'use strict'

var express = require("express");
var app = express.Router();
var user = require("../controllers/user");


app.post("/login", user.login);
app.post("/create-user", user.createUser);
app.get("/get-users", user.getUsers);
app.put("/update-user/:id", user.updateUser);
app.delete("/delete-user/:id", user.removeUser);


module.exports = app;