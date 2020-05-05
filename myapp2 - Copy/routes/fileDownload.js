var express = require('express');
var router = express.Router();
var fs=require('fs');
const mkdirp = require('mkdirp');
const splitFile = require('split-file');
const web3 = require('web3');
var hash = require('object-hash');
const contract=require('../models/contracts');
/* GET users listing. */



router.get('/fileDownload/:filename', function(req, res, next) {

  web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
  var trackFileContract = new web3js.eth.Contract(contract.trackFileContractABI,contract.trackFileContractAddress);
  web3js.eth.getAccounts().then((acc) => {
    let firstAcc=acc[0];
     console.log(firstAcc);
     trackFileContract.methods.gettracker('u'+ssn.uid+'f'+req.params.filename).call({from:firstAcc,gas: 3000000},function(error,result){
       if(!error)
       {
          jsonData=JSON.parse(result);
          console.log('starting file download');
    var l=jsonData.length;
    var file_parts=[];
    for(var i=0;i<l;i++)
    {
        for(var node in jsonData[i].nodes)
        {
            var sourcePath='C:/Users/hp/Documents/storage/'+node+'/'+ssn.uid+'/'+req.params.filename+'/'+req.params.filename+'.sf-part'+jsonData[i].segment_no;
            // var destPath='C:/Users/hp/Downloads/storage-dec/'+ssn.uid+'/'+req.params.filename+'/';
            var destPath=__dirname+'../../../../../../Downloads/storage-dec/'+ssn.uid+'/'+req.params.filename+'/';
            file_parts.push(destPath+req.params.filename+'.sf-part'+jsonData[i].segment_no);
            const made = mkdirp.sync(destPath);
            fs.copyFile(sourcePath, destPath+req.params.filename+'.sf-part'+jsonData[i].segment_no, (err) => {
                if (err) throw err;
              });
        }
    }
    console.log(file_parts);
    splitFile.mergeFiles(file_parts, 'C:/Users/hp/Downloads/storage-dec/'+ssn.uid+'/'+req.params.filename+'/'+req.params.filename)
  .then(() => {
    console.log('Done merging files!');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
    req.flash("success", "Successfully downloaded file " + req.params.filename);
                res.redirect('/profile')
       }
       else
       console.log(error);
     });
     
    });

    

    
    

});

module.exports = router;
