"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropZeroBlockSchema = void 0;
const mongoose = require("mongoose");
var timestamps = require("mongoose-timestamp");
exports.DropZeroBlockSchema = new mongoose.Schema({
    currentBlockNumber: Number,
    pausedDropBlockNumber: Number,
    unPausedDropBlockNumber: Number,
});
exports.DropZeroBlockSchema.plugin(timestamps);
//# sourceMappingURL=dropZeroBlock.model.js.map