var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
var fs = require('fs');


var formidable = require('formidable');


router.post('/',function(req,res){
    console.log("Hi");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/hp/Documents/storage/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          
          req.flash("success", "Successfully uploaded file ");
      res.redirect('/profile')
        });
    });
})
module.exports = router;