var fs = require('fs');
const splitFile = require('split-file');
const mkdirp = require('mkdirp');


    var anames=[                                                    'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part02',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part03',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part04',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part05',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part06',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part07',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part08',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part09',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part10',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part11',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part12',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part13',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part14',                                                   'c:\\Users\\hp\\Documents\\GitHub\\Decentralized-Storage-Application\\myapp2../../../../storage/about.jpg.sf-part15']
    splitFile.mergeFiles(anames, __dirname + '/a1.jpg')
  .then(() => {
    console.log('Done!');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
  