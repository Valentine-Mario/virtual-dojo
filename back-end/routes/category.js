var express = require('express');
var router = express.Router();
var CategoryController= require('../controller/category')

router.post('/add', CategoryController.addCategory);
router.get('/get', CategoryController.getCategory)

module.exports = router;