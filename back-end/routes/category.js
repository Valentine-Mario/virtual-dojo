var express = require('express');
var router = express.Router();
var CategoryController= require('../controller/category')

router.post('/add', CategoryController.addCategory);
router.get('/get', CategoryController.getCategory);
router.get('/get/:id', CategoryController.getCategoryByid);
router.post('/edit/:id', CategoryController.editCategory);
router.get('/delete/:id', CategoryController.deleteCategory)

module.exports = router;