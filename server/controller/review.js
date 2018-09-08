var model= require('../model/reviews')

exports.addReview= function(req, res){
    var data={
        comment:req.body.comment,
        name:req.body.name,
        email:req.body.email
    }
    model.create(data, function(err){
        if(err)res.json({message:"could not add review"})
        res.json({message:"review added successfully"})
    })
}

exports.getReview= function(req, res){
    model.find({}, function(err, data){
        if(err)res.json({message:"could not get review"})
        res.json(data)
    })
}

exports.searchReview= function(req, res){
    var value= req.params.value;
        model.find({"comment":{$regex: value, $options: 'gi'}}, '-__v', function(err, review){
            if (err) res.json({err:err, message:`could not find user due to error in connection`});
            res.json({message:review})
        })
}