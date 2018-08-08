var model= require('../model/user')
var bcrypt = require('bcryptjs');


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
	var value= req.body.value;
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

    exports.deleteUser = function(req, res){
        var id = {_id:req.params.id}
        model.remove(id, function(err){
        if (err) res.json({err:err, message:'could not delete user'});
        return res.json({message:'user deleted'});
    });
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