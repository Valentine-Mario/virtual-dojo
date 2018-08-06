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