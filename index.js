'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/prebilling', (err, res) => {

    if(err){
        throw err;
    }else{
        console.log("La base corre bien...")

        app.listen(port, function(){
            console.log("Servidor del API localhost:"+port)
        })

    }

})