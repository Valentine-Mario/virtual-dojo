var model= require('../model/category');
var model2= require('../model/superCat');
var multer= require('multer')
var ObjectID = require('mongoose').Types.ObjectId;
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

exports.addCategory = function(req, res){
    var data = {
        name: req.body.name,
        description: req.body.description,
        image:req.files[0].path
    };
    model.create(data, function(err, data){
        if(err){
           res.json({message:"could not create file"})
        }else{
          let category = new ObjectID(req.body.category);
          model2.findById({_id: category}, function(err, Supercategory){
            if(err){
              res.json({message:"category not found"})
            }else{
              Supercategory.courses.push(data._id);
              model2.create(Supercategory);
              res.json({message:"added to category"})
              model2.findByIdAndUpdate(Supercategory, {$inc : {content : 1} }, function(err){})
            }
          })
        }
      })
    
}

exports.getCategory= function(req, res){
        model.find({}, function(err, category){
        if (err) res.json({err:err, message:'sorry, could not return category'});
        res.json(category) 
    }).populate('videos').sort({'_id':-1}).exec() 
}

exports.getLatest= function(req, res){
  value=parseInt(req.params.value)
  model.find({}, function(err, data){
    if(err)res.json({message:"an error occured sorting videos"})
    res.json(data)
  }).populate('videos').sort({'_id':-1}).limit(value).exec()
}


exports.searchCourse = function(req, res){
  var value= req.params.value;
    model.find({"description":{$regex: value, $options: 'i'}}, function(err, course){
        if (err) res.json({err:err, message:'sorry, could not find video'});
        res.json(course)
    }).populate('videos')
}

exports.getCategoryByid = function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, category){
        if (err) res.json({err:err, message:'sorry, could not get category'});
        res.json(category);
    }).populate('videos')
}

exports.editCategory = function(req, res){
         var id = {_id:req.params.id}
        var data = {
        name: req.body.name,
        description: req.body.description
    };
    model.findByIdAndUpdate(id, data, function(err){
        if (err) res.json({err:err, message:'sorry, could not update category'});
        res.json({message:'category updated successfully'})
    })
}

exports.deleteCategory = function(req, res){
        var id = {_id:req.params.id}
        model.remove(id, function(err){
        if (err) res.json({err:err, message:'could not delete category'});
        return res.json({message:'category deleted'});
    });
}