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
exports.MerkleRootService = void 0;
const common_1 = require("@nestjs/common");
const balance_tree_1 = require("../utils/MerkleTree/balance-tree");
require("dotenv").config();
const csv = require("csvtojson");
const fs = require("fs");
let MerkleRootService = class MerkleRootService {
    constructor() {
        this.toFixed = (num, decimal) => {
            var re = new RegExp("^-?\\d+(?:.\\d{0," + decimal + "})?");
            return num.toString().match(re)[0];
        };
        this.generateClaimsCsv = async (file, decimal) => {
            try {
                let _csv = await csv().fromFile(`uploads/${file}`);
                const path = `uploads/${file}`;
                fs.unlinkSync(path);
                _csv = _csv.map(({ address, amount }) => ({
                    address: address.toLowerCase(),
                    amount: this.toFixed(amount, decimal),
                }));
                return _csv;
            }
            catch (error) {
                console.log("check error now", error);
                throw error;
            }
        };
        this.generateMerkleRoot = async (_csv, decimal) => {
            try {
                let date = new Date();
                _csv.push({
                    address: "0x0000000000000000000000000000000000000000",
                    amount: date.getTime().toString(),
                });
                const _balanceTree = new balance_tree_1.default(_csv, decimal);
                const _merkleRoot = _balanceTree.getHexRoot();
                _csv.pop();
                _csv = _csv.map(({ address, amount }, index) => ({
                    index,
                    address,
                    amount,
                    proof: _balanceTree.getProof(index, address, amount),
                    status: "Not claimed",
                }));
                let csv_length = _csv.length;
                let jsonFile = JSON.stringify(_csv.map(({ address, amount }, index) => ({
                    index,
                    address,
                    amount,
                    proof: _balanceTree.getProof(index, address, amount),
                    status: "Not claimed",
                })));
                return {
                    csv_length,
                    _merkleRoot,
                    _csv,
                    jsonFile,
                    date: date.getTime().toString(),
                };
            }
            catch (error) {
                console.log("hey csv 123", error);
                throw error;
            }
        };
        this.removeDuplicateAddress = async (file, decimal) => {
            try {
                let duplicateIds = file
                    .map((e) => e["address"])
                    .map((e, i, final) => final.indexOf(e) !== i && i)
                    .filter((obj) => file[obj])
                    .map((e) => file[e]);
                let unique = file
                    .map((e) => e["address"])
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    .filter((obj) => file[obj])
                    .map((e) => file[e]);
                for (var key in duplicateIds) {
                    unique.filter((item) => {
                        if (item.address == duplicateIds[key].address) {
                            item.amount = (Number(item.amount) + Number(duplicateIds[key].amount)).toString();
                        }
                    });
                }
                unique = unique.map(({ address, amount }) => ({
                    address: address.toLowerCase(),
                    amount: this.toFixed(amount, decimal),
                }));
                return unique;
            }
            catch (e) {
                console.log("cathed error in duplicateAddresses", e);
                throw e;
            }
        };
    }
};
MerkleRootService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MerkleRootService);
exports.MerkleRootService = MerkleRootService;
//# sourceMappingURL=merkleroot.service.js.map