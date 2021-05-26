export declare class MerkleRootService {
    constructor();
    toFixed: (num: any, decimal: any) => any;
    generateClaimsCsv: (file: any, decimal: any) => Promise<any>;
    generateMerkleRoot: (_csv: any, decimal: any) => Promise<{
        csv_length: any;
        _merkleRoot: string;
        _csv: any;
        jsonFile: string;
        date: string;
    }>;
    removeDuplicateAddress: (file: any, decimal: any) => Promise<any>;
}
