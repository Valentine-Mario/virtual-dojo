var mongoose = require('mongoose');

var SuperCategorySchema=mongoose.Schema({
    name: String,
    description: String,
    cover_image:String,
    courses:[{type:mongoose.Schema.Types.ObjectId, ref:'category'}]
})
module.exports= mongoose.model('superCategory', SuperCategorySchema);