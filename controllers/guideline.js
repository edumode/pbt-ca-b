'use strict'

var Guideline = require("../models/guideline");

//Get all topics
function getGuideline(req, res){


    Guideline.find({}).sort("order").exec(function(err, data){

        if(err){
            return res.send("There was an error");
        }else{
            if(data){
                return res.send(data);
            }else{
                return res.send("It could not be got");
            }
        }

    });
       
}

//Get one topic
function getOneGuideline(req, res){

    var id = req.params.id;
    Guideline.findById(id, function(err, data){

        if(err){
            return res.send("There was an error");
        }else{
            if(data){
                console.log(data)
                return res.send(data);
            }else{
                return res.send("It could not be got");
            }
        }

    });
       
}


//Create topic
function createTopic(req, res){

    var guideline = new Guideline;

    guideline.index = req.body.index;
    guideline.title = req.body.title;
    guideline.text = req.body.text;
    guideline.date = req.body.date;
   

    if(req.body.index.length == 1){
        guideline.order = req.body.index;
    }else{
        var split_index = req.body.index.split(".");

        if(split_index.length == 2){
            var num = split_index[0]+"."+split_index[1];
            guideline.order = num;
        }else{
            var num = split_index[0]+"."+split_index[1]+split_index[2];
            guideline.order = num;
        }
    }   

    guideline.save(function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                return res.send("It was saved");
            }else{
                return res.send("It couldn't be saved");
            }
        }
    }); 

}

//Update topic
function updateTopic(req, res){

    var id = req.params.id;
    var toUpdate = req.body;

    if(req.body.index.length == 1){
        toUpdate.order = req.body.index;
    }else{
        var split_index = req.body.index.split(".");

        if(split_index.length == 2){
            var num = split_index[0]+"."+split_index[1];
            toUpdate.order = num;
        }else{
            var num = split_index[0]+"."+split_index[1]+split_index[2];
            toUpdate.order = num;
        }
    }   

    console.log(toUpdate)

    Guideline.findByIdAndUpdate(id, toUpdate, function(err, updated){
        if(err){
            return res.send("There was an error");
        }else{
            if(updated){
                return res.send("It was updated");
            }else{
                return res.send("It was not updated");
            }
        }
    })
}

//Remove topic
function removeTopic(req, res){
    var id = req.params.id;

    Guideline.findByIdAndRemove(id, function(err, removed){
        if(err){
            return res.send("There was an error");
        }else{
            if(removed){
                return res.send("It was removed");
            }else{
                return res.send("It was not removed");
            }
        }
    })
}

module.exports = {
    getGuideline,
    getOneGuideline,
    createTopic,
    updateTopic,
    removeTopic
}