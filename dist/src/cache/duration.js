"use strict";
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
    Duration.prototype.compareTo = function (other) {
        for (var _i = 0, _a = [
            function (d) { return d.year; },
            function (d) { return d.month; },
            function (d) { return d.day; },
            function (d) { return d.hour; },
            function (d) { return d.minute; },
            function (d) { return d.second; },
        ]; _i < _a.length; _i++) {
            var picker = _a[_i];
            var compared = picker(this).compare(picker(other));
            if (compared !== 0) {
                return compared;
            }
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
