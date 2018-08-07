var model= require('../model/comment')

exports.addComment= function(req, res){
    var data={
        name:req.body.name,
        comment:req.body.comment,
        video:req.body.video
    }
    model.create(data, function(err){
        if(err)res.json({message:"comment could not be created"})
        res.json({message:"comment created succesfully"})
    })
}

exports.getComments= function(req,res){
    model.find({}, '-_id -__v', function(err, comments){
        if(err)res.json({message:"comment not found"})
        res.json(comments)
    })
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