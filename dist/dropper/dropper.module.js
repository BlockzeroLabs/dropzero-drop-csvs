"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropperModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dropper_controller_1 = require("./dropper.controller");
const dropper_service_1 = require("./dropper.service");
const dropper_model_1 = require("./dropper.model");
const dropZeroBlock_model_1 = require("./dropZeroBlock.model");
const user_model_1 = require("../user/user.model");
const csvrecord_model_1 = require("./csvrecord.model");
let DropperModule = class DropperModule {
};
DropperModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Dropper", schema: dropper_model_1.DropperSchema },
                { name: "DropZeroBlock", schema: dropZeroBlock_model_1.DropZeroBlockSchema },
                { name: "User", schema: user_model_1.UserSchema },
                { name: "CsvRecord", schema: csvrecord_model_1.CsvRecordSchema },
            ]),
        ],
        controllers: [dropper_controller_1.DropperController],
        providers: [dropper_service_1.DropperService],
    })
], DropperModule);
exports.DropperModule = DropperModule;
//# sourceMappingURL=dropper.module.js.map