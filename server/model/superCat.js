var mongoose = require('mongoose');

var SuperCategorySchema=mongoose.Schema({
    name: String,
    description: String,
    cover_image:String,
    content:{type:Number, default:0},
    courses:[{type:mongoose.Schema.Types.ObjectId, ref:'category'}]
})
module.exports= mongoose.model('superCategory', SuperCategorySchema);