'use strict'

var express = require("express");
var app = express.Router();
var Releases = require("../controllers/releases");

app.post("/create-release", Releases.createRelease);
app.get("/get-releases", Releases.getReleases);
app.get("/get-release/:id", Releases.getRelease);
app.get("/get-releases-section/:sec", Releases.getReleaseSection);
app.put("/update-release/:id", Releases.updateRelease);
app.delete("/delete-release/:id", Releases.deleteRelease);

module.exports = app;