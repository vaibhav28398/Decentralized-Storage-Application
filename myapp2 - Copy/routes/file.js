var express = require('express');
var router = express.Router();
var fs = require('fs');
const splitFile = require('split-file');
const mkdirp = require('mkdirp');
const web3 = require('web3');
var hash = require('object-hash');
const contract=require('../models/contracts');

var formidable = require('formidable');




const fileSplit=function(filename)
{
  console.log(__dirname+'../../../../../storage/'+filename);
    splitFile.splitFileBySize(__dirname+'../../../../../storage/'+filename, 40000)
  .then((names) => {
    // console.log(names);
    web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
    var trackFileContract = new web3js.eth.Contract(contract.trackFileContractABI,contract.trackFileContractAddress);
    var userContract = new web3js.eth.Contract(contract.userContractABI,contract.userContractAddress);

    web3js.eth.getAccounts().then((acc) => {
      let firstAcc=acc[0];
       console.log(firstAcc);
       userContract.methods.userCount().call({from:firstAcc,gas: 3000000},function(error,result){
         if(!error)
         {
          var total_users=result;
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
          trackFileContract.methods.addtracker('u'+ssn.uid+'f'+filename,JSON.stringify(json_file)).send({from:firstAcc,gas: 3000000});
          
         }
         else
         console.log(error);
       });
       
      });
    })
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

        web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
        var fileContract = new web3js.eth.Contract(contract.fileContractABI,contract.fileContractAddress);

        web3js.eth.getAccounts().then((acc) => {
          let firstAcc=acc[0];
           console.log(firstAcc);
           fileContract.methods.addFile(ssn.uid,file_name).send({from:firstAcc,gas: 3000000},function(error,result){
             if(!error)
             {
              req.flash("success", "Successfully uploaded file");
              res.redirect('/profile');
             }
             else
             console.log(error);
           });
           
          });
    });
    
})

module.exports = router;