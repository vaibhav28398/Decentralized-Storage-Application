var express = require('express');
var router = express.Router();
var fs=require('fs');
const mkdirp = require('mkdirp');
const splitFile = require('split-file');
const web3 = require('web3');
var hash = require('object-hash');
/* GET users listing. */

const jsonRetrievalEth=function(filename,jsonHash,callback){
  web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
    var jsonContract = new web3js.eth.Contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "_fileId",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          }
        ],
        "name": "addFile",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "fileCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_fileId",
            "type": "string"
          }
        ],
        "name": "getFile",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ],'0x4D9e2E52440818e855229BF4A6669b44caB2Ec38');

    web3js.eth.getAccounts().then((acc) => {
      let firstAcc=acc[0];
       console.log(firstAcc);
       jsonContract.methods.getFile('u'+ssn.uid+'f'+filename).call({from:firstAcc},function(error,result){
         if(!error)
         {
           console.log(result);
           if(jsonHash==result)
           {
              callback('Success');
           }
           else
           callback('Fail');
         }
         else
         console.log(error)
       });
      });

}



router.get('/fileDownload/:filename', function(req, res, next) {
  
    let jsonData = JSON.parse(fs.readFileSync('C:/Users/hp/Documents/storage/jsonFiles/'+ssn.uid+'/'+req.params.filename+'.json', 'utf-8'));
    var jsonHash=hash(jsonData);
    jsonRetrievalEth(req.params.filename,jsonHash,(result)=>{
      if(result=='Fail')
      {
        req.flash("success", "Hash was not verified so could not download file");
                res.redirect('/profile')
      }
      else{
        console.log('read json');
    // console.log(jsonData.length+' Peers found');
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
    req.flash("success", "Hash verified Successfully downloaded file " + req.params.filename);
                res.redirect('/profile')
      }
      
    });

    
    

});

module.exports = router;
