exports.insertUser=(req,collection,callback)=>{
	collection.insertOne(req,(err,res)=>{
		if(err) throw err
		console.log('Inserted')
	callback(res)
	})
}
