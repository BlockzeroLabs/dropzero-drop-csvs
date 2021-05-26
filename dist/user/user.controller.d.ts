import { UserService } from "./user.service";
import { Request, Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getClaimedRecords(req: Request, res: Response): Promise<void>;
}
