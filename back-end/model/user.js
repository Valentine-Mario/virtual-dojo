var mongoose = require('mongoose');

var UserSchema=mongoose.Schema({
    name: String,
    username:{type: String, unique: true},
    email:{type: String, unique: true},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}],
    password: String,
})
module.exports= mongoose.model('user', UserSchema);