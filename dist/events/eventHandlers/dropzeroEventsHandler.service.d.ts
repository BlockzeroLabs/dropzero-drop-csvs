import { DropperService } from "../../dropper/dropper.service";
import { UserService } from "../../user/user.service";
export declare class EventHandlerService {
    private readonly dropperService;
    private readonly UserService;
    constructor(dropperService: DropperService, UserService: UserService);
    eventHandle(_event: any): Promise<void>;
}
