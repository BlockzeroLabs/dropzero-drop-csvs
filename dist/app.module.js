"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const logger_middleware_1 = require("./middleware/logger.middleware");
const dropper_service_1 = require("./dropper/dropper.service");
const user_service_1 = require("./user/user.service");
const dropzeroEventsHandler_service_1 = require("./events/eventHandlers/dropzeroEventsHandler.service");
const merkleroot_service_1 = require("./merkleroot/merkleroot.service");
const dropper_module_1 = require("./dropper/dropper.module");
const csvrecord_model_1 = require("./dropper/csvrecord.model");
const dropZeroBlock_model_1 = require("./dropper/dropZeroBlock.model");
const dropper_model_1 = require("./dropper/dropper.model");
const platform_express_1 = require("@nestjs/platform-express");
const user_module_1 = require("./user/user.module");
const user_model_1 = require("./user/user.model");
const index_service_1 = require("./events/index.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: "dropper/get_drops", method: common_1.RequestMethod.GET }, { path: "dropper/get_csv/:id", method: common_1.RequestMethod.GET }, { path: "dropper/pause_drop/:id", method: common_1.RequestMethod.GET }, { path: "dropper/reject_drop/:id", method: common_1.RequestMethod.GET }, { path: "dropper/withdraw_drop/:id", method: common_1.RequestMethod.GET }, { path: "dropper/etherscan_link", method: common_1.RequestMethod.POST }, { path: "user/claimed_tokens", method: common_1.RequestMethod.GET }, { path: "user/withdraw_claimed_token/:id", method: common_1.RequestMethod.POST });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.register({
                dest: "./uploads",
            }),
            user_module_1.UserModule,
            dropper_module_1.DropperModule,
            mongoose_1.MongooseModule.forRoot(process.env.CONNECTION_STRING, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: "Dropper", schema: dropper_model_1.DropperSchema },
                { name: "User", schema: user_model_1.UserSchema },
                { name: "CsvRecord", schema: csvrecord_model_1.CsvRecordSchema },
                { name: "DropZeroBlock", schema: dropZeroBlock_model_1.DropZeroBlockSchema },
            ]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            index_service_1.EventService,
            merkleroot_service_1.MerkleRootService,
            dropzeroEventsHandler_service_1.EventHandlerService,
            dropper_service_1.DropperService,
            user_service_1.UserService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map