var express = require('express');
var router = express.Router();
var videoController= require('../controller/videos')
var model= require('../model/videos');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        cb(null, './files/videos/')
      
      
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

router.post('/add', upload.any('video'), videoController.addVideo);
router.get('/get', videoController.getvideos);
router.get('/get/:id', videoController.getvideoByid)
router.get('/search/:value', videoController.searchVideo)
router.post('/edit/:id', videoController.editVideo)
router.post('/delete/:id', videoController.deleteVideo)
router.get('/getlatest/:value', videoController.getLatest)
//router.get('/cat/:id', videoController.getall)

module.exports = router;