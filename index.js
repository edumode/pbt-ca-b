'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://heroku_2kc25b8c:l3v9apsd719cnlop8q2ctrhhqi@ds161873.mlab.com:61873/heroku_2kc25b8c', (err, res) => {

    if(err){
        throw err;
    }else{
        console.log("La base corre bien...")

        app.listen(port, function(){
            console.log("Servidor del API localhost:"+port)
        })

    }

})
