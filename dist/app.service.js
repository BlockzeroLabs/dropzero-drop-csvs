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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const merkleroot_service_1 = require("./merkleroot/merkleroot.service");
const dropper_service_1 = require("./dropper/dropper.service");
const fileuploading_1 = require("./utils/fileuploading");
let AppService = class AppService {
    constructor(merkleRootService, dropperService) {
        this.merkleRootService = merkleRootService;
        this.dropperService = dropperService;
    }
    async merkleRoot(req) {
        try {
            let { file, walletAddress, tokenAddress, startDate, endDate, dropName, decimal, totalAmount, } = req.body;
            let csvfile = await this.merkleRootService.generateClaimsCsv(file, decimal);
            const refactorFile = await this.merkleRootService.removeDuplicateAddress(csvfile, decimal);
            let result = await this.merkleRootService.generateMerkleRoot(refactorFile, decimal);
            const response = await this.dropperService.addDropper(walletAddress, tokenAddress, startDate, endDate, dropName, result.jsonFile, totalAmount, result._merkleRoot);
            let data = Object.assign(Object.assign({}, result), { dropper_id: response.dropperId });
            return data;
        }
        catch (e) {
            console.log("view error", e);
            throw e;
        }
    }
    async generateJwt(req) {
        try {
            const token = await this.dropperService.genToken(req);
            return token;
        }
        catch (error) {
            console.log("check error now", error);
            throw error;
        }
    }
    async test() {
        try {
            let csv = "hellox";
            let dropName = "ok";
            const token = await fileuploading_1.uploadFileToGit(csv, dropName);
            return token;
        }
        catch (error) {
            console.log("check error now", error);
            throw error;
        }
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [merkleroot_service_1.MerkleRootService,
        dropper_service_1.DropperService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map