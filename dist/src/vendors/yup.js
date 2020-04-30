"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const util_1 = require("util");
const runValidations_1 = __importDefault(require("yup/lib/util/runValidations"));
exports.MapSchema = function (keySchema, valueSchema) {
    if (!(this instanceof exports.MapSchema)) {
        return new exports.MapSchema(keySchema, valueSchema);
    }
    yup_1.mixed.call(this, { type: 'map' });
    this.key = keySchema || yup_1.string();
    this.value = valueSchema || yup_1.mixed();
    return this;
};
util_1.inherits(exports.MapSchema, yup_1.mixed);
Object.assign(exports.MapSchema.prototype, {
    _typeCheck(value) {
        return value && typeof value === 'object';
    },
    _cast(_value, options) {
        if (!_value) {
            return _value;
        }
        const value = yup_1.mixed.prototype._cast.call(this, _value, options);
        const result = {};
        Object.entries(value).forEach(([key, aValue]) => {
            result[this.key.cast(key)] = this.value.cast(aValue);
        });
        return result;
    },
    _validate(_value, options = {}) {
        const errors = [];
        const { abortEarly, sync, path = '' } = options;
        let originalValue = options.originalValue != null ? options.originalValue : _value;
        let promise = yup_1.mixed.prototype._validate.call(this, _value, options);
        if (!abortEarly)
            promise = promise.catch((err) => {
                errors.push(err);
                return err.value;
            });
        return promise.then((value) => {
            if (!this._typeCheck(value)) {
                if (errors.length)
                    throw errors[0];
                return value;
            }
            originalValue = originalValue || value;
            const validations = [];
            Object.entries(value).forEach(([field, fieldValue]) => {
                const innerOptions = Object.assign(Object.assign({}, options), { strict: true, parent: value, path: path ? `${path}.${field}` : field, originalValue: originalValue[field] });
                validations.push(this.key.validate(field, innerOptions), this.value.validate(fieldValue, innerOptions));
            });
            return runValidations_1.default({
                sync,
                path,
                value,
                errors,
                validations,
                endEarly: abortEarly,
            });
        });
    },
});
