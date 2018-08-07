var express = require('express');
var router = express.Router();
var commentController= require('../controller/comment')

router.post('/add', commentController.addComment);

module.exports = router;