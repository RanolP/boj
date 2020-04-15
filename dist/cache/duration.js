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
class DurationPart {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    compare(other) {
        return this.value - other.value;
    }
}
exports.DurationPart = DurationPart;
class Duration {
    constructor(year, month, day, hour, minute, second) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    normalize() {
        let year = this.year.value;
        let month = this.month.value;
        let day = this.day.value;
        let hour = this.hour.value;
        let minute = this.minute.value;
        let second = this.second.value;
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
        return Duration.of({ year, month, day, hour, minute, second });
    }
    compareTo(other, useAbsoluteDate) {
        const pick = (key) => (d) => (useAbsoluteDate ? d : d.normalize())[key];
        for (const picker of [
            pick('year'),
            pick('month'),
            pick('day'),
            pick('hour'),
            pick('minute'),
            pick('second'),
        ]) {
            const compared = picker(this).compare(picker(other));
            if (compared !== 0) {
                return compared;
            }
        }
        return 0;
    }
    toString() {
        return `${this.year.value}-${this.month.value}-${this.day.value} ${this.hour.value}:${this.minute.value}:${this.second.value}`;
    }
    static of({ year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0, }) {
        return new Duration(new DurationPart(DurationType.Year, year), new DurationPart(DurationType.Month, month), new DurationPart(DurationType.Day, day), new DurationPart(DurationType.Hour, hour), new DurationPart(DurationType.Minute, minute), new DurationPart(DurationType.Second, second));
    }
    static fromDateRange(from, to) {
        return new Duration(new DurationPart(DurationType.Year, to.getFullYear() - from.getFullYear()), new DurationPart(DurationType.Month, to.getMonth() - from.getMonth()), new DurationPart(DurationType.Day, to.getDate() - from.getDate()), new DurationPart(DurationType.Hour, to.getHours() - from.getHours()), new DurationPart(DurationType.Minute, to.getMinutes() - from.getMinutes()), new DurationPart(DurationType.Second, to.getSeconds() - from.getSeconds()));
    }
}
exports.Duration = Duration;
