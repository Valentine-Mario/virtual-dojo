var model= require('../model/superCat');
var fs= require('fs');
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

exports.addcategory = function(req, res, next){
    var data = {
        name: req.body.name,
        description: req.body.description,
        cover_image:req.files[0].path,
        courses:[]
    };      
  model.create(data, function(err){
    if(err){
       res.json({message:"could not create category"})
    }else{
        res.json({message:"category created successfully"})
    }
  })
}

 exports.getCategory = function(req, res){
     model.find({}, function(err, data){
         if(err)res.json(err)
         res.json(data)
     })
 }

 exports.getCategoryById= function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, data){
        if(err)res.json({message:"could not get category"})
        res.json(data)
    })
 }

 exports.editCategory= function(req,res){
    var id={_id:req.params.id}
    var data = {
        name: req.body.name,
        description: req.body.description,
        cover_image:req.files[0].path
    };  
    model.findById(id, function(err, value){
        if(value.cover_image){
            fs.unlink(value.cover_image, function(err){
                if(err){
                    res.json({message:"an error occured editing cover image"})
                }else{
                    model.findByIdAndUpdate(id, data, function(err){
                        if(err)res.json({message:"category could not update"})
                        res.json({message:"category updated"})
                    })                 
                }
            })
        }else{
            model.findByIdAndUpdate(id, data, function(err){
                if(err)res.json({message:"category could not update"})
                res.json({message:"category updated"})
            })
        }
        
    })
    
        
}
