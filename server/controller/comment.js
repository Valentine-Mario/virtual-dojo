var model= require('../model/comment')
var model2= require('../model/videos');
var model3 = require('../model/user')
var ObjectID = require('mongoose').Types.ObjectId;
const Joi = require('joi');

const schema= Joi.object().keys({
    comment:Joi.string().required(),
})

exports.addComment= function(req, res){
    var data={
        name:req.body.name,
        comment:req.body.comment,
        time: Date.now()
    }

    Joi.validate({comment:data.comment}, schema, function(err, value){
        if(err){
            res.json(err.message)
        }else{
            model.create(data, function(err, data){
                if(err){
                    res.json({message:"comment could not be created"})
                }else{
                    let video = new ObjectID(req.body.video);
                    model2.findById({_id: video}, function(err, video){
                if(err){
                  res.json({message:"comment not found"})
                }else{
                  video.comment.push(data._id);
                  model2.create(video);
                  res.json({message:"comment created succesfully"});
                }
              })    
                }
            })
        }
    })
}

exports.getComments= function(req,res){
    model.find({}, '-_id -__v', function(err, comments){
        if(err)res.json({message:"comment not found"})
        res.json(comments)
    }).populate('name', 'name')
}

exports.editComments = function(req, res){
         var id = {_id:req.params.id}
        var data = {
        comment:req.body.comment
    };
    Joi.validate({comment:data.comment}, schema, function(err, value){
        if(err){
            res.json(err.message)
        }else{
            model.findByIdAndUpdate(id, data, function(err){
                if (err) res.json({err:err, message:'sorry, could not update comment'});
                res.json({message:'comment updated successfully'})
            })
        }
    })
    
}

exports.deleteComment= function(req,res){
    var id = {_id:req.params.id}
    let user = new ObjectID(req.body.user)
    model3.findById(user, function(err, user){
        if(user.isAdmin==1){
            model.remove(id, function(err){
                if (err) res.json({err:err, message:'could not delete comment'});
                return res.json({message:'comment deleted'});
});
        }else{
            res.json({message:"only admin can delete comments"})
        }
    })
}