import { Model } from "mongoose";
import { Dropper } from "./dropper.model";
import { CsvRecord } from "./csvrecord.model";
import { DropZeroBlock } from "../dropper/dropZeroBlock.model";
import { User } from "../user/user.model";
export declare class DropperService {
    private readonly dropperModel;
    private readonly csvRecordModel;
    private readonly userModel;
    private readonly dropZeroBlockModel;
    constructor(dropperModel: Model<Dropper>, csvRecordModel: Model<CsvRecord>, userModel: Model<User>, dropZeroBlockModel: Model<DropZeroBlock>);
    addDropper(walletAddress: any, tokenAddress: any, startDate: any, endDate: any, dropName: any, file: any, amount: any, merkleroot: any): Promise<{
        csvId: any;
        dropperId: any;
    }>;
    expireDropCronJob: (id: any, endDate: any) => Promise<string>;
    withDrawDrop: ({ merkleRoot }: {
        merkleRoot: any;
    }) => Promise<string>;
    deleteUsersCronJob(csvId: any): Promise<void>;
    getDrops(req: any): Promise<any[]>;
    getCsv(req: any): Promise<string>;
    rejectDrop(req: any): Promise<void>;
    pauseDrop: ({ merkleRoot }: {
        merkleRoot: any;
    }, blockNumber: any) => Promise<string>;
    unPauseDrop: ({ merkleRoot }: {
        merkleRoot: any;
    }, blockNumber: any) => Promise<string>;
    checkDrop(req: any): Promise<string>;
    genToken(req: any): Promise<any>;
}
