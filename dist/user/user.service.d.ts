import { Model } from "mongoose";
import { CsvRecord } from "../dropper/csvrecord.model";
import { User } from "./user.model";
export declare class UserService {
    private readonly userModel;
    private readonly csvRecordModel;
    constructor(userModel: Model<User>, csvRecordModel: Model<CsvRecord>);
    getClaimedRecords(req: any): Promise<any[]>;
    claimTokens(event: any, txnHash: any): Promise<"no record found" | "success">;
    addUser(event: any, txnHash: any): Promise<void>;
}
