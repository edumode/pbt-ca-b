'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchemaReleases = Schema({
    title: String,
    topic: String,
    description: String,
    section: String,
    date: Date,
    text: String,
    author: String,
});

module.exports = mongoose.model('Releases', SchemaReleases);