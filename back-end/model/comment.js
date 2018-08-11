var mongoose = require('mongoose');

var CommentSchema=mongoose.Schema({
    name: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    comment: String,
    time:Date,
    video:{type:mongoose.Schema.Types.ObjectId, ref:'videos'}
})
module.exports= mongoose.model('comment', CommentSchema);