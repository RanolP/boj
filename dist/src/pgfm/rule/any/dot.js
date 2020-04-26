"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const viz_js_1 = __importDefault(require("viz.js"));
const full_render_js_1 = require("viz.js/full.render.js");
const constants_1 = require("../../../constants");
const better_fs_1 = require("../../../lib/better-fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
const viz = new viz_js_1.default({ Module: full_render_js_1.Module, render: full_render_js_1.render });
exports.DotRule = {
    name: 'dot',
    type: 'any',
    isBlock: true,
    schema: yup.string().required(),
    async execute(source, context) {
        const dir = path_1.join(constants_1.ROOT, 'boj-public', 'graphviz', 'dot');
        if (await better_fs_1.notExists(dir)) {
            await better_fs_1.mkdirs(dir);
        }
        const graph = await viz.renderString(source, {
            engine: 'dot',
            format: 'svg',
        });
        const filename = crypto_1.createHash('md5').update(source).digest('hex') + '.svg';
        await better_fs_1.writeFile(path_1.join(dir, filename), graph, { encoding: 'utf-8' });
        if ('problem' in context) {
            return `![dot graph](../boj-public/graphviz/dot/${filename})`;
        }
        else {
            return `![dot graph](./boj-public/graphviz/dot/${filename})`;
        }
    },
};
