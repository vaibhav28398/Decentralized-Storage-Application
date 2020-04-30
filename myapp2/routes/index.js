var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
const url="mongodb://localhost:27017"

const splitFiles = require('js-split-file');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/login', function(req, res, next) {
  res.render('login',{duplicate: req.flash('duplicate'),incorrect: req.flash('incorrect')});
});




router.get('/profile', function(req, res, next) {
  // fileSplit();
  console.log('Profile will be rendered');
  MongoClient.connect(url,(error,client)=>{
    if(error)
      throw error
      console.log('Inside mongo');
    const db=client.db('decentralised')
    var collection=db.collection('user_files')
    console.log('Connection made')
    console.log(ssn.uid)
    var files=[]
    collection.find({uid:ssn.uid}).toArray((error,result)=>{
      if(error)return process.exit(1)
        console.log(result);
        console.log("Files fetched");
        files=result;
        res.render('profile',{success: req.flash('success'),file_list: files});
      }
    )
    })
  
});

router.post("/register",function(req,res){
  MongoClient.connect(url,(error,client)=>{
    if(error)
      throw error
    const db=client.db('decentralised')
    var collection=db.collection('user_details')
    console.log('Connection made')
    var id;
    collection.count(function (err, count) {
      if (!err && count === 0) {
         id=1;
         var data={
          username: req.body.username,
          ip: req.body.ip,
          password: req.body.password,
          uid: id 
        };
        collection.insertOne(data,(err,resp)=>{
      if(err) throw err
      console.log('Inserted')
      ssn=req.session
          ssn.username=req.body.username
          ssn.ip=req.body.ip;
          ssn.uid=id;
          req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
          res.redirect('/profile')
    })
      }
      else{
        collection.find().sort({uid : -1}).limit(1).toArray((error,result)=>{
          if(error)return process.exit(1)
          id=result[0].uid+1;
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
                password: req.body.password,
                uid: id 
              };
              collection.insertOne(data,(err,resp)=>{
            if(err) throw err
            console.log('Inserted')
            ssn=req.session
                ssn.username=req.body.username
                ssn.ip=req.body.ip;
                ssn.uid=id;
                req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
                res.redirect('/profile')
          })
            }
          })
        });


      }
      
  });
    
    // console.log(collection.find().sort({uid:-1}).limit(1));
    
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
          collection.findOne({username:req.body.username},function(error,result){
            if(error)return process.exit(1)
            ssn.uid=result.uid;
              console.log(result.length)
              req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      res.redirect('/profile')
          })
          
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
