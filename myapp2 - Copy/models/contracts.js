exports.userContractABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_password",
				"type": "string"
			},
			{
				"name": "_ip",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_password",
				"type": "string"
			}
		],
		"name": "loginUser",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "userCount",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

exports.fileContractABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_uid",
				"type": "int256"
			},
			{
				"name": "_filename",
				"type": "string"
			}
		],
		"name": "addFile",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_uid",
				"type": "int256"
			}
		],
		"name": "getFiles",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

exports.trackFileContractABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileid",
				"type": "string"
			},
			{
				"name": "_trackdetails",
				"type": "string"
			}
		],
		"name": "addtracker",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_fileid",
				"type": "string"
			}
		],
		"name": "gettracker",
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
]

exports.userContractAddress="0xA88980761d1D426a6387c75E7DE0b6dc703559ba";
exports.fileContractAddress="0x971b7a0a5B288fBF53209bCE1a4d991fBf5b8157";
exports.trackFileContractAddress="0x82D7Bbf98898364E64E9007E71c66749D4bF6671";