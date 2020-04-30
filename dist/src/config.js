"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const better_fs_1 = require("./lib/better-fs");
const path_1 = require("path");
const yup = __importStar(require("yup"));
const yup_1 = require("./vendors/yup");
const id_1 = require("./lib/language/id");
const validator = yup.object({
    browser: yup
        .string()
        .required()
        .oneOf(['firefox', 'chromium', 'webkit']),
    runtimeOverrides: new yup_1.MapSchema(yup.string().oneOf(Object.values(id_1.LanguageId)), yup.object({
        compile: yup.array(yup.string()).ensure().notRequired(),
        execute: yup.array(yup.string()).ensure().notRequired(),
    })),
});
async function getConfig(printError) {
    const configPath = path_1.join(constants_1.ROOT, 'boj.config.json');
    if (await better_fs_1.notExists(configPath)) {
        if (printError) {
            printError('Config file does not exists, have you created `boj.config.json`?');
        }
        return null;
    }
    const content = await better_fs_1.readFile(configPath, { encoding: 'utf-8' });
    let jsonContent;
    try {
        jsonContent = JSON.parse(content);
    }
    catch (e) {
        if (printError) {
            printError('Config file is not valid json format: ' + e.message);
        }
        return null;
    }
    try {
        return await validator.validate(jsonContent);
    }
    catch (e) {
        if (printError) {
            printError(e.message + ' in a config file.');
        }
        return null;
    }
}
exports.getConfig = getConfig;
