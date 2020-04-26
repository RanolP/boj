"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pirim_1 = require("./pirim");
const math_1 = require("./math");
const dot_1 = require("./dot");
const __1 = require("..");
exports.AnyRuleset = __1.classifyRules([pirim_1.PirimRule, math_1.MathRule, dot_1.DotRule]);
