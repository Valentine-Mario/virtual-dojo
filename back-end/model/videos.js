var mongoose = require('mongoose');

var VideoSchema=mongoose.Schema({
    name:String,
    description:String,
    video:[String],
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}],
    password: String,
})
module.exports= mongoose.model('video', VideoSchema);