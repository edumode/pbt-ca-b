'use strict'

var express = require("express");
var app = express.Router();
var Tools = require("../controllers/tools");

var multipart = require("connect-multiparty");
var folder_upload = multipart({ uploadDir: "./files"});

app.post("/create-tool", folder_upload, Tools.addTool);
app.get("/get-tools", Tools.getTools);
app.get("/download-tool/:fileName", Tools.downloadTool);
app.put("/update-tool/:id", folder_upload, Tools.updateTool);
app.delete("/delete-tool/:id", Tools.deleteTool);
app.get('/get-image/:imageFile',  Tools.getImageFile)

module.exports = app;