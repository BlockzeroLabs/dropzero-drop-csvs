"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACT_ADDRESS = exports.DROP_CONTRACT_ABI = exports.web3Socket = exports.web3 = exports.ETH_TO_DOLLARS = exports.constants = exports.Web3 = void 0;
exports.Web3 = require("web3");
exports.constants = {
    FAILED: "Failed",
    SUCCESS: "Success",
    REGISTERED: "Registered Successfully",
    UNAUTHORIZED: "UnAuthorized",
    EMAIL_PASSWORD_VALID: "Incorrect Username or Password",
    EMAIL_ALREADY_EXIST: "Email has already been registered",
    UPDATED: "Updated",
    EXIST: "Category Already Exist",
    NOTFOUND: "Not Found",
    UPLOAD_DOCUMENTS: "Document Uploaded",
    FROM_BLOCK: 8647077,
};
exports.ETH_TO_DOLLARS = "https://api.coingecko.com/api/v3/simple/price?ids=Ethereum&vs_currencies=Usd";
exports.web3 = new exports.Web3(`https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
exports.web3Socket = new exports.Web3();
exports.DROP_CONTRACT_ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_fee",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_feeReceiver",
                type: "address",
            },
            {
                internalType: "address",
                name: "_timelock",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "DropClaimed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "dropAddress",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
        ],
        name: "DropCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startDate",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endDate",
                type: "uint256",
            },
        ],
        name: "DropDataAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "DropPaused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "DropUnpaused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "DropWithdrawn",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "startDate",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "endDate",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
        ],
        name: "addDropData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                internalType: "bytes32[]",
                name: "merkleProof",
                type: "bytes32[]",
            },
        ],
        name: "claimFromDrop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
        ],
        name: "createDrop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "drops",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "fee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "feeReceiver",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "getDropDetails",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "isDropClaimed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "indexes",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
            {
                internalType: "bytes32[]",
                name: "merkleRoots",
                type: "bytes32[]",
            },
            {
                internalType: "bytes32[][]",
                name: "merkleProofs",
                type: "bytes32[][]",
            },
        ],
        name: "multipleClaimsFromDrop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "timelock",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newFee",
                type: "uint256",
            },
        ],
        name: "updateFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newFeeReceiver",
                type: "address",
            },
        ],
        name: "updateFeeReceiver",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
exports.CONTRACT_ADDRESS = "0x082046319ad7ddB5993F796FaFE6c0439c8fd5Fe";
//# sourceMappingURL=constants.js.map