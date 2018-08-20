var express = require('express');
var router = express.Router();
var videoController= require('../controller/videos')
var model= require('../model/videos');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'||file.mimetype === 'image/gif') {
        cb(null, './files/images/')
      } else if(file.mimetype==='video/mp4'||file.mimetype==='video/avi'||filename==='video/flv'){
        cb(null, './files/videos/')
      }
      
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
//router.get('/cat/:id', videoController.getall)

module.exports = router;