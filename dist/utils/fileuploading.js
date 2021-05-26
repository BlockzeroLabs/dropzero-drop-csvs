"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToGit = exports.movedFilePath = exports.convertJsonToCsv = exports.imageFileFilter = exports.editCsvFileName = exports.editFileName = void 0;
const path_1 = require("path");
const { promisify } = require("util");
const path = require("path");
const { Parser } = require("json2csv");
const json2csvParser = new Parser();
const fs = require("fs");
const simpleGit = require("simple-git");
const git = simpleGit();
const shellJs = require("shelljs");
shellJs.cd("./");
exports.editFileName = (req, file, callback) => {
    try {
        const name = file.originalname.split(".")[0];
        const fileExtName = path_1.extname(file.originalname);
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
        callback(null, `${name}-${randomName}${fileExtName}`);
    }
    catch (error) {
        console.log("error", error);
    }
};
exports.editCsvFileName = (file) => {
    try {
        const name = file;
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
        return randomName;
    }
    catch (error) {
        console.log("error", error);
    }
};
exports.imageFileFilter = (res, file, callback) => {
    try {
        if (!file.originalname.match(/\.(csv)$/)) {
            return callback(new Error("Only csv files are allowed!"), false);
        }
        callback(null, true);
    }
    catch (error) {
        console.log("error==>", error);
    }
};
exports.convertJsonToCsv = (data, token_name, date, id) => {
    try {
        let csv = JSON.parse(data);
        let filename = `${token_name + "(" + date + ")"}` + "_" + exports.editCsvFileName(id);
        console.log("check filename now", filename);
        let refactor_data = csv.map(({ address, amount, status }, index) => ({
            index,
            address,
            amount,
            status,
        }));
        const csv_data = json2csvParser.parse(refactor_data);
        fs.writeFile(`${filename}.csv`, csv_data, "utf8", function (err) {
            if (err) {
                console.log("Some error occured - file either not saved or corrupted file saved.", err);
            }
            else {
                console.log("It's saved!");
            }
        });
        return `${filename}.csv`;
    }
    catch (error) {
        console.log("error==>", error);
    }
};
exports.movedFilePath = async (data, dropName, filePath) => {
    try {
        var x = new Date().toString().split(" ");
        let date = `${x[2] + " " + x[1] + " " + x[3]}`;
        let filename = `${dropName + "(" + date + ")"}` + "_" + exports.editCsvFileName(data);
        console.log("check file==>", filename);
        fs.writeFile(`${filename}.csv`, data, "utf8", function (err) {
            if (err) {
                console.log("Some error occured - file either not saved or corrupted file saved.", err);
            }
            else {
                const currentPath = path.join("./", `${filename}.csv`);
                const newPath = path.join("./", filePath, `${filename}.csv`);
                fs.renameSync(currentPath, newPath);
                console.log("Successfully moved the file!");
                console.log("It's saved!");
                return;
            }
        });
    }
    catch (e) {
        console.log("hey", e);
    }
};
exports.uploadFileToGit = async (csv, dropName) => {
    try {
        await exports.movedFilePath(csv, dropName, "csvrecord");
        setTimeout(() => {
            const gitHubUrl = `https://${"blockzerolab@gmail.com"}:${process.env.password}@github.com/${"blockzerolab"}/${"dropzero-drop-csvs"}`;
            git.addConfig("user.email", "blockzerolab@gmail.com");
            git.addConfig("user.name", "blockzerolab");
            git.addRemote("origin", gitHubUrl);
            git.add("csvrecord").then((addSuccess) => {
                console.log(addSuccess);
            }, (failedAdd) => {
                console.log("adding files failed", failedAdd);
            });
            git.commit("store csv record").then((successCommit) => {
                console.log(successCommit);
            }, (failed) => {
                console.log("failed commmit", failed);
            });
            git.push("origin", "master").then((success) => {
                console.log("repo successfully pushed");
            }, (failed) => {
                console.log("repo push failed", failed);
            });
        }, 2000);
    }
    catch (e) {
        console.log("check error now", e);
    }
};
//# sourceMappingURL=fileuploading.js.map