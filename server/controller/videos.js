var model= require('../model/videos');
var model2= require('../model/category');
var model3= require('../model/user')
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
        videoID:'',
        video: req.files[0].path
    };

    cloudinary.uploader.upload(data.video, function(result){console.log(result)}, {resource_type:"video"}).then(function(result){
      data.video= result.url;
      data.videoID= result.public_id
      model.create(data, function(err, data){
        if(err){
           res.json({message:"could not create file"})
        }else{
          let course = new ObjectID(req.body.course);
          model2.findById({_id: course}, function(err, category){
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
    }).populate({ 
      path: "comment", // 1st level subdoc (get comments)
      populate: { // 2nd level subdoc (get users in comments)
        path: "user_id",
        select: 'firstName lastName profile_pics'// space separated (selected fields only)
      }
    })
}

exports.getvideoByid = function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, video){
        if (err) res.json({err:err, message:'sorry, could not get category'});
        res.json(video);
    }).populate({ 
      path: "comment", // 1st level subdoc (get comments)
      populate: { // 2nd level subdoc (get users in comments)
        path: "user_id",
        select: 'firstName lastName profile_pics'// space separated (selected fields only)
      }
    })
}

exports.getLatest= function(req, res){
  value=parseInt(req.params.value)
  model.find({}, function(err, data){
    if(err)res.json({message:"an error occured sorting videos"})
    res.json(data)
  }).populate('comment').sort({'_id':-1}).limit(value).exec()
}

exports.searchVideo = function(req, res){
  var value= req.params.value;
  if(value !== null || value !== ""){
    model.find({"description":{$regex: value, $options: 'gi'}}, function(err, videos){
        if (err) res.json({err:err, message:'sorry, could not find video'});
        res.json(videos)
    }).populate({ 
      path: "comment", // 1st level subdoc (get comments)
      populate: { // 2nd level subdoc (get users in comments)
        path: "user_id",
        select: 'firstName lastName profile_pics'// space separated (selected fields only)
      }
    })

  }else{
      res.json({message:"field can't be empty"})
  }
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
  let user = new ObjectID(req.body.user)
  model3.findById(user, function(err, user){
      if(user.isAdmin==1){
        model.findById(id, function(err, value){
          cloudinary.uploader.destroy(value.videoID, function(result){console.log(result)}, {resource_type:"video"}).then(function(result){
            value.video= result.url;
            model.remove(id, function(err){
              if(err)res.json({message:"could not delete"})
              res.json({message:"video deleted successfully"});
              
              //model2.findByIdAndUpdate(course, {$inc : {content : -1} }, function(err){})
            })
          })
        })
      }else{
          res.json({message:"only admin can delete videos"})
      }
  })
}