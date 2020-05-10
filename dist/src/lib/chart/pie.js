"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const dedent_1 = __importDefault(require("dedent"));
function evaluatePosition(percent) {
    return [
        Math.cos(2 * Math.PI * percent) + 1,
        Math.sin(2 * Math.PI * percent) + 1,
    ];
}
class PieChart extends _1.Chart {
    render() {
        const data = this.wholeData
            .filter((it) => it.value != 0)
            .sort((a, b) => b.value - a.value);
        const sum = data.reduce((a, b) => a + b.value, 0);
        const xMap = [0];
        for (let i = 0; i < data.length / 10; i++) {
            const sliced = data.slice(i * 10, i * 10 + 10);
            xMap.push(xMap[xMap.length - 1] +
                sliced.reduce((a, b) => Math.max(a, b.label.length * 0.054), 0));
        }
        return dedent_1.default `
      <svg viewBox="0 0 4 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        ${data
            .reduce(([lastValue, str], curr) => {
            const [startX, startY] = evaluatePosition(lastValue / sum);
            const [endX, endY] = evaluatePosition((lastValue + curr.value) / sum);
            const isLarge = curr.value * 2 >= sum;
            const newStr = [
                `<path d="`,
                `M ${startX} ${startY} `,
                `A 1 1 0 ${isLarge ? 1 : 0} 1 ${endX} ${endY} `,
                'L 1 1',
                `" fill="${curr.color}" style="transform-origin: 1px 1px; transform: rotate(-90deg)"/>`,
            ].join('');
            return [
                lastValue + curr.value,
                [str, newStr].filter(Boolean).join('\n'),
            ];
        }, [0, ''])[1]
            .trim()}
          ${data.reduce((str, curr, index) => {
            const baseX = 2.2 + xMap[Math.floor(index / 16)];
            const baseY = 0.1 + ((index % 16) * 1.8) / 16;
            return [
                str,
                `<circle cx="${baseX}" cy="${baseY}" r="0.04" fill="${curr.color}"/>`,
                `<text x="${baseX + 0.06}" y="${baseY}" dominant-baseline="middle" style="font-size: 0.08px;">${curr.label}</text>`,
            ]
                .filter(Boolean)
                .join('\n');
        }, '')}
      </svg>
    `;
    }
}
exports.PieChart = PieChart;
