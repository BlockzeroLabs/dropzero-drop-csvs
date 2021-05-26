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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropperService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fileuploading_1 = require("../utils/fileuploading");
const moment = require("moment");
const fs = require("fs");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
let DropperService = class DropperService {
    constructor(dropperModel, csvRecordModel, userModel, dropZeroBlockModel) {
        this.dropperModel = dropperModel;
        this.csvRecordModel = csvRecordModel;
        this.userModel = userModel;
        this.dropZeroBlockModel = dropZeroBlockModel;
        this.expireDropCronJob = async (id, endDate) => {
            var check = moment(endDate, "YYYY/MM/DD");
            var time = moment(endDate);
            var hours = time.format("HH");
            var minutes = time.format("mm");
            var month = check.format("MMMM");
            var monthNumber = Number(check.format("MM")) - 1;
            var year = check.format("YYYY");
            var day = check.format("D");
            let dateCheck = new Date();
            let yearCheck = dateCheck.getFullYear();
            console.log("yeear check", yearCheck, yearCheck == year);
            console.log("date now", check, month, day, hours, minutes, year, monthNumber);
            const date = new Date(year, monthNumber, day, hours, minutes, 30);
            console.log("date now", date);
            const job = schedule.scheduleJob(date, async () => {
                try {
                    console.log("expire drop paused started");
                    let drop = await this.csvRecordModel.findById(id);
                    if (drop == null) {
                        return;
                    }
                    await this.csvRecordModel.findByIdAndUpdate(id, {
                        $set: {
                            expired: true,
                        },
                    });
                    await this.userModel.deleteMany({
                        csvId: id,
                        claimed: false,
                    });
                    this.deleteUsersCronJob(id);
                }
                catch (error) {
                    console.log("check error", error);
                    console.log("task stoped onow1221====>");
                }
            });
            return "success";
        };
        this.withDrawDrop = async ({ merkleRoot }) => {
            let csvRecord = await this.csvRecordModel.findOne({
                merkleRoot: merkleRoot,
                withDraw: false,
            });
            if (csvRecord == null)
                return;
            await this.csvRecordModel.findByIdAndUpdate(csvRecord._id, {
                $set: {
                    withDraw: true,
                },
            });
            await this.userModel.deleteMany({
                csvId: csvRecord._id,
                claimed: false,
            });
            this.deleteUsersCronJob(csvRecord._id);
            return "success";
        };
        this.pauseDrop = async ({ merkleRoot }, blockNumber) => {
            try {
                let latestBlock = await this.dropZeroBlockModel.findOne();
                if (latestBlock.pausedDropBlockNumber >= blockNumber)
                    return;
                let drop = await this.csvRecordModel
                    .findOne({ merkleRoot: merkleRoot })
                    .where({ pauseDrop: false });
                if (drop == null) {
                    return;
                }
                await this.csvRecordModel.findByIdAndUpdate(drop._id, {
                    $set: {
                        pauseDrop: true,
                    },
                });
                await this.dropZeroBlockModel.findOneAndUpdate({
                    $set: {
                        pausedDropBlockNumber: blockNumber,
                    },
                });
            }
            catch (error) {
                console.log("check error", error);
            }
            return "success";
        };
        this.unPauseDrop = async ({ merkleRoot }, blockNumber) => {
            try {
                let latestBlock = await this.dropZeroBlockModel.findOne();
                if (latestBlock.unPausedDropBlockNumber >= blockNumber)
                    return;
                let drop = await this.csvRecordModel
                    .findOne({ merkleRoot: merkleRoot })
                    .where({ pauseDrop: true });
                if (drop == null) {
                    return;
                }
                await this.csvRecordModel.findByIdAndUpdate(drop._id, {
                    $set: {
                        pauseDrop: false,
                    },
                });
                await this.dropZeroBlockModel.findOneAndUpdate({
                    $set: {
                        unPausedDropBlockNumber: blockNumber,
                    },
                });
            }
            catch (error) {
                console.log("check error", error);
            }
            return "success";
        };
    }
    async addDropper(walletAddress, tokenAddress, startDate, endDate, dropName, file, amount, merkleroot) {
        try {
            let payload = {
                walletAddress: walletAddress.toLowerCase(),
            };
            let dropper = await this.dropperModel.findOne({
                walletAddress: walletAddress.toLowerCase(),
            });
            if (dropper == null) {
                dropper = await this.dropperModel.create(payload);
            }
            let csvPayload = {
                status: "pending",
                dropperAddress: dropper._id,
                tokenAddress: tokenAddress.toLowerCase(),
                startDate,
                endDate,
                dropName: dropName,
                uniqueName: dropName.toLowerCase(),
                csv: file,
                totalAmount: amount,
                merkleRoot: merkleroot,
                pauseDrop: false,
                withDraw: false,
                expired: false,
            };
            let addCsv = await this.csvRecordModel.create(csvPayload);
            await this.dropperModel.findByIdAndUpdate(dropper._id, {
                $push: {
                    csv: { record: addCsv._id },
                },
            });
            if (endDate != undefined) {
                await this.expireDropCronJob(addCsv._id, endDate);
            }
            return {
                csvId: addCsv._id,
                dropperId: dropper._id,
            };
        }
        catch (e) {
            console.log("check error", e);
            throw e;
        }
    }
    async deleteUsersCronJob(csvId) {
        let month = moment(new Date())
            .add(1, "month")
            .format("MMM");
        console.log("view ", month);
        const deleteUsers = cron.schedule(`*/5 * * * */${month} *`, async () => {
            try {
                deleteUsers.stop();
                console.log("its cron now");
                await this.userModel.deleteMany({
                    csvId: csvId,
                });
            }
            catch (error) {
                deleteUsers.stop();
                deleteUsers.destroy();
                console.log("check error", error);
                console.log("task stoped onow1221====>");
            }
        }, {
            scheduled: false,
        });
        deleteUsers.start();
    }
    async getDrops(req) {
        try {
            let { wallet_address } = req.body.decodeToken;
            wallet_address = wallet_address.toLowerCase();
            const get = await this.dropperModel
                .findOne({ walletAddress: wallet_address })
                .populate({
                path: "csv.record",
                select: "-csv",
                match: { status: "completed" },
            });
            if (get == null)
                throw "account doesnot exist";
            let file = [];
            for (var key in get.csv) {
                if (get.csv[key].record != null) {
                    file.push(get.csv[key]);
                }
            }
            let array = [];
            for (var key in file) {
                let id = file[key].record._id;
                let users = await this.userModel
                    .find({ csvId: id, claimed: true })
                    .select("amount");
                let totalAmount = 0;
                for (var key1 in users) {
                    totalAmount = Number(totalAmount) + Number(users[key1].amount);
                }
                let data = file[key].record;
                data = Object.assign(Object.assign({}, file[key].record._doc), { totalClaimed: users });
                data.totalClaimed = totalAmount;
                array.push(data);
            }
            return array;
        }
        catch (e) {
            console.log("check error", e);
            throw e;
        }
    }
    async getCsv(req) {
        try {
            let { wallet_address } = req.body.decodeToken;
            let { id } = req.params;
            let { token_name } = req.query;
            const get = await this.csvRecordModel
                .findById(id)
                .populate("dropperAddress", "walletAddress token");
            console.log("view now", get);
            if (get == null)
                throw "record not found";
            if (wallet_address.toLowerCase() !=
                get.dropperAddress.walletAddress.toLowerCase())
                throw "forbidden";
            var x = new Date().toString().split(" ");
            let date = `${x[2] + " " + x[1] + " " + x[3]}`;
            let file = await fileuploading_1.convertJsonToCsv(get.csv, token_name, date, id);
            const cronJob = cron.schedule(`* */10 * * * *`, async () => {
                try {
                    console.log("job started");
                    fs.unlinkSync(file);
                    cronJob.stop();
                }
                catch (error) {
                    console.log("check error", error);
                    cronJob.stop();
                    console.log("task stoped onow1221====>");
                    cronJob.destroy();
                }
            }, {
                scheduled: false,
            });
            cronJob.start();
            return `${process.env.Server_Url}/download/${file}`;
        }
        catch (e) {
            console.log(e == "record not found", e == "record not found");
            if (e == "record not found" || e == "forbidden") {
                throw e;
            }
            else {
                throw "your time exceed for downloading this csv request again to download it";
            }
        }
    }
    async rejectDrop(req) {
        try {
            let { wallet_address } = req.body.decodeToken;
            let { id } = req.params;
            let { merkleRoot } = req.query;
            let csv = await this.csvRecordModel
                .find({ merkleRoot: merkleRoot })
                .populate("dropperAddress", "walletAddress");
            if (wallet_address.toLowerCase() !=
                csv.dropperAddress.walletAddress.toLowerCase())
                throw "forbidden";
            await this.dropperModel.findByIdAndUpdate(id, {
                $pull: {
                    csv: { record: csv._id },
                },
            });
            await this.csvRecordModel.findByIdAndDelete(csv._id);
        }
        catch (e) {
            console.log("check error", e);
            throw e;
        }
    }
    async checkDrop(req) {
        try {
            let { dropName, tokenAddress } = req.body;
            dropName = dropName.toLowerCase();
            tokenAddress = tokenAddress.toLowerCase();
            const get = await this.csvRecordModel.findOne({
                $and: [{ tokenAddress: tokenAddress, uniqueName: dropName }],
            });
            if (get != null)
                throw "DropName already exist";
            return "Success";
        }
        catch (error) {
            console.log("lets check error", error);
            throw error;
        }
    }
    async genToken(req) {
        try {
            let { wallet_address, time_stamp } = req.body;
            const genToken = jwt.sign({ wallet_address: wallet_address, time_stamp: time_stamp }, process.env.SECRET, {
                expiresIn: "1d",
            });
            await this.dropperModel.findOneAndUpdate({
                token: genToken,
            });
            return genToken;
        }
        catch (error) {
            console.log("lets check error", error);
            throw error;
        }
    }
};
DropperService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("Dropper")),
    __param(1, mongoose_1.InjectModel("CsvRecord")),
    __param(2, mongoose_1.InjectModel("User")),
    __param(3, mongoose_1.InjectModel("DropZeroBlock")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _d : Object])
], DropperService);
exports.DropperService = DropperService;
//# sourceMappingURL=dropper.service.js.map