var mongoose = require('mongoose');

var CommentSchema=mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    comment: String,
    time:Date
})
module.exports= mongoose.model('comment', CommentSchema);