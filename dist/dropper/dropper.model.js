"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropperSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var timestamps = require("mongoose-timestamp");
exports.DropperSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
    },
    csv: [
        {
            record: {
                type: Schema.Types.ObjectId,
                ref: "CsvRecord",
                require: false,
            },
        },
    ],
});
exports.DropperSchema.plugin(timestamps);
//# sourceMappingURL=dropper.model.js.map