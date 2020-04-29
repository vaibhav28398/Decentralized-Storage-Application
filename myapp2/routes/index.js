var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
const url="mongodb://localhost:27017"
const splitFile = require('split-file');
const splitFiles = require('js-split-file');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/login', function(req, res, next) {
  res.render('login',{duplicate: req.flash('duplicate'),incorrect: req.flash('incorrect')});
});



const fileSplit=function()
{
  console.log(__dirname+'../../../../../storage/AR.pdf');
    splitFile.splitFile(__dirname+'../../../../../storage/a.jpg', 3)
  .then((names) => {
    console.log(names);
    splitFile.mergeFiles(names, __dirname +'../../../../../storage/s.jpg')
  .then(() => {
    console.log('Done!');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
}
router.get('/profile', function(req, res, next) {
  fileSplit();
  res.render('profile',{success: req.flash('success')});
});

router.post("/register",function(req,res){
  MongoClient.connect(url,(error,client)=>{
    if(error)
      throw error
    const db=client.db('decentralised')
    var collection=db.collection('user_details')
    console.log('Connection made')
    collection.find({username:req.body.username}).toArray((error,result)=>{
      if(error)return process.exit(1)
        console.log(result.length)
      if(result.length>=1)
        {
          req.flash("duplicate", "Username already exists");
          res.redirect('/login')
        }
      else
      {
        var data={
          username: req.body.username,
          ip: req.body.ip,
          password: req.body.password
        };
        collection.insertOne(data,(err,resp)=>{
      if(err) throw err
      console.log('Inserted')
      ssn=req.session
          ssn.username=req.body.username
          ssn.ip=req.body.ip;
      req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      res.redirect('/profile')
    })
      }
    })
  })
  

})

router.post('/login',function(req,res){
  MongoClient.connect(url,(error,client)=>{
    if(error)
      throw error
    const db=client.db('decentralised')
    var collection=db.collection('user_details')
    console.log('Connection made')
    var data={
      username: req.body.username,
      ip: req.body.ip,
      password: req.body.password
    };
    collection.find(data).toArray((error,result)=>{
      if(error)return process.exit(1)
        console.log(result.length)
      if(result.length>=1)
        {
          ssn=req.session
          ssn.username=req.body.username
          ssn.ip=req.body.ip;
          req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      res.redirect('/profile')
        }
      else
      {      
      req.flash("incorrect", "Incorrect username/password");
          res.redirect('/login')
    }
      })
    })
  })


module.exports = router;
