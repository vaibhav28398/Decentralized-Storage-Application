const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const MongoClient=require('mongodb').MongoClient
const mongo=require('./mongo_interaction.js')

const url="mongodb://localhost:27017"
app.use(bodyParser.json());
var collection=""
MongoClient.connect(url,(error,client)=>{
	if(error)
		throw error
	const db=client.db('decentralised')
	collection=db.collection('user_details')
	console.log('Connection made')

})


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/adduser',(req,res)=>{
	console.log('hi');
	res.send('bye');
})
app.post('/adduser',(req,res)=>{
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log(ip)
	mongo.insertUser(req.body,collection,(result)=>{
		res.send('Sign up Successful')
	})
	console.log('Signed up');
})
app.listen(9000);