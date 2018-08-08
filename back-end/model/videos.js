var mongoose = require('mongoose');

var VideoSchema=mongoose.Schema({
    name:String,
    description:String,
    video:[String],
    time:Date,
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}]
})
module.exports= mongoose.model('video', VideoSchema);