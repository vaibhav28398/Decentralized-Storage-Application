var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
var fs = require('fs');
const splitFile = require('split-file');
const mkdirp = require('mkdirp');

const url="mongodb://localhost:27017"

var formidable = require('formidable');

const fileSplit=function(filename)
{
  console.log(__dirname+'../../../../../storage/'+filename);
    splitFile.splitFileBySize(__dirname+'../../../../../storage/'+filename, 40000)
  .then((names) => {
    // console.log(names);


    MongoClient.connect(url,(error,client)=>{
        if(error)
          throw error;
        const db=client.db('decentralised');
        var collection=db.collection('user_details');
        console.log('Connection made for files distribution');
        collection.find({}).toArray((error,result)=>{
            if(error)return process.exit(1);
            var total_users=result.length;
            var total_chunks=names.length;
            var json_file=[];
            if(total_chunks<total_users)
            {
                for(var i=0;i<total_chunks;i++)
                {
                    json_file.push({segment_no: (i+1),nodes:{}});
                    json_file[i].nodes[i+1]=ssn.ip;
                    const made = mkdirp.sync('C:/Users/hp/Documents/storage/'+(i+1)+'/'+ssn.uid+'/'+filename);
                    fs.rename(names[i],'C:/Users/hp/Documents/storage/'+(i+1)+'/'+ssn.uid+'/'+filename+'/'+filename+'.sf-part'+(i+1) , function (err) {
                        if (err) throw err;
                      });
                }
            }
            else{
                var chunks_in_each_node=Math.floor(total_chunks/total_users);
                var rem=total_chunks%total_users;
                console.log('Chunks'+chunks_in_each_node);
                console.log('rem'+rem);
                for(var i=0;i<total_users;i++)
                {
                    for(var j=0;j<chunks_in_each_node;j++)
                    {
                      json_file.push({segment_no: (i*chunks_in_each_node+j+1),nodes:{}});
                      json_file[i*chunks_in_each_node+j].nodes[i+1]=ssn.ip;
                        const made = mkdirp.sync('C:/Users/hp/Documents/storage/'+(i+1)+'/'+ssn.uid+'/'+filename);
                        fs.rename(names[i*chunks_in_each_node+j],'C:/Users/hp/Documents/storage/'+(i+1)+'/'+ssn.uid+'/'+filename+'/'+filename+'.sf-part'+(i*chunks_in_each_node+j+1), function (err) {
                            if (err) throw err;
                          });
                    }
                    
                }
                if(rem!=0)
                {
                    for(var j=0;j<rem;j++)
                    {
                      console.log('inside rem loop');
                      json_file.push({segment_no: (chunks_in_each_node*total_users+j+1),nodes:{}});
                      json_file[chunks_in_each_node*total_users+j].nodes[total_users]=ssn.ip;
                        const made = mkdirp.sync('C:/Users/hp/Documents/storage/'+total_users+'/'+ssn.uid+'/'+filename);
                        fs.rename(names[chunks_in_each_node*total_users+j],'C:/Users/hp/Documents/storage/'+total_users+'/'+ssn.uid+'/'+filename+'/'+filename+'.sf-part'+(chunks_in_each_node*total_users+j+1), function (err) {
                            if (err) throw err;
                          });
                    }
                }
            }
            const made = mkdirp.sync('C:/Users/hp/Documents/storage/jsonFiles/'+ssn.uid);
            fs.writeFile('C:/Users/hp/Documents/storage/jsonFiles/'+ssn.uid+'/'+filename+'.json', JSON.stringify(json_file), function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
        })
    })



//     splitFile.mergeFiles(names, __dirname +'../../../../../storage/s.jpg')
//   .then(() => {
//     console.log('Done!');
//   })
//   .catch((err) => {
//     console.log('Error: ', err);
//   });
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
}

router.post('/',function(req,res){
    
    console.log("File upload request");
    var form = new formidable.IncomingForm();
    var file_name="";
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        file_name=files.filetoupload.name;
        
        var newpath = 'C:/Users/hp/Documents/storage/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          fileSplit(file_name);
        });
        MongoClient.connect(url,(error,client)=>{
            if(error)
              throw error;
            const db=client.db('decentralised');
            var collection=db.collection('user_files');
            console.log('Connection made for files');
            var f_id;
            collection.find({uid:ssn.uid}).sort({fid : -1}).limit(1).toArray((error,result)=>{
                if(error)return process.exit(1);
                if(result[0]==undefined)
                f_id=1;
                else{
                    f_id=result[0].fid+1;
                }
                var data={
                uid: ssn.uid,
                fid: f_id,
                filename: file_name
            };
    
            collection.insertOne(data,(err,resp)=>{
                if(err) throw err;
                console.log('Inserted');
                req.flash("success", "Successfully uploaded file");
                res.redirect('/profile');
              })
            })  
            
          })
    });
    
})

module.exports = router;