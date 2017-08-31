'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchemaToday = Schema({
    
    text: String,
    date: String,
    
});

module.exports = mongoose.model('Today', SchemaToday);