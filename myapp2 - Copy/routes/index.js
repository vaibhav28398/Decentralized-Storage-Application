var express = require('express');
var router = express.Router();
const web3 = require('web3');
const contract=require('../models/contracts');

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
  web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
  var fileContract = new web3js.eth.Contract(contract.fileContractABI,contract.fileContractAddress);

  web3js.eth.getAccounts().then((acc) => {
    let firstAcc=acc[0];
     console.log(firstAcc);
     fileContract.methods.getFiles(ssn.uid).call({from:firstAcc,gas: 3000000},function(error,result){
       if(!error)
       {
          res.render('profile',{success: req.flash('success'),file_list: result});
       }
       else
       console.log(error);
     });
     
    });

 
});

router.post("/register",function(req,res){
  web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
  var userContract = new web3js.eth.Contract(contract.userContractABI,contract.userContractAddress);

  web3js.eth.getAccounts().then((acc) => {
    let firstAcc=acc[0];
     console.log(firstAcc);
     userContract.methods.addUser(req.body.username,req.body.password,req.body.ip).send({from:firstAcc,gas: 3000000},function(error,result){
       if(!error)
       {
         if(result==-1)
         {
          req.flash("incorrect", "Username already exists");
          res.redirect('/login');
         }
         else{
           ssn=req.session;
          ssn.uid=result;
          ssn.ip=req.body.ip;
          ssn.username=req.body.username;
          req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
          res.redirect('/profile');
         }  
       }
       else
       console.log(error);
     });
     
    }); 

})

router.post('/login',function(req,res){
  web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
  var userContract = new web3js.eth.Contract(contract.userContractABI,contract.userContractAddress);
  web3js.eth.getAccounts().then((acc) => {
    let firstAcc=acc[0];
     console.log(firstAcc);
     userContract.methods.loginUser(req.body.username,req.body.password).call({from:firstAcc,gas: 3000000},function(error,result){
       if(!error)
       {
         if(result==-1)
         {
          req.flash("incorrect", "Incorrect username/password");
          res.redirect('/login');
         }
         else{
          ssn=req.session;
          ssn.uid=result;
          ssn.ip=req.body.ip;
          ssn.username=req.body.username;
          req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
          res.redirect('/profile');
         }
          
       }
       else
       console.log(error);
     });
     
    }); 
  })

  router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
module.exports = router;
