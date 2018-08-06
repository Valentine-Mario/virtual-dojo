var model= require('../model/user')
var bcrypt = require('bcryptjs');


exports.addUser = function(req, res){
    var data = {
        name: req.body.name,
        username:req.body.username,
        email:req.body.email,
        comment:[],
        password:req.body.password,
        password2:req.body.password2
    };
    bcrypt.hash(data.password, 15, function(err, hash){
        data.password=hash;
         model.create(data, function(err){
                if(err){
                    res.json({message:'user not added'});
                }else{
                    res.json({message:'Subscriber added successfully.'})
                }
                
            })
    })
}

    exports.getUser= function(req, res){
        model.find({}, '-password -_id -__v', function(err, users){
        if (err) res.json({err:err, message:'sorry, could not return all books'});
        res.json(users) 
    });   
    }