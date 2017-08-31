'user strict'

var Releases = require("../models/releases");

//Create release
function createRelease(req, res){
    
    var release = new Releases();

    release.topic = req.body.topic;
    release.title = req.body.title;
    release.description = req.body.description;
    release.section = req.body.section;
    release.date = req.body.date;
    release.text = req.body.text;    

    release.save(function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                return res.send(done);
            }else{
                return res.send("It could not be created");
            }
        }
    })


}

//Get all releases
function getReleases(req, res){

    Releases.find({}).sort("-date").exec(function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                return res.send(done);
            }else{
                return res.send("It could not be created");
            }
        }
    });

}

//Get releases section
function getReleaseSection(req, res){
    var sec = req.params.sec;

    Releases.find({section: sec}).limit(5).exec(function(err, data){
        if(err){
            return res.send("There was an error");
        }else{
            if(data){
                console.log(data);
                return res.send(data);
            }else{
                return res.send("There was an error");
            }
        }
    })
}

//Get one releases
function getRelease(req, res){

    var id = req.params.id;

    Releases.findById(id, function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                return res.send(done);
            }else{
                return res.send("It could not be created");
            }
        }
    });

}

//Update release 
function updateRelease(req, res){
    var id = req.params.id;
    var toUpdate = req.body;

    Releases.findByIdAndUpdate(id, toUpdate, function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                return res.send(done);
            }else{
                return res.send("It could not be updated");
            }
        }
    });

}

//Delete release
function deleteRelease(req, res){
    var id = req.params.id;

    Releases.findByIdAndRemove(id, function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                return res.send("Removed");
            }else{
                return res.send("It could not be removed");
            }
        }
    });
}



module.exports = {
    createRelease,
    getReleases,
    getReleaseSection,
    getRelease,
    updateRelease,
    deleteRelease
}