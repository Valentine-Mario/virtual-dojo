var model= require('../model/user');
var model2= require('../model/category');
var session = require('express-session');
var ObjectID = require('mongoose').Types.ObjectId;
var fs= require('fs');
var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
app.use(session({
    secret: 'diversify me',
    resave: false,
    saveUninitialized: true
  }))
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png') {
        cb(null, './files/images/')
      } else {

      }
      
      
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

exports.addUser = function(req, res){
    var data = {
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        email:req.body.email,
        comment:[],
        time:Date.now(),
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    };
    bcrypt.hash(data.password, 15, function(err, hash){
        data.password=hash;
         model.create(data, function(err, user){
                if(err){
                    res.json({message:'user not added', code: 1});
                }else{
                    res.json({user:user._id, code:2})
                    res.status(200)
                }
            })
    })
}

    exports.getUser= function(req, res){
        model.find({}, '-password -_id -__v', function(err, users){
        if (err) res.json({err:err, message:'sorry, could not return all users', code:3});
        res.json({message:users, code:4}) 
    }).populate('library')
}

    exports.getUserByid = function(req, res){
    var id = req.params.id;
    model.findById(id, '-password', function(err, user){
        if (err) res.json({err:err, message:'sorry, could not get user by id', code:5});
        res.json(user);
    }).populate('library')
}

    exports.searchUser = function(req, res){
	var value= req.params.value;
    model.find({"username":{$regex: value, $options: 'i'}}, '-__v -password', function(err, user){
        if (err) res.json({err:err, message:`could not find user due to error in connection`, code:7});
        res.json({message:user, code:8})
    }).populate('library')
}

    exports.editUser = function(req, res){
         var id = {_id:req.params.id}
        var data = {
        FirstName: req.body.FirstName,
        LastName:req.body.LastName,
        username:req.body.username,
        email:req.body.email
    };
    model.findByIdAndUpdate(id, data, function(err){
        if (err) res.json({err:err, message:'sorry, could not update user', code:9});
        res.json({message:'user updated successfully', code:10})
    })
}
    exports.editProfilePics= function(req,res){
        var id={_id:req.params.id}
        model.findById(id, function(err, user){
            if(user.profile_pics==null){
                var data={
            profile_pics:req.files[0].path
        }
        model.findByIdAndUpdate(id, data, function(err){
            if(err)res.json({message:"could not upload profile picture"})
            res.json({message:"profile picture updated successfully"})
        })
            }else{
                fs.unlink(user.profile_pics, function(err){
                    if(err){
                        res.json("could not update profile picture")
                    }else{
                                var data={
                                 profile_pics:req.files[0].path
                }
                    model.findByIdAndUpdate(id, data, function(err){
                    if(err)res.json({message:"could not upload profile picture"})
                    res.json({message:"profile picture updated successfully"})
        })
                    }
                })
            }
        })
        
    }

    exports.deleteUser = function(req, res){
        var id = {_id:req.params.id}
        model.findById(id, function(err, user){
            if(user.profile_pics!==null){
                fs.unlink(user.profile_pics, function(err){
                    if(err){
                        res.json({message:"could not delete user profile pics"})
                    }else{
                       model.remove(id, function(err){
                        if (err) res.json({err:err, message:'could not delete user'});
                        return res.json({message:'user deleted'});
                })  
                    }
                })
               
            }else{
                    model.remove(id, function(err){
                    if (err) res.json({err:err, message:'could not delete user'});
                    return res.json({message:'user deleted'});
    });
            }
        })
}

//     exports.getUserByUsername = function(req, res){
// 	var username= req.body.username;
//     model.findOne({username}, '-__v -password', function(err, user){
//         if (err) res.json({err:err, message:'sorry, could not find user'});
//         res.json({message:user})
//     });
// }

    exports.getUserByUsername2= function(username, callback){
        var query= {username:username}
        model.findOne(query, callback)  
    }
    exports.decrypt= function(candidatePassword, hash, cb){
        bcrypt.compare(candidatePassword, hash, function(err, isMatch){
            if(err)throw err
            cb(null, isMatch)
        })
    }

    exports.getVideo= function(req, res){
        let user = new ObjectID(req.body.user)
        model.findById({_id:user}, function(err, user){
            if(err){
                res.json({message:"could not find user"})
            }else{
                let video = new ObjectID(req.body.video)
                model2.findById({_id:video}, function(err, video){
                    if(err){
                        res.json({message:"could not find video"})
                    }else{
                        if(JSON.stringify(user.library).includes(JSON.stringify(video._id))){
                            res.json({message:"this video already exist in your library"})
                            
                        }else{
                            model2.findByIdAndUpdate(video, {$inc:{views:1}}, {new:true}, function(err){
                                if(err){
                                    res.json({message:"could not update views"})
                                }else{
                                    user.library.push(video._id);
                                    user.save();
                                    res.json({message:"video purchase succesfully"})
                                }
                            })
                        }
                        
                    }
                })
            }
        })
    }

    exports.ensureAuthentication= function(req, res, next){
        if(req.session){
            return next()
        }else{
            res.json({message:"not logged in yet"})
        }
    }