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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_2 = require("../utils/constants");
const dropzeroEventsHandler_service_1 = require("./eventHandlers/dropzeroEventsHandler.service");
const dropZeroContract = new constants_1.web3Socket.eth.Contract(constants_2.DROP_CONTRACT_ABI, constants_2.CONTRACT_ADDRESS);
let EventService = class EventService {
    constructor(eventHandlerService, dropZeroBlockModel) {
        this.eventHandlerService = eventHandlerService;
        this.dropZeroBlockModel = dropZeroBlockModel;
        this.InitialzedWeb3Socket();
        this.syncGraph();
    }
    async InitialzedWeb3Socket() {
        this.refreshProvider(constants_1.web3Socket, `wss://rinkeby.infura.io/ws/v3/88886c15abf644e08e42898d6736fec1`);
    }
    async refreshProvider(web3Obj, providerUrl) {
        let retries = 0;
        function retry(event) {
            if (event) {
                console.log("Web3 provider disconnected or errored.", " -> Timestamp -> ", Date().toString());
                retries += 1;
                if (retries > 5) {
                    console.log(`Max retries of 5 exceeding: ${retries} times tried`, " -> Timestamp -> ", Date().toString());
                    return setTimeout(this.refreshProvider, 5000);
                }
            }
            else {
                this.refreshProvider(web3Obj, providerUrl);
            }
            return null;
        }
        const provider = new constants_1.web3Socket.providers.WebsocketProvider(providerUrl, {
            timeout: 30000,
            clientConfig: {
                maxReceivedFrameSize: 100000000,
                maxReceivedMessageSize: 100000000,
                keepalive: true,
                keepaliveInterval: 60000,
            },
            reconnect: {
                auto: true,
                delay: 5000,
                maxAttempts: 10,
                onTimeout: false,
            },
        });
        provider.on("end", retry);
        provider.on("error", retry);
        web3Obj.setProvider(provider);
        console.log("New Web3 provider initiated", " -> Timestamp -> ", Date().toString());
        return provider;
    }
    async subscribeToContractEvents(block, contract, _contractAddress) {
        try {
            return contract.events
                .allEvents({
                fromBlock: block,
            })
                .on("data", (_event) => {
                try {
                    this.eventHandlerService.eventHandle(_event);
                }
                catch (e) {
                    console.log("check error", e);
                }
            })
                .on("error", (e) => {
                console.log("check error", e);
            });
        }
        catch (e) {
            console.log("check error", e);
        }
    }
    async syncGraph() {
        try {
            let _currentBlockNumber = await constants_1.web3Socket.eth.getBlockNumber();
            let check = await this.dropZeroBlockModel.findOneAndUpdate({
                currentBlockNumber: _currentBlockNumber,
            });
            if (check == null) {
                await this.dropZeroBlockModel.create({
                    currentBlockNumber: _currentBlockNumber,
                });
            }
            console.log("_current block number", _currentBlockNumber);
            await this.subscribeToContractEvents(constants_2.constants.FROM_BLOCK, dropZeroContract, constants_2.CONTRACT_ADDRESS);
        }
        catch (error) {
            console.log("check error now", error);
            throw error;
        }
    }
};
EventService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel("DropZeroBlock")),
    __metadata("design:paramtypes", [dropzeroEventsHandler_service_1.EventHandlerService, typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=index.service.js.map