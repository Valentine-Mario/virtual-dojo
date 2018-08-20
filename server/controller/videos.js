var model= require('../model/videos');
var model2= require('../model/category');
var cloudinary = require('cloudinary');
var fs= require('fs');
var ObjectID = require('mongoose').Types.ObjectId;
const multer = require('multer');
cloudinary.config({ 
  cloud_name: 'school-fleep', 
  api_key: '913188349489292', 
  api_secret: 'CDafSvspukpNVWRh0ib3gd1Dsz0' 
});
var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

exports.addVideo = function(req, res, next){
    var data = {
        name: req.body.name,
        description: req.body.description,
        time:Date.now(),
        video: req.files[0].path
    };

    cloudinary.uploader.upload(data.video).then(function(result){
      data.video= result.url;
      model.create(data, function(err, data){
        if(err){
           res.json({message:"could not create file"})
        }else{
          let category = new ObjectID(req.body.category);
          model2.findById({_id: category}, function(err, category){
            if(err){
              res.json({message:"category not found"})
            }else{
              category.videos.push(data._id);
              model2.create(category);
              res.json({message:"added to category"})
              model2.findByIdAndUpdate(category, {$inc : {content : 1} }, function(err){})
            }
          })
        }
      })
    })
  
}

exports.getvideos= function(req, res){
        model.find({}, function(err, videos){
        if (err) res.json({err:err, message:'sorry, could not return videos'});
        res.json(videos) 
    }).populate('comment')
}

exports.getvideoByid = function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, video){
        if (err) res.json({err:err, message:'sorry, could not get category'});
        res.json(video);
    }).populate('comment')
}

exports.searchVideo = function(req, res){
	var value= req.params.value;
    model.find({"description":{$regex: value, $options: 'i'}}, function(err, videos){
        if (err) res.json({err:err, message:'sorry, could not find video'});
        res.json(videos)
    }).populate('comment')
}

exports.editVideo = function(req, res){
         var id = {_id:req.params.id}
        var data = {
        name: req.body.name,
        description: req.body.description
    };
    model.findByIdAndUpdate(id, data, function(err){
        if (err) res.json({err:err, message:'sorry, could not update video'});
        res.json({message:'video updated successfully'})
    })
}

exports.deleteVideo= function(req,res){
    var id = {_id:req.params.id}
    let category = new ObjectID(req.body.category);
  
          model.remove(id, function(err){
            if(err)res.json({message:"could not delete"})
            res.json({message:"video deleted successfully"});
            
            model2.findByIdAndUpdate(category, {$inc : {content : -1} }, function(err){})
          })
}