"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require("mongoose-timestamp");
exports.UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    index: Number,
    amount: {
        type: Number,
        required: true,
    },
    startDate: Date,
    claimedDate: Date,
    dropName: String,
    endDate: Date,
    tokenAddress: String,
    txnHash: String,
    proof: {
        type: [String],
        required: true,
    },
    csvId: {
        type: Schema.Types.ObjectId,
        ref: "CsvRecord",
        require: false,
    },
    claimed: Boolean,
});
exports.UserSchema.plugin(timestamps);
//# sourceMappingURL=user.model.js.map