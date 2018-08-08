var mongoose = require('mongoose');

var UserSchema=mongoose.Schema({
    FirstName: String,
    LastName:String,
    username:{type: String, unique: true},
    email:{type: String, unique: true},
    library:[{type:mongoose.Schema.Types.ObjectId, ref:'videos'}],
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}],
    password: String,
})
module.exports= mongoose.model('user', UserSchema);