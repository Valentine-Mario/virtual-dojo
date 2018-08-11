var model= require('../model/category');


exports.addCategory = function(req, res){
    var data = {
        name: req.body.name,
        description: req.body.description,
        video:[]
    };
         model.create(data, function(err){
                if(err){
                    res.json({message:'category not added'});
                }else{
                    res.json({message:'category added successfully.'})
                }
                
            })
}

exports.getCategory= function(req, res){
        model.find({}, function(err, category){
        if (err) res.json({err:err, message:'sorry, could not return category'});
        res.json(category) 
    });   
}

exports.getCategoryByid = function(req, res){
    var id = req.params.id;
    model.findById(id, function(err, category){
        if (err) res.json({err:err, message:'sorry, could not get category'});
        res.json(category);
    });
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