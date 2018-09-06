var model= require('../model/user');
var model2= require('../model/category');
var session = require('express-session');
var ObjectID = require('mongoose').Types.ObjectId;
var cloudinary = require('cloudinary');
var fs= require('fs');
const Joi = require('joi');
var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'genesysintern@gmail.com',
        pass: 'intern007'
    }
  });
cloudinary.config({ 
    cloud_name: 'school-fleep', 
    api_key: '913188349489292', 
    api_secret: 'CDafSvspukpNVWRh0ib3gd1Dsz0' 
  });
app.use(session({
    secret: 'diversify me',
    resave: false,
    saveUninitialized: true
  }))
const multer = require('multer');
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png') {
    //     cb(null, './files/images/')
    //   } else {

    //   }
      
      
    // },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

  const schema= Joi.object().keys({
      firstName:Joi.string().required(),
      lastName:Joi.string().required(),
      username:Joi.string().min(3).max(15).required(),
      email:Joi.string().email().required(),
      password:Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
  })
  
  const schema2= Joi.object().keys({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
  })
exports.addUser = function(req, res){
    var data = {
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        email:req.body.email,
        time:Date.now(),
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    };
    

        Joi.validate({firstName:data.firstName, lastName:data.lastName, username:data.username, email:data.email, password:data.password}, schema, function(err,value){
            if(err){
                res.json(err.message)
            }else{
                bcrypt.hash(data.password, 15, function(err, hash){
                    data.password=hash;
                model.create(data, function(err, user){
                    if(err){
                        res.json({message:'user not added', code: 1});
                    }else{
                        
                        var mailOptions = {
                            from: '"Virtual Dojo"',
                            to: user.email,
                            subject: 'Welcome to Virtual Dojo',
                            html: `<div align="center">
                            <div style="width:70%;">
                            <div style="height:80px; border-radius:10px 10px 0px 0px; font-size:170%; margin-top:10px; color:white; background-color:white"><div style="padding-top:18px;"><img src="https://res.cloudinary.com/school-fleep/image/upload/v1536224820/Dojo4.png"></div></div>
                            <div align="center" style="font-size:110%; color:black;"><p style="color:black;">Thank you ${user.firstName+ ''+ user.lastName} for joining Virtual Dojo</p>
                            <p style="color:black;">Remember that everything is learnable and we are here to help you achieve that</p>
                            
                            <small style="color:grey;">Visit us here more often at <a href="http://testingvirtual.herokuapp.com">here</a></small><br/>
                            
                            </div>
                            </div>
                            </div>`
                          };
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                              return false;
                            } else {
                                res.json({user:user._id, code:2, isAdmin:user.isAdmin});
                              return true;
                            }
                          });
                    }
                })
                })
            }
            
        })
         
   
}

    exports.getUser= function(req, res){
        model.find({}, '-password -__v', function(err, users){
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
    if(value == null || value == ""){
        res.json({message:"search field is empty"})
    }else{
        model.find({"username":{$regex: value, $options: 'gi'}}, '-__v -password', function(err, user){
            if (err) res.json({err:err, message:`could not find user due to error in connection`});
            res.json({message:user})
        }).populate('library')
    }
    
}

exports.getLatest= function(req, res){
    value=parseInt(req.params.value)
    model.find({}, function(err, data){
      if(err)res.json({message:"an error occured sorting users"})
      res.json(data)
    }).populate('library').sort({'_id':-1}).limit(value).exec()
  }

    exports.editUser = function(req, res){
         var id = {_id:req.params.id}
        var data = {
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email
    };
    Joi.validate({firstName:data.firstName,  lastName:data.lastName, email:data.email}, schema2, function(err,  value){
        if(err){
            res.json(err.message)
        }else{
            model.findByIdAndUpdate(id, data, function(err){
                if (err) res.json({err:err, message:'sorry, could not update user', code:9});
                res.json({message:'user updated successfully', code:10})
            })
        }
    })
    
}
    exports.editProfilePics= function(req,res){
        var id={_id:req.params.id}
        
                                var data={
                                 profile_pics:req.files[0].path,
                                 profile_pics_id:''}
                
                cloudinary.uploader.upload(data.profile_pics).then(function(result){
                    data.profile_pics= result.url;
                    data.profile_pics_id=result.public_id
                        model.findByIdAndUpdate(id, data, function(err){
                        if(err)res.json({message:"could not upload profile picture"})
                        res.json({message:"profile picture updated successfully"})
                    })
                })
                    
        
    }


exports.deleteUser= function(req,res){
    var id = {_id:req.params.id}
    let user = new ObjectID(req.body.user)
    model.findById(user, function(err, user){
        if(user.isAdmin==1){
            model.remove(id, function(err){
                if (err) res.json({err:err, message:'could not delete user'});
                return res.json({message:'user deleted'});
});
        }else{
            res.json({message:"only admin can delete users"})
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
                let course = new ObjectID(req.body.course)
                model2.findById({_id:course}, function(err, video){
                    if(err){
                        res.json({message:"could not find video"})
                    }else{
                        if(JSON.stringify(user.library).includes(JSON.stringify(video._id))){
                            res.json({message:"this video already exist in your library"})
                            
                        }else{
                            
                                if(err){
                                    res.json({message:"could not update views"})
                                }else{
                                    user.library.push(video._id);
                                    user.save();
                                    var mailOptions = {
                                        from: '"Virtual Dojo"',
                                        to: user.email,
                                        subject: 'Subscription success',
                                        html: `<div align="center">
                                        <div style="width:70%;">
                                        <div style="height:80px; border-radius:10px 10px 0px 0px; font-size:170%; margin-top:10px; color:white; background-color:white"><div style="padding-top:18px;"><img src="https://res.cloudinary.com/school-fleep/image/upload/v1536224820/Dojo4.png"></div></div>
                                        <div align="center" style="font-size:110%; color:black;"><p style="color:black;">Thank you ${user.firstName+ ''+ user.lastName} for subscribing to ${video.name} Virtual Dojo</p>
                                        <p style="color:black;">Remember that everything is learnable and we are here to help you achieve that</p>
                                        
                                        <small style="color:grey;">Visit us here more often at <a href="http://testingvirtual.herokuapp.com">here</a></small><br/>
                                        
                                        </div>
                                        </div>
                                        </div>`
                                      };
                                      transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                          console.log(error);
                                          return false;
                                        } else {
                                            res.json({message:"video subscribed succesfully"})
                                          return true;
                                        }
                                      });
                                    
                                    model2.findByIdAndUpdate(video, {$inc : {purchase : 1} }, function(err){})
                                }
                       
                        }
                        
                    }
                })
            }
        })
    }

    exports.makeAdmin= function(req, res){
        let admin = new ObjectID(req.body.admin)
        let user= new ObjectID(req.body.user)
        model.findById(admin, function(err, admin){
            if(admin.isAdmin==1){
                model.findByIdAndUpdate(user, {$inc : {isAdmin : 1} }, function(err, user){
                    if(err)throw err
                    res.json({message:`${user.username} is now an admin`})
                })
            }else{
                res.json({message:"you don't have access to this function"})
            }
        })
       
    }


    exports.removeAdmin= function(req, res){
        let admin = new ObjectID(req.body.admin)
        let user= new ObjectID(req.body.user)
        model.findById(admin, function(err, admin){
            if(admin.isAdmin==1){
                model.findByIdAndUpdate(user, {$inc : {isAdmin : -1} }, function(err, user){
                    if(err)throw err
                    res.json({message:`${user.username} is now an admin`})
                })
            }else{
                res.json({message:"you don't have access to this function"})
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

    