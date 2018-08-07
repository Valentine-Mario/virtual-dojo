var express = require('express');
var router = express.Router();
var commentController= require('../controller/comment')

router.post('/add', commentController.addComment);
router.get('/get', commentController.getComments)
router.post('/edit/:id', commentController.editComments)
module.exports = router;