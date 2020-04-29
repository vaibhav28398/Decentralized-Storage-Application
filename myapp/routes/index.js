var express = require('express');
var router = express.Router();
// var User = require("../models/user");
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('k');
  res.render('login');
});

// router.post("/register",function(req,res){
//   var newUser = new User({
//     username: req.body.username,
//     firstName: req.body.firstName,
//     ip: "127.0.0.1"
//   });
  
// const url="mongodb://localhost:27017"
// var collection=""
//   MongoClient.connect(url,(error,client)=>{
//     if(error)
//       throw error
//     const db=client.db('decentralised')
//     collection=db.collection('user_details')
//     console.log('Connection made')
  
//   })
//   collection.find({username:req.body.username}).toArray((error,result)=>{
// 		if(error)return process.exit(1)
// 			console.log(result.length)
// 		if(result.length>=1)
//     res.render("login", {error: err.message});
// 		else
// 		{
// 			collection.insertOne(req,(err,res)=>{
// 		if(err) throw err
// 		console.log('Inserted')
//     req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
//     res.redirect("/campgrounds"); 
// 	})
// 		}
// 	})

// })

module.exports = router;
