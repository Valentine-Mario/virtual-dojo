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