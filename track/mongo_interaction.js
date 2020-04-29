exports.insertUser=(req,collection,callback)=>{
	collection.find({username:req.username}).toArray((error,result)=>{
		if(error)return process.exit(1)
			console.log(result.length)
		if(result.length>=1)
		 return callback("Username already exists")
		else
		{
			collection.insertOne(req,(err,res)=>{
		if(err) throw err
		console.log('Inserted')
	callback("Signed up successfully")
	})
		}
	})
	
}

exports.signInUser=(req,collection,callback)=>{
	collection.find(req).toArray((error,result)=>{
		if(error)return process.exit(1)
			console.log(result.length)
		if(result.length>=1){

					const query={ username: req.username};
	const newvalues={$set:{ip:req.ip}}

	collection.updateOne(query,newvalues,(error,result)=>{
		if(error) return process.exit(1)
		console.log("updated ip")
				 return callback("Sign in successfull")
	})}
		else
		{
	callback("Incorrect username/password");
		}
	})
	
}
