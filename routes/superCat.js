var express = require('express');
var router = express.Router();
var CategoryController= require('../controller/superCat')
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

router.post('/add', upload.any('cover_image'), CategoryController.addcategory);
router.get('/get', CategoryController.getCategory)
router.get('/get/:id', CategoryController.getCategoryById)
router.post('/edit/:id', upload.any('cover_image'), CategoryController.editCategory)


module.exports = router;