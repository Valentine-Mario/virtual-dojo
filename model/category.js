var mongoose = require('mongoose');

var CategorySchema=mongoose.Schema({
    name: String,
    description: String,
    image:String,
    videos:[{type:mongoose.Schema.Types.ObjectId, ref:'videos'}]
})
module.exports= mongoose.model('category', CategorySchema);