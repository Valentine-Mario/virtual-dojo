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
