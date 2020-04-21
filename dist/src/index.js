"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_notifier_1 = __importDefault(require("update-notifier"));
const package_json_1 = __importDefault(require("../package.json"));
update_notifier_1.default({ pkg: package_json_1.default }).notify();
var command_1 = require("@oclif/command");
exports.run = command_1.run;
