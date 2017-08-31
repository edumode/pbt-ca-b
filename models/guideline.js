'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchemaGuideline = Schema({
    
    index: String,
    title: String,
    text: String,
    date: Date,
    order: Number
    
});

module.exports = mongoose.model('Guideline', SchemaGuideline);