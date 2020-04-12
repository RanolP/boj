"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("./chalk");
exports.chalk = __importStar(require("./chalk"));
var Logger = /** @class */ (function () {
    function Logger(group) {
        this.group = group;
    }
    Logger.prototype.log = function (text) {
        if (!text) {
            return;
        }
        console.log(chalk_1.gray("[" + this.group + "] > ") + text);
    };
    Logger.prototype.labeled = function (input, second, third) {
        if (Array.isArray(input)) {
            if (input.length === 0) {
                return {};
            }
            if (Array.isArray(input[0])) {
                return this.labeledColoredObject(Object.fromEntries(input), second);
            }
            else {
                return this.labeledObject(input, second || third);
            }
        }
        return this.labeledColoredObject(Array.isArray(input) && Array.isArray(input[0])
            ? Object.fromEntries(input)
            : input, second);
    };
    Logger.prototype.labeledColoredObject = function (labels, second) {
        return Object.fromEntries(Object.entries(this.labeledObject(Object.keys(labels), typeof second === 'function' ? second : undefined)).map(function (_a) {
            var label = _a[0], colorable = _a[1];
            return [
                label,
                function (text) { return colorable(labels[label], text); },
            ];
        }));
    };
    Logger.prototype.labeledObject = function (labels, second) {
        var _this = this;
        var maxLabelLength = labels
            .concat(second && Array.isArray(second) ? second : [])
            .map(function (it) { return it.toString().length; })
            .concat(typeof second !== 'number' ? [] : [second])
            .reduce(function (l, r) { return Math.max(l, r); }, 0);
        return Object.fromEntries(labels.map(function (label) { return [
            label,
            function (innerFirst, innerSecond) {
                var stylerToApply = (typeof innerFirst !== 'string' ? innerFirst : undefined) ||
                    (typeof second === 'function' ? second : undefined) ||
                    (function () {
                        var param = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            param[_i] = arguments[_i];
                        }
                        return param.join('');
                    });
                _this.log(chalk_1.underline(stylerToApply ? stylerToApply(label) : label) +
                    ' '.repeat(maxLabelLength - label.toString().length + 2) +
                    (innerSecond ||
                        (typeof innerFirst === 'string' ? innerFirst : undefined)));
            },
        ]; }));
    };
    return Logger;
}());
exports.Logger = Logger;
