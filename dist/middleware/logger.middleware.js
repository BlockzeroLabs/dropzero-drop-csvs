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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
require("dotenv/config");
let LoggerMiddleware = class LoggerMiddleware {
    constructor() { }
    async use(req, res, next) {
        try {
            const header = req.headers["authorization"];
            if (header == undefined)
                throw "forbidden";
            if (typeof header !== "undefined") {
                const bearer = header.split(" ");
                const token = bearer[1];
                let decode = jwt.verify(token, process.env.SECRET);
                req.body.decodeToken = decode;
                req.body.token = token;
            }
            next();
        }
        catch (e) {
            console.log("error 123", e);
            res.status(403).send({
                responseCode: 403,
                responseMessage: "Forbidden",
                result: "Session Expired",
            });
        }
    }
};
LoggerMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map