var model= require('../model/videos');
var model2= require('../model/category');
var fs= require('fs');
var ObjectID = require('mongoose').Types.ObjectId;
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'||file.mimetype === 'image/gif') {
        cb(null, './files/images/')
      } else if(file.mimetype==='video/mp4'||file.mimetype==='video/avi'||filename==='video/flv'){
        cb(null, './files/videos/')
      }
      
    },
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
        video: req.files[1].path,
        comments:[]
    };      
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
        }
      })
    }
  })
}

exports.getvideos= function(req, res){
        model.find({}, function(err, videos){
        if (err) res.json({err:err, message:'sorry, could not return videos'});
        res.json(videos) 
    });   
}

exports.getvideoByid = function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, video){
        if (err) res.json({err:err, message:'sorry, could not get category'});
        res.json(video);
    });
}

exports.searchVideo = function(req, res){
	var value= req.params.value;
    model.find({"description":{$regex: value, $options: 'i'}}, function(err, videos){
        if (err) res.json({err:err, message:'sorry, could not find video'});
        res.json(videos)
    });
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
  model.findById(id, function(err, vid){
    if(err){
      res.json({message:"video could not be deleted"})
    }else{
      fs.unlink(vid.video, function(err){
        if(err){
          res.json({message:"could not delete this video"})
        }
          else{
          model.remove(id, function(err){
            console.log(err)
            if(err)res.json({message:"could not delete"})
            res.json({message:"video deleted successfully"});
          })
        }
      })
    }
  })
}