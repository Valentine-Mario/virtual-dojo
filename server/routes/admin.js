var express = require('express');
var router = express.Router();
var app = express();
var UserController= require('../controller/user')
var passport= require('passport');
var session = require('express-session');
var ObjectID = require('mongoose').Types.ObjectId;
var mongoose= require('mongoose')
var LocalStrategy = require('passport-local').Strategy;
var user= require('../model/user');
passport.use('admin',new LocalStrategy(passport.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id); 
});
passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'deliver me',
  resave: false,
  saveUninitialized: true
}))


  router.post('/login', passport.authenticate('admin'),
    function(req, res){
        res.json({message:req.session, isAdmin:req.user.isAdmin})
    }
)

    passport.use('admin', new LocalStrategy(
        function(username, password, done) {
          UserController.getUserByUsername2(username, function(err, user){
              if(err)throw err;
              if(!user){
                  return done(null, false, {message: "user unknown"})
              }
      
              UserController.decrypt(password, user.password, function(err, isMatch){
                  if(err)throw err;
                  if(isMatch){
                      if(user.isAdmin==1){
                        return done(null, user)
                      }else{
                        return done({message:"only admin allowed"})
                      }
                  }else{
                      return done(null, false, {message:"invalid password"})
                  }
              })
          })
        }
      ));

router.post('/makeadmin', UserController.makeAdmin)
router.post('/removeadmin', UserController.removeAdmin)


router.get('/logout/:id', function(req, res){
    UserController.getUserByid
    req.logout();
    res.json({message:"logged out successful"})
})

module.exports = router;
