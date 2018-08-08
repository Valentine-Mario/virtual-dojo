var express = require('express');
var router = express.Router();
var videoController= require('../controller/videos')
var model= require('../model/videos');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

router.post('/add', upload.array('video'), videoController.addVideo);

module.exports = router;