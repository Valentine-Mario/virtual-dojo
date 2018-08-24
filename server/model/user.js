var mongoose = require('mongoose');

var UserSchema=mongoose.Schema({
    firstName: String,
    lastName:String,
    username:{type: String, unique: true},
    email:{type: String, unique: true},
    profile_pics:String,
    profile_pics_id:String,
    time:Date,
    library:[{type:mongoose.Schema.Types.ObjectId, ref:'category'}],
    password: String,
})
module.exports= mongoose.model('user', UserSchema);