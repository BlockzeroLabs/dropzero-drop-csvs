import { DropperService } from "./dropper.service";
import { Request, Response } from "express";
export declare class DropperController {
    private readonly dropperService;
    constructor(dropperService: DropperService);
    getDrops(req: Request, res: Response): Promise<void>;
    getCsv(req: Request, res: Response): Promise<void>;
    rejectDrop(req: Request, res: Response): Promise<void>;
    checkDrop(req: Request, res: Response): Promise<void>;
}
