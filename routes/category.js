var express = require('express');
var router = express.Router();
var CategoryController= require('../controller/category')
var multer= require('multer')
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

router.post('/add', upload.any('image'), CategoryController.addCategory);
router.get('/get', CategoryController.getCategory);
router.get('/get/:id', CategoryController.getCategoryByid);
router.post('/edit/:id', CategoryController.editCategory);
router.get('/delete/:id', CategoryController.deleteCategory);
router.get('/search/:value', CategoryController.searchCourse);
router.get('/getlatest/:value', CategoryController.getLatest)


module.exports = router;