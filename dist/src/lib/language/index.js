"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fuzzy_1 = require("fuzzy");
const cpp_1 = __importDefault(require("./cpp"));
const python_1 = __importDefault(require("./python"));
const kotlin_1 = __importDefault(require("./kotlin"));
const rust_1 = __importDefault(require("./rust"));
const text_1 = __importDefault(require("./text"));
const java_1 = __importDefault(require("./java"));
const c_1 = __importDefault(require("./c"));
const ruby_1 = __importDefault(require("./ruby"));
const swift_1 = __importDefault(require("./swift"));
const ada_1 = __importDefault(require("./ada"));
const boo_1 = __importDefault(require("./boo"));
const brainfuck_1 = __importDefault(require("./brainfuck"));
const csharp_1 = __importDefault(require("./csharp"));
const d_1 = __importDefault(require("./d"));
const fsharp_1 = __importDefault(require("./fsharp"));
const fortran_1 = __importDefault(require("./fortran"));
const go_1 = __importDefault(require("./go"));
const haxe_1 = __importDefault(require("./haxe"));
const ecmascript_1 = __importDefault(require("./ecmascript"));
const lolcode_1 = __importDefault(require("./lolcode"));
const lua_1 = __importDefault(require("./lua"));
const nemerle_1 = __importDefault(require("./nemerle"));
const objective_c_1 = __importDefault(require("./objective-c"));
const objective_cpp_1 = __importDefault(require("./objective-cpp"));
const php_1 = __importDefault(require("./php"));
const pascal_1 = __importDefault(require("./pascal"));
const perl_1 = __importDefault(require("./perl"));
const pike_1 = __importDefault(require("./pike"));
const r_1 = __importDefault(require("./r"));
const assembly_1 = __importDefault(require("./assembly"));
const vb_net_1 = __importDefault(require("./vb-net"));
const bash_1 = __importDefault(require("./bash"));
const scheme_1 = __importDefault(require("./scheme"));
const ocaml_1 = __importDefault(require("./ocaml"));
const tcl_1 = __importDefault(require("./tcl"));
const sed_1 = __importDefault(require("./sed"));
const whitespace_1 = __importDefault(require("./whitespace"));
const aheui_1 = __importDefault(require("./aheui"));
const awk_1 = __importDefault(require("./awk"));
const cobol_1 = __importDefault(require("./cobol"));
const algol68_1 = __importDefault(require("./algol68"));
const bc_1 = __importDefault(require("./bc"));
const befunge_1 = __importDefault(require("./befunge"));
const golfscript_1 = __importDefault(require("./golfscript"));
const cobra_1 = __importDefault(require("./cobra"));
const intercal_1 = __importDefault(require("./intercal"));
exports.Languages = [
    cpp_1.default,
    python_1.default,
    kotlin_1.default,
    rust_1.default,
    text_1.default,
    java_1.default,
    c_1.default,
    ruby_1.default,
    swift_1.default,
    csharp_1.default,
    ecmascript_1.default,
    go_1.default,
    d_1.default,
    fsharp_1.default,
    php_1.default,
    pascal_1.default,
    lua_1.default,
    perl_1.default,
    r_1.default,
    objective_c_1.default,
    objective_cpp_1.default,
    golfscript_1.default,
    assembly_1.default,
    vb_net_1.default,
    bash_1.default,
    fortran_1.default,
    scheme_1.default,
    ada_1.default,
    awk_1.default,
    ocaml_1.default,
    brainfuck_1.default,
    whitespace_1.default,
    tcl_1.default,
    cobol_1.default,
    pike_1.default,
    sed_1.default,
    boo_1.default,
    intercal_1.default,
    bc_1.default,
    nemerle_1.default,
    cobra_1.default,
    algol68_1.default,
    befunge_1.default,
    haxe_1.default,
    lolcode_1.default,
    aheui_1.default,
];
exports.KeyedLanguages = Object.fromEntries(exports.Languages.map((language) => [language.id, language]));
exports.ExtensionLanguagesMap = exports.Languages.reduce((acc, language) => (Object.assign(Object.assign({}, acc), { [language.fileExtension]: language.fileExtension in acc
        ? acc[language.fileExtension].concat(language)
        : [language] })), {});
exports.RuntimeBelongsToMap = Object.fromEntries(exports.Languages.flatMap((language) => language.bojRuntimes.map((runtime) => [runtime.name, language])));
function searchLanguage(query) {
    return fuzzy_1.filter(query, exports.Languages, {
        extract: ({ id, name, fileExtension }) => `${id} ${name} ${fileExtension}`,
    }).map(({ original }) => ({
        name: `${original.name} (${original.fileExtension})`,
        value: original,
        short: original.name,
    }));
}
exports.searchLanguage = searchLanguage;
