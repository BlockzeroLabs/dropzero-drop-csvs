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
exports.EventHandlerService = void 0;
const common_1 = require("@nestjs/common");
const dropper_service_1 = require("../../dropper/dropper.service");
const user_service_1 = require("../../user/user.service");
let EventHandlerService = class EventHandlerService {
    constructor(dropperService, UserService) {
        this.dropperService = dropperService;
        this.UserService = UserService;
    }
    async eventHandle(_event) {
        try {
            const { event, returnValues, transactionHash, blockNumber } = _event;
            switch (event) {
                case "DropDataAdded":
                    await this.UserService.addUser(returnValues, transactionHash);
                    break;
                case "DropClaimed":
                    await this.UserService.claimTokens(returnValues, transactionHash);
                    break;
                case "DropWithdrawn":
                    await this.dropperService.withDrawDrop(returnValues);
                    break;
                case "DropPaused":
                    await this.dropperService.pauseDrop(returnValues, blockNumber);
                    break;
                case "DropUnpaused":
                    await this.dropperService.unPauseDrop(returnValues, blockNumber);
                    break;
                default:
            }
        }
        catch (error) {
            console.log("check error now", error);
            throw error;
        }
    }
};
EventHandlerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [dropper_service_1.DropperService,
        user_service_1.UserService])
], EventHandlerService);
exports.EventHandlerService = EventHandlerService;
//# sourceMappingURL=dropzeroEventsHandler.service.js.map