'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchemaTools = Schema({
    extension: String,
    file: String,
    date: Date,
    visible: Boolean
});

module.exports = mongoose.model('Tools', SchemaTools);