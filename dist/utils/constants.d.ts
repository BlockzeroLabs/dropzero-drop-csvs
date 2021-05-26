export declare const Web3: any;
export declare const constants: {
    FAILED: string;
    SUCCESS: string;
    REGISTERED: string;
    UNAUTHORIZED: string;
    EMAIL_PASSWORD_VALID: string;
    EMAIL_ALREADY_EXIST: string;
    UPDATED: string;
    EXIST: string;
    NOTFOUND: string;
    UPLOAD_DOCUMENTS: string;
    FROM_BLOCK: number;
};
export declare const ETH_TO_DOLLARS = "https://api.coingecko.com/api/v3/simple/price?ids=Ethereum&vs_currencies=Usd";
export declare const web3: any;
export declare const web3Socket: any;
export declare const DROP_CONTRACT_ABI: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];
export declare const CONTRACT_ADDRESS = "0x082046319ad7ddB5993F796FaFE6c0439c8fd5Fe";
