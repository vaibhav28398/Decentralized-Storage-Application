var express = require('express');
var router = express.Router({mergeParams: true});

/* GET home page. */
router.get('/', function(req, res, next) {
 var df="cfdcv";
  res.render('login', {data : df});
});

module.exports = router;
