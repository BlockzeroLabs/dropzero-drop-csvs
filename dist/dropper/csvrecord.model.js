"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvRecordSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require("mongoose-timestamp");
exports.CsvRecordSchema = new mongoose.Schema({
    dropperAddress: {
        type: Schema.Types.ObjectId,
        ref: "Dropper",
        require: false,
    },
    tokenAddress: String,
    pauseDrop: Boolean,
    fileName: String,
    totalAmount: Number,
    uniqueName: String,
    txnHash: String,
    dropName: {
        type: String,
        required: true,
    },
    status: String,
    withDraw: Boolean,
    startDate: Date,
    expired: Boolean,
    endDate: Date,
    merkleRoot: String,
    csv: String,
});
exports.CsvRecordSchema.plugin(timestamps);
//# sourceMappingURL=csvrecord.model.js.map