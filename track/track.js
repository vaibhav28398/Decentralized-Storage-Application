const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());

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
	addUserToDb(res.body)
	console.log('hi');
	res.send('bye');
})
app.listen(9000);