"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const inquirer_autocomplete_prompt_1 = __importDefault(require("inquirer-autocomplete-prompt"));
const inquirer_checkbox_plus_prompt_1 = __importDefault(require("inquirer-checkbox-plus-prompt"));
var inquirer_2 = require("inquirer");
exports.prompt = inquirer_2.prompt;
inquirer_1.registerPrompt('autocomplete', inquirer_autocomplete_prompt_1.default);
inquirer_1.registerPrompt('checkbox-plus', inquirer_checkbox_plus_prompt_1.default);
