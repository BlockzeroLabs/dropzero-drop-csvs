import { Model } from "mongoose";
import { EventHandlerService } from "./eventHandlers/dropzeroEventsHandler.service";
import { DropZeroBlock } from "../dropper/dropZeroBlock.model";
export declare class EventService {
    private readonly eventHandlerService;
    private readonly dropZeroBlockModel;
    constructor(eventHandlerService: EventHandlerService, dropZeroBlockModel: Model<DropZeroBlock>);
    InitialzedWeb3Socket(): Promise<void>;
    refreshProvider(web3Obj: any, providerUrl: any): Promise<any>;
    subscribeToContractEvents(block: any, contract: any, _contractAddress: any): Promise<any>;
    syncGraph(): Promise<void>;
}
