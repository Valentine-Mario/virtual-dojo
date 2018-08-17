var model= require('../model/comment')
var model2= require('../model/videos');
var ObjectID = require('mongoose').Types.ObjectId;


exports.addComment= function(req, res){
    var data={
        name:req.body.name,
        comment:req.body.comment,
        time: Date.now()
    }
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

exports.getComments= function(req,res){
    model.find({}, '-_id -__v', function(err, comments){
        if(err)res.json({message:"comment not found"})
        res.json(comments)
    }).populate('name')
}

exports.editComments = function(req, res){
         var id = {_id:req.params.id}
        var data = {
        comment:req.body.comment
    };
    model.findByIdAndUpdate(id, data, function(err){
        if (err) res.json({err:err, message:'sorry, could not update comment'});
        res.json({message:'comment updated successfully'})
    })
}

exports.deleteComment = function(req, res){
        var id = {_id:req.params.id}
        model.remove(id, function(err){
        if (err) res.json({err:err, message:'could not delete comment'});
        res.json({message:'comment deleted'});
    });
}