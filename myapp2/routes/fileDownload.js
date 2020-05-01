var express = require('express');
var router = express.Router();
var fs=require('fs');
const mkdirp = require('mkdirp');
const splitFile = require('split-file');
/* GET users listing. */
router.get('/fileDownload/:filename', function(req, res, next) {
  
    let jsonData = JSON.parse(fs.readFileSync('C:/Users/hp/Documents/storage/jsonFiles/'+ssn.uid+'/'+req.params.filename+'.json', 'utf-8'));
    console.log('read json');
    console.log(jsonData.length+' Peers found');
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
    req.flash("success", "Successfully downlaoded file " + req.params.filename);
                res.redirect('/profile')
    

});

module.exports = router;
