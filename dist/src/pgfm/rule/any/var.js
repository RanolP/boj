"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
exports.VarRule = {
    name: 'var',
    type: 'any',
    isBlock: false,
    schema: yup.string().required(),
    execute(name) {
        return `<i class="variable">${name}</i>`;
    },
};
