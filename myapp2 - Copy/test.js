const web3 = require('web3');
const express = require('express');

const app = express();

//current provider wala tb likhna jb metamask se krna ho

  //  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
   web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
   console.log('defined hai web3')


web3js.eth.defaultAccount = '0x28607636684D84d4c46b2d340CE7feaf5093Cf02' ;
var CoursetroContract = new web3js.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInstructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInstructor",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
],'0x2EFe77125ABac01E1d3733fBE77A939e10f2E490');
console.log(CoursetroContract);

CoursetroContract.methods.setInstructor("apporv", 18).send({from:'0x28607636684D84d4c46b2d340CE7feaf5093Cf02'});
CoursetroContract.methods.getInstructor().call({ from: '0x28607636684D84d4c46b2d340CE7feaf5093Cf02' },function (error, result) {
  if (!error) {
      console.log(result)
  }
  else {
      console.log(error);
  }

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))