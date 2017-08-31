'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchemaUser = Schema({
    name: String,
    password: String,
    email: String,
    role: String,
    manager: String,
    s3: Number
});

module.exports = mongoose.model('User', SchemaUser);