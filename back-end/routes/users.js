var express = require('express');
var router = express.Router();
var UserController= require('../controller/user')

/* GET users listing. */

router.post('/register', UserController.addUser);
router.get('/users', UserController.getUser)


module.exports = router;
