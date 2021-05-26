import { AppService } from "./app.service";
import { Request, Response } from "express";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    merkleRoot(file: any, req: Request, res: Response): Promise<void>;
    generateJwt(req: Request, res: Response): Promise<void>;
    test(req: Request, res: Response): Promise<void>;
}
