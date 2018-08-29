var express = require('express');
var router = express.Router();
var commentController= require('../controller/comment')

router.post('/add', commentController.addComment);
router.get('/get', commentController.getComments)
router.post('/edit/:id', commentController.editComments)
router.post('/delete/:id', commentController.deleteComment)

module.exports = router;