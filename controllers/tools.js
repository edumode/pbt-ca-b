'user strict'

//Model
var Tools = require("../models/tools");
var fs = require('fs');
var path = require('path');


//Add tool
function addTool(req, res){

    var tool = new Tools;

   
    if(req.files){

        var file_name = req.files.file.originalFilename;
        var file_split = file_name.split('.');

        //Get path
        var path_get = req.files.file.path;
        var path_split = path_get.split('\\');
        var path = path_split[1];

        //Original name and ext
        var name = file_split[0];        
        var ext = file_split[1];

        if(ext == 'xlsx' || ext == 'xls' || ext == 'zip' || ext == 'pdf' || ext == 'docx' || ext == 'png' || ext == 'jpg'){

            tool.extension = ext;
            tool.file = name;
            tool.date = Date.now();
            tool.visible = req.body.visible;

            tool.save(function(err, done){
                if(err){
                    return res.status(500).send({message: "There was an error"});
                }else{
                    if(done){

                        fs.rename('./files/'+path, './files/'+name+'.'+ext, function(err) {
                            if(err){
                                return res.status(200).send(err);
                            }else{

                                return res.status(200).send({message: "It was created successfully"});
                            }
                        });

                    }else{
                        return res.status(200).send({message: "It could not be created"});
                    }
                }
            });           

        }else{
            return res.status(200).send({message: "File not accepted"})
        }
        
    }else{
        return res.status(200).send({message: "No file attached"})
    }
}

//Get all tools
function getTools(req, res){
     Tools.find({}, function(err, tools){
        if(err){
            return res.send("There was an error")
        }else{
            return res.send(tools);
        }
     });
}

//Download tool
function downloadTool(req, res){
    var file = './files/' + req.params.fileName;

   res.download(file);

}

//Update Tool
function updateTool(req, res){
    var id = req.params.id;
    var data = req.body;

       
    if(req.files){

        var file_name = req.files.file.originalFilename;
        var file_split = file_name.split('.');

        //Get path
        var path_get = req.files.file.path;
        var path_split = path_get.split('\\');
        var path = path_split[1];

        //Original name and ext
        var name = file_split[0];        
        var ext = file_split[1];

        if(ext == 'xlsx' || ext == 'xls' || ext == 'zip' || ext == 'pdf' || ext == 'docx' ){

            Tools.findById(id, function(err, info){
                if(err){
                    return res.send("There is an error - Find by id");
                }else{
                    fs.unlink('./files/'+info.file+"."+info.extension, function(err){
                        if(err){
                            return res.send("There is an error - Delete file " + err );
                        }else{

                            data.file = name;
                            data.extension = ext;

                            Tools.findByIdAndUpdate(id, data, function(err, done){
                                if(err){
                                    return res.send("There was an error");
                                }else{
                                    if(done){

                                        
                                        fs.rename('./files/'+path, './files/'+name+'.'+ext, function(err) {
                                            if(err){
                                                return res.status(200).send(err);
                                            }else{

                                                return res.send("It was updated successfully");
                                            }
                                        });

                                        
                                    }else{
                                        return res.send("It could not be updated");
                                    }
                                }
                            });
                        }
                    });
                }
            });

        }else{

            data.date = Date.now();

            Tools.findByIdAndUpdate(id, data, function(err, done){
                if(err){
                    return res.send("There was an error");
                }else{
                    if(done){
                        return res.send("It was updated successfully");
                    }else{
                        return res.send("It could not be updated");
                    }
                }
            });
        }
    }

}

//Delete tool
function deleteTool(req, res){
    var id = req.params.id;

    Tools.findByIdAndRemove(id, function(err, done){
        if(err){
            return res.send("There was an error");
        }else{
            if(done){
                
                fs.unlink("./files/"+done.file+"."+done.extension,function(err){
                    if(err){
                        return res.send("There is an error");
                    }else{
                        return res.send("It was removed successfully");
                    }
                });
                
            }else{
                return res.send("It was not removed");
            }
        }
    });
}

//Get image
function getImageFile(req, res){
    var imageFile =  req.params.imageFile;
    var path_file = './files/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: "Imagen no existe.."})
        }
    });

}


module.exports = {
    addTool,
    getTools,
    downloadTool,
    updateTool,
    deleteTool,
    getImageFile
}