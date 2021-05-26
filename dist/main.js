"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("dotenv/config");
async function bootstrap() {
    const express = require("express");
    const apps = express();
    console.log(__dirname);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    let bodyParser = require("body-parser");
    apps.use(express.static("public"));
    app.use("/download", express.static("./"));
    app.use(bodyParser({ limit: "524288000" }));
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map