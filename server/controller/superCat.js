var model= require('../model/superCat');
var model2= require('../model/category')
var fs= require('fs');
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'school-fleep', 
    api_key: '913188349489292', 
    api_secret: 'CDafSvspukpNVWRh0ib3gd1Dsz0' 
  });
const multer = require('multer');
var storage = multer.diskStorage({
    
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

exports.addcategory = function(req, res, next){
    var data = {
        name: req.body.name,
        description: req.body.description,
        cover_image:req.files[0].path
    };  
    
    cloudinary.uploader.upload(data.cover_image).then(function(result){
        data.cover_image= result.url;
        model.create(data, function(err){
            if(err){
               res.json({message:"could not create category"})
            }else{
                res.json({message:"category created successfully"})
            }
          })
    })
  
}

 exports.getCategory = function(req, res){
     model.find({}, function(err, data){
         if(err)res.json(err)
         res.json(data)
     }).populate('courses')
 }

 exports.getCategoryById= function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, data){
        if(err)res.json({message:"could not get category"})
        res.json(data)
    }).populate('courses')
 }

 exports.editCategory= function(req,res){
    var id={_id:req.params.id}
    var data = {
        name: req.body.name,
        description: req.body.description,
        cover_image:req.files[0].path
    };  
    cloudinary.uploader.upload(data.cover_image).then(function(result){
        data.cover_image= result.url
        model.findByIdAndUpdate(id, data, function(err){
            if(err)res.json({message:"an error updating category"})
            res.json({message:"category updated successfully"})
        })
    })
    
}
    exports.deleteCtegory= function(req, res){
        var id={_id:req.params.id}
        
                model.remove(id, function(err){
                    if(err)res.json({message:"could not delete category"})
                    res.json({message:"categtgory deleted successfully"})
                })  
            
    }