var express = require('express');
var router = express.Router();
var app = express();
var UserController= require('../controller/user')
var passport= require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var user= require('../model/user');
const jwt = require('jsonwebtoken');
passport.use('user',new LocalStrategy(passport.authenticate()));
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
  secret: 'diversify me',
  resave: false,
  saveUninitialized: true
}))
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'||file.mimetype === 'image/gif') {
        cb(null, './files/images/')
      } else {
        
      }
      
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

  router.post('/login', passport.authenticate('user'),
    function(req, res){
       res.json(req.session)
    }
)

/* GET users listing. */

router.post('/register', UserController.addUser);
router.get('/users', UserController.getUser);
router.get('/search/:value', UserController.searchUser);
router.post('/edit/:id', UserController.editUser);
router.get('/delete/:id', UserController.deleteUser);
//router.post('/user', UserController.getUserByUsername);
router.post('/buy', UserController.getVideo)
router.post('/update-profile/:id', upload.any('profile_pics'),  UserController.editProfilePics);
router.get('/:id', UserController.getUserByid);

    passport.use('user', new LocalStrategy(
        function(username, password, done) {
          UserController.getUserByUsername2(username, function(err, user){
              if(err)throw err;
              if(!user){
                  return done(null, false, {message: "user unknown"})
              }
      
              UserController.decrypt(password, user.password, function(err, isMatch){
                  if(err)throw err;
                  if(isMatch){
                      return done(null, user) 
                  }else{
                      return done(null, false, {message:"invalid password"})
                  }
              })
          })
        }
      ));




router.get('/logout/:id', function(req, res){
    UserController.getUserByid
    req.logout();
    res.json({message:"logged out successful"})
})

module.exports = router;
