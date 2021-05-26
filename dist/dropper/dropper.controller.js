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
exports.DropperController = void 0;
const common_1 = require("@nestjs/common");
const dropper_service_1 = require("./dropper.service");
const constants_1 = require("../utils/constants");
let DropperController = class DropperController {
    constructor(dropperService) {
        this.dropperService = dropperService;
    }
    async getDrops(req, res) {
        try {
            const result = await this.dropperService.getDrops(req);
            res.status(200).send({
                responseCode: 201,
                responseMessage: constants_1.constants.SUCCESS,
                result: result,
            });
        }
        catch (error) {
            res.status(400).send({
                responseCode: 400,
                responseMessage: constants_1.constants.FAILED,
                result: error,
            });
        }
    }
    async getCsv(req, res) {
        try {
            const result = await this.dropperService.getCsv(req);
            res.status(200).send({
                responseCode: 201,
                responseMessage: constants_1.constants.SUCCESS,
                result: result,
            });
        }
        catch (error) {
            res.status(400).send({
                responseCode: 400,
                responseMessage: constants_1.constants.FAILED,
                result: error,
            });
        }
    }
    async rejectDrop(req, res) {
        try {
            const result = await this.dropperService.rejectDrop(req);
            res.status(200).send({
                responseCode: 201,
                responseMessage: constants_1.constants.SUCCESS,
                result: result,
            });
        }
        catch (error) {
            res.status(400).send({
                responseCode: 400,
                responseMessage: constants_1.constants.FAILED,
                result: error,
            });
        }
    }
    async checkDrop(req, res) {
        try {
            const result = await this.dropperService.checkDrop(req);
            res.status(200).send({
                responseCode: 201,
                responseMessage: constants_1.constants.SUCCESS,
                result: result,
            });
        }
        catch (error) {
            res.status(400).send({
                responseCode: 400,
                responseMessage: constants_1.constants.FAILED,
                result: error,
            });
        }
    }
};
__decorate([
    common_1.Get("/get_drops"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DropperController.prototype, "getDrops", null);
__decorate([
    common_1.Get("/get_csv/:id"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DropperController.prototype, "getCsv", null);
__decorate([
    common_1.Get("/reject_drop/:id"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DropperController.prototype, "rejectDrop", null);
__decorate([
    common_1.Post("/check_drop"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DropperController.prototype, "checkDrop", null);
DropperController = __decorate([
    common_1.Controller("dropper"),
    __metadata("design:paramtypes", [dropper_service_1.DropperService])
], DropperController);
exports.DropperController = DropperController;
//# sourceMappingURL=dropper.controller.js.map