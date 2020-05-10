"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
class Chart {
    constructor() {
        this._wholeData = [];
    }
    add(data) {
        this._wholeData.push(data);
    }
    /**
     * Get shallow-copied whole data the chart containing
     */
    get wholeData() {
        return [...this._wholeData];
    }
}
exports.Chart = Chart;
__export(require("./pie"));
