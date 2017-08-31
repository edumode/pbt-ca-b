'use strict'

//Model
var User = require("../models/users");

//Login
function login(req, res){

    var s3 = req.body.s3;
    var password = req.body.password;

    User.findOne({s3: s3}, function(err, user){
        if(err){
            return res.status(404).send("There was an error");
        }else{
            if(user){
                if(user.password == password){
                    return res.status(200).send(user);
                }else{
                    return res.status(400).send("Password is incorrect");
                }
            }else{
                return res.status(400).send("User doesn't exist");
            }
        }
    });
}
/********************************************************************/

//Create new user
function createUser(req, res){

    var user = new User;

    user.name = req.body.name;
    user.password = req.body.password;
    user.s3 = req.body.s3;
    user.email = req.body.email;
    user.role = req.body.role;
    user.manager = req.body.manager;

    User.findOne({ s3: user.s3 }, function(err, exists){
        if(err){
            return res.status(400).send("There was an error")
        }else{
            if(exists == null){
                user.save(function(err){
                    if(err){
                        return res.status(404).send({message: "User couldn't be created"})
                    }else{
                        return res.status(200).send({message: "User has been created successfully"})
                    }
                });
            }else{
                return res.status(200).send("User already exists")
            }
        } 
    });
    
}
/********************************************************************/

//Get all users
function getUsers(req, res){

    User.find({}, function(err, users){
        return res.send(users);
    });    
}
/********************************************************************/

//Update user
function updateUser(req, res){
    var id = req.params.id;
    var userUpdate = req.body;

    console.log(userUpdate);

    User.findByIdAndUpdate(id, userUpdate, function (err, userUpdated){
        if(err){
            return res.status(404).send("There was an error");
        }else{
            if(userUpdated){
                return res.status(200).send(userUpdated);
            }else{
                return res.status(400).send("User couldn't be updated");
            }
        }
    });
}
/********************************************************************/

//Remove user
function removeUser(req, res){
    var id = req.params.id;

    User.findByIdAndRemove(id, function(err, removed){
        if(err){
            return res.status(500).send("There was an error");
        }else{
            if(removed){
                return res.status(200).send("User was removed successfully");
            }else{
                return res.status(404).send("User couldn't be removed");
            }
        }
    });
}
/********************************************************************/


module.exports = {
    login,
    createUser,
    getUsers,
    updateUser,
    removeUser
}