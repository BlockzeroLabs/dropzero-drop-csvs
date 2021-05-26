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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fileuploading_1 = require("../utils/fileuploading");
const cron = require("node-cron");
let UserService = class UserService {
    constructor(userModel, csvRecordModel) {
        this.userModel = userModel;
        this.csvRecordModel = csvRecordModel;
    }
    async getClaimedRecords(req) {
        try {
            let { wallet_address } = req.body.decodeToken;
            let { history } = req.query;
            let get = [];
            if (history == "true") {
                get = await this.userModel
                    .find({ address: wallet_address.toLowerCase(), claimed: history })
                    .populate({
                    path: "csvId",
                    select: "pauseDrop merkleRoot",
                });
            }
            else {
                get = await this.userModel
                    .find({ address: wallet_address.toLowerCase(), claimed: history })
                    .populate({
                    path: "csvId",
                    select: "pauseDrop merkleRoot",
                    match: { pauseDrop: false },
                });
            }
            if (get.length == 0)
                throw "no record found";
            let filter = get.filter((data) => {
                if (data.csvId != null)
                    return data;
            });
            if (history == "true") {
                return filter;
            }
            else {
                if (filter.length == 0)
                    throw "no claimed found";
                var arr = [];
                for (var key in filter) {
                    let keyId = filter[key].tokenAddress;
                    if (!arr[keyId]) {
                        arr[keyId] = [];
                    }
                    delete filter[key].tokenAddress;
                    arr[keyId].push(filter[key]);
                }
                let myArray = [];
                for (var keyId in arr) {
                    myArray.push({ address: keyId, data: arr[keyId] });
                }
                return myArray;
            }
        }
        catch (e) {
            console.log("check error", e);
            throw e;
        }
    }
    async claimTokens(event, txnHash) {
        try {
            let { index, account, merkleRoot } = event;
            let user = await this.userModel
                .find({
                address: account.toLowerCase(),
                claimed: false,
                index: index,
            })
                .populate({
                path: "csvId",
                match: { merkleRoot: merkleRoot },
                select: "merkleRoot",
            });
            let filter = user.filter((item) => item.csvId != null);
            user = filter[0];
            if (user == null)
                return "no record found";
            let data = await this.csvRecordModel.findOne({
                merkleRoot: merkleRoot,
            });
            let file = JSON.parse(data.csv);
            file = file.map(({ address, amount, proof, index, status }) => ({
                index,
                address,
                amount,
                proof,
                status: address == user.address.toLowerCase() && index == user.index
                    ? "Claimed"
                    : status,
            }));
            await this.csvRecordModel.findByIdAndUpdate(data._id, {
                $set: {
                    csv: JSON.stringify(file),
                },
            });
            await this.userModel.findByIdAndUpdate(user._id, {
                $set: {
                    claimed: true,
                    claimedDate: new Date(),
                    txnHash: `${process.env.TRANSACTION_URL}${txnHash}`,
                },
            });
            return "success";
        }
        catch (error) {
            console.log("check error", error);
        }
        return;
    }
    async addUser(event, txnHash) {
        try {
            let { tokenAddress, merkleRoot } = event;
            let check = await this.csvRecordModel.findOne({
                merkleRoot: merkleRoot,
                tokenAddress: tokenAddress.toLowerCase(),
                status: "pending",
            });
            if (check == null)
                return;
            let record = await this.csvRecordModel.findByIdAndUpdate(check._id, {
                $set: {
                    status: "completed",
                    txnHash: `${process.env.TRANSACTION_URL}${txnHash}`,
                },
            });
            if (record == null)
                return;
            let { csv, dropName } = record;
            let file = JSON.parse(csv);
            for (var key in file) {
                file[key].claimed = false;
                file[key].index = key;
                file[key].startDate = record.startDate;
                file[key].endDate = record.endDate;
                file[key].dropName = dropName;
                file[key].tokenAddress = tokenAddress.toLowerCase();
                file[key].csvId = record._id;
            }
            await this.userModel.insertMany(file);
            await fileuploading_1.uploadFileToGit(file, dropName);
            return;
        }
        catch (e) {
            console.log("check error", e);
            throw e;
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("User")),
    __param(1, mongoose_1.InjectModel("CsvRecord")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map