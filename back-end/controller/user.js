var model= require('../model/user');
var fs= require('fs');
var bcrypt = require('bcryptjs');
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
        FirstName: req.body.FirstName,
        LastName:req.body.LastName,
        username:req.body.username,
        email:req.body.email,
        comment:[],
        time:Date.now(),
        library:req.body.library,
        password:req.body.password,
        password2:req.body.password2
    };
    bcrypt.hash(data.password, 15, function(err, hash){
        data.password=hash;
         model.create(data, function(err){
                if(err){
                    res.json({message:'user not added'});
                }else{
                    res.json({message:'User added successfully.'})
                    res.status(200)
                }
            })
    })
}

    exports.getUser= function(req, res){
        model.find({}, '-password -_id -__v', function(err, users){
        if (err) res.json({err:err, message:'sorry, could not return all users'});
        res.json(users) 
    });   
}

    exports.getUserByid = function(req, res){
    var id = req.params.id;
    model.findById(id, '-password', function(err, user){
        if (err) res.json({err:err, message:'sorry, could not get user by id'});
        res.json(user);
    });
}

    exports.searchUser = function(req, res){
	var value= req.params.value;
    model.find({"username":{$regex: value, $options: 'i'}}, '-__v -password', function(err, user){
        if (err) res.json({err:err, message:'sorry, could not find user'});
        res.json(user)
    });
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
        if (err) res.json({err:err, message:'sorry, could not update user'});
        res.json({message:'user updated successfully'})
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

    exports.getUserByUsername = function(req, res){
	var username= req.body.username;
    model.findOne({username}, '-__v -password', function(err, user){
        if (err) res.json({err:err, message:'sorry, could not find user'});
        res.json(user)
    });
}

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