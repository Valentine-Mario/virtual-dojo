var mongoose = require('mongoose');

var UserSchema=mongoose.Schema({
    name: String,
    username:{type: String, unique: true},
    email:{type: String, unique: true},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'post'}],
    password: String,
})

// module.exports.createUser= function(newUser, callback){
//     bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(newUser.password, salt, function(err, hash) {
//         newUser.password= hash
//         newUser.save(callback)
//     });
// });
// }
module.exports= mongoose.model('user', UserSchema);