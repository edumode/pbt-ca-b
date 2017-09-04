'user strict'

//Model
var Today = require("../models/today");

//Get reminders
function getReminders(req, res){
    Today.find({}).sort({"date":1}).exec(function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                 return res.send(done);
            }else{
                 return res.send("It wasn´t be pulled");
            }
        }
    });
}

//Get one reminder
function getReminder(req, res){
    var id = req.params.id;

    Today.findById(id, function(err, data){

        if(err){
            return res.send("There was an error")
        }else{
        if(data){
            return res.send(data);
        }else{
            return res.send("There was an error")
        }}
    })
}


//Create reminder
function createReminder(req, res){

   var today = new Today;

    today.text = req.body.text;
    today.date = Date.now();

    today.save(function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                 return res.send(done);
            }else{
                 return res.send("It wasn´t created");
            }
        }
    });

}

//Update reminder
function updateReminder(req, res){
    var id = req.params.id;

    Today.findByIdAndUpdate(id, req.body, function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                 return res.send("It was updated");
            }else{
                 return res.send("It wasn´t updated");
            }
        }
    })

}

//Remove reminder
function removeReminder(req, res){
    var id = req.params.id;

    Today.findByIdAndRemove(id, function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                 return res.send("It was removed");
            }else{
                 return res.send("It wasn´t removed");
            }
        }
    })
}



module.exports = {
    createReminder,
    getReminders,
    getReminder,
    updateReminder,
    removeReminder
}

