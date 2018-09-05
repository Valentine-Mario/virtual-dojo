var mongoose = require('mongoose');

var ReviewSchema=mongoose.Schema({
    comment: String,
    name:String,
    email:String,
    time:Date
})
module.exports= mongoose.model('review', ReviewSchema);