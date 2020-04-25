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
exports.MathRule = {
    name: 'math',
    type: 'any',
    isBlock: false,
    schema: yup.string().required(),
    async execute(formula) {
        return `![${formula}](https://render.githubusercontent.com/render/math?math=${encodeURIComponent(formula)})`;
    },
};
