var model= require('../model/videos');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
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
        video:req.file,
        comments:[]
    };
            model.create(data, function(err){
                if(err)res.json({message:"could not create file"})
                res.json({message:"file uploaded successfully"})
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