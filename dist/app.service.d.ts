import { MerkleRootService } from "./merkleroot/merkleroot.service";
import { DropperService } from "./dropper/dropper.service";
export declare class AppService {
    private readonly merkleRootService;
    private readonly dropperService;
    constructor(merkleRootService: MerkleRootService, dropperService: DropperService);
    merkleRoot(req: any): Promise<{
        dropper_id: any;
        csv_length: any;
        _merkleRoot: string;
        _csv: any;
        jsonFile: string;
        date: string;
    }>;
    generateJwt(req: any): Promise<any>;
    test(): Promise<void>;
}
