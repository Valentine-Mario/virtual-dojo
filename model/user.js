var mongoose = require('mongoose');

var UserSchema=mongoose.Schema({
    FirstName: String,
    LastName:String,
    username:{type: String, unique: true},
    email:{type: String, unique: true},
    profile_pics:String,
    time:Date,
    library:[{type:mongoose.Schema.Types.ObjectId, ref:'videos'}],
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}],
    password: String,
})
module.exports= mongoose.model('user', UserSchema);