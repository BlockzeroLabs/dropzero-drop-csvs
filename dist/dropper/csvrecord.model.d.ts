export declare const CsvRecordSchema: any;
export interface CsvRecord {
    dropperAddress: {};
    dropName: String;
    pauseDrop: Boolean;
    tokenAddress: String;
    txnHash: String;
    uniqueName: String;
    fileName: String;
    totalAmount: Number;
    startDate: Date;
    expired: Boolean;
    withDraw: Boolean;
    endDate: Date;
    status: String;
    merkleRoot: String;
    csv: String;
}
