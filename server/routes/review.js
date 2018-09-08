var express = require('express');
var router = express.Router();
var reviewController= require('../controller/review')

router.post('/add', reviewController.addReview);
router.get('/get', reviewController.getReview);
router.get('/search/:value', reviewController.searchReview)


module.exports = router;