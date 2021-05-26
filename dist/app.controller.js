"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const fileuploading_1 = require("./utils/fileuploading");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async merkleRoot(file, req, res) {
        try {
            req.body.file = file.filename;
            const result = await this.appService.merkleRoot(req);
            let payload = {
                amount: result.amount,
                csv_length: result.csv_length,
                merkle_root: result._merkleRoot,
                dropper_id: result.dropper_id,
                date: result.date,
            };
            res.status(200).send({
                responseCode: 200,
                responseMessage: "success",
                result: payload,
            });
        }
        catch (error) {
            console.log("error ", error);
            res.status(400).send({
                responseCode: 400,
                responseMessage: error,
                result: error,
            });
        }
    }
    async generateJwt(req, res) {
        try {
            const result = await this.appService.generateJwt(req);
            res.status(200).send({
                responseCode: 200,
                responseMessage: "success",
                result: result,
            });
        }
        catch (error) {
            console.log("error ", error);
            res.status(400).send({
                responseCode: 400,
                responseMessage: error,
                result: error,
            });
        }
    }
    async test(req, res) {
        try {
            const result = await this.appService.test();
            res.status(200).send({
                responseCode: 200,
                responseMessage: "success",
                result: result,
            });
        }
        catch (error) {
            console.log("error ", error);
            res.status(400).send({
                responseCode: 400,
                responseMessage: error,
                result: error,
            });
        }
    }
};
__decorate([
    common_1.Post("/merkle_root"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("file", {
        storage: multer_1.diskStorage({
            destination: "./uploads",
            filename: fileuploading_1.editFileName,
        }),
        fileFilter: fileuploading_1.imageFileFilter,
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "merkleRoot", null);
__decorate([
    common_1.Post("/auth"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generateJwt", null);
__decorate([
    common_1.Get("/test"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "test", null);
AppController = __decorate([
    common_1.Controller("/upload_csv"),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map