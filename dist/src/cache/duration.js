"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var DurationType;
(function (DurationType) {
    DurationType[DurationType["Second"] = 1] = "Second";
    DurationType[DurationType["Minute"] = 2] = "Minute";
    DurationType[DurationType["Hour"] = 3] = "Hour";
    DurationType[DurationType["Day"] = 4] = "Day";
    DurationType[DurationType["Month"] = 5] = "Month";
    DurationType[DurationType["Year"] = 6] = "Year";
})(DurationType = exports.DurationType || (exports.DurationType = {}));
var DurationPart = /** @class */ (function () {
    function DurationPart(type, value) {
        this.type = type;
        this.value = value;
    }
    DurationPart.prototype.compare = function (other) {
        return this.value - other.value;
    };
    return DurationPart;
}());
exports.DurationPart = DurationPart;
var Duration = /** @class */ (function () {
    function Duration(year, month, day, hour, minute, second) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    Duration.prototype.normalize = function () {
        var year = this.year.value;
        var month = this.month.value;
        var day = this.day.value;
        var hour = this.hour.value;
        var minute = this.minute.value;
        var second = this.second.value;
        while (second < 0) {
            minute -= 1;
            second += 60;
        }
        while (minute < 0) {
            hour -= 1;
            minute += 60;
        }
        while (hour < 0) {
            day -= 1;
            hour += 24;
        }
        while (day < 0) {
            month -= 1;
            day += 30;
        }
        while (month < 0) {
            year -= 1;
            month += 12;
        }
        return Duration.of({ year: year, month: month, day: day, hour: hour, minute: minute, second: second });
    };
    Duration.prototype.compareTo = function (other, useAbsoluteDate) {
        var e_1, _a;
        var pick = function (key) { return function (d) { return (useAbsoluteDate ? d : d.normalize())[key]; }; };
        try {
            for (var _b = __values([
                pick('year'),
                pick('month'),
                pick('day'),
                pick('hour'),
                pick('minute'),
                pick('second'),
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var picker = _c.value;
                var compared = picker(this).compare(picker(other));
                if (compared !== 0) {
                    return compared;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return 0;
    };
    Duration.prototype.toString = function () {
        return this.year.value + "-" + this.month.value + "-" + this.day.value + " " + this.hour.value + ":" + this.minute.value + ":" + this.second.value;
    };
    Duration.of = function (_a) {
        var _b = _a.year, year = _b === void 0 ? 0 : _b, _c = _a.month, month = _c === void 0 ? 0 : _c, _d = _a.day, day = _d === void 0 ? 0 : _d, _e = _a.hour, hour = _e === void 0 ? 0 : _e, _f = _a.minute, minute = _f === void 0 ? 0 : _f, _g = _a.second, second = _g === void 0 ? 0 : _g;
        return new Duration(new DurationPart(DurationType.Year, year), new DurationPart(DurationType.Month, month), new DurationPart(DurationType.Day, day), new DurationPart(DurationType.Hour, hour), new DurationPart(DurationType.Minute, minute), new DurationPart(DurationType.Second, second));
    };
    Duration.fromDateRange = function (from, to) {
        return new Duration(new DurationPart(DurationType.Year, to.getFullYear() - from.getFullYear()), new DurationPart(DurationType.Month, to.getMonth() - from.getMonth()), new DurationPart(DurationType.Day, to.getDate() - from.getDate()), new DurationPart(DurationType.Hour, to.getHours() - from.getHours()), new DurationPart(DurationType.Minute, to.getMinutes() - from.getMinutes()), new DurationPart(DurationType.Second, to.getSeconds() - from.getSeconds()));
    };
    return Duration;
}());
exports.Duration = Duration;
