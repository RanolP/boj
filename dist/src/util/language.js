"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fuzzy_1 = require("fuzzy");
var LanguageId;
(function (LanguageId) {
    LanguageId["CPP"] = "cpp";
    LanguageId["Python"] = "python";
    LanguageId["Kotlin"] = "kotlin";
    LanguageId["Rust"] = "rust";
    LanguageId["Text"] = "text";
    LanguageId["Java"] = "java";
    LanguageId["C"] = "c";
    LanguageId["Ruby"] = "ruby";
    LanguageId["Swift"] = "swift";
    LanguageId["CSharp"] = "csharp";
    LanguageId["Nodejs"] = "nodejs";
    LanguageId["Go"] = "go";
    LanguageId["D"] = "d";
    LanguageId["FSharp"] = "fsharp";
    LanguageId["PHP"] = "php";
    LanguageId["Pascal"] = "pascal";
    LanguageId["Lua"] = "lua";
    LanguageId["Perl"] = "perl";
    LanguageId["R"] = "r";
    LanguageId["ObjectiveC"] = "objectivec";
    LanguageId["ObjectiveCpp"] = "objectivecpp";
    LanguageId["GolfScript"] = "golfscript";
    LanguageId["Assembly"] = "assembly";
    LanguageId["VBNet"] = "vbnet";
    LanguageId["Bash"] = "bash";
    LanguageId["Fortran"] = "fortran";
    LanguageId["Scheme"] = "scheme";
    LanguageId["Ada"] = "ada";
    LanguageId["Awk"] = "awk";
    LanguageId["OCaml"] = "ocaml";
    LanguageId["BrainFuck"] = "brainfuck";
    LanguageId["Whitespace"] = "whitespace";
    LanguageId["Tcl"] = "tcl";
    LanguageId["Cobol"] = "cobol";
    LanguageId["Pike"] = "pike";
    LanguageId["sed"] = "sed";
    LanguageId["Boo"] = "boo";
    LanguageId["Intercal"] = "intercal";
    LanguageId["bc"] = "bc";
    LanguageId["Nemerle"] = "nemerle";
    LanguageId["Cobra"] = "cobra";
    LanguageId["Algol68"] = "algol68";
    LanguageId["Befunge"] = "befunge";
    LanguageId["Haxe"] = "haxe";
    LanguageId["LolCode"] = "lolcode";
    LanguageId["Aheui"] = "aheui";
})(LanguageId = exports.LanguageId || (exports.LanguageId = {}));
exports.Languages = [
    { id: LanguageId.CPP, name: 'C++', fileExtension: '.cc' },
    { id: LanguageId.Python, name: 'Python', fileExtension: '.py' },
    { id: LanguageId.Kotlin, name: 'Kotlin', fileExtension: '.kt' },
    { id: LanguageId.Rust, name: 'Rust', fileExtension: '.rs' },
    { id: LanguageId.Text, name: 'Text', fileExtension: '.txt' },
    { id: LanguageId.Java, name: 'Java', fileExtension: '.java' },
    { id: LanguageId.C, name: 'C', fileExtension: '.c' },
    { id: LanguageId.Ruby, name: 'Ruby', fileExtension: '.rb' },
    { id: LanguageId.Swift, name: 'Swift', fileExtension: '.swift' },
    { id: LanguageId.CSharp, name: 'C#', fileExtension: '.cs' },
    { id: LanguageId.Nodejs, name: 'Node.js', fileExtension: '.js' },
    { id: LanguageId.Go, name: 'Go', fileExtension: '.go' },
    { id: LanguageId.D, name: 'D', fileExtension: '.d' },
    { id: LanguageId.FSharp, name: 'F#', fileExtension: '.fs' },
    { id: LanguageId.PHP, name: 'PHP', fileExtension: '.php' },
    { id: LanguageId.Pascal, name: 'Pascal', fileExtension: '.pas' },
    { id: LanguageId.Lua, name: 'Lua', fileExtension: '.lua' },
    { id: LanguageId.Perl, name: 'Perl', fileExtension: '.pl' },
    { id: LanguageId.R, name: 'R', fileExtension: '.R' },
    { id: LanguageId.ObjectiveC, name: 'Objective-C', fileExtension: '.m' },
    { id: LanguageId.ObjectiveCpp, name: 'Objective-C++', fileExtension: '.mm' },
    { id: LanguageId.GolfScript, name: 'GolfScript', fileExtension: '.gs' },
    { id: LanguageId.Assembly, name: 'Assembly', fileExtension: '.asm' },
    { id: LanguageId.VBNet, name: 'VB.NET', fileExtension: '.vb' },
    { id: LanguageId.Bash, name: 'Bash', fileExtension: '.sh' },
    { id: LanguageId.Fortran, name: 'Fortran', fileExtension: '.f95' },
    { id: LanguageId.Scheme, name: 'Scheme', fileExtension: '.scm' },
    { id: LanguageId.Ada, name: 'Ada', fileExtension: '.ada' },
    { id: LanguageId.Awk, name: 'Awk', fileExtension: '.awk' },
    { id: LanguageId.OCaml, name: 'OCaml', fileExtension: '.ml' },
    { id: LanguageId.BrainFuck, name: 'Brainf**k', fileExtension: '.bf' },
    { id: LanguageId.Whitespace, name: 'Whitespace', fileExtension: '.ws' },
    { id: LanguageId.Tcl, name: 'Tcl', fileExtension: '.tcl' },
    { id: LanguageId.Cobol, name: 'Cobol', fileExtension: '.cob' },
    { id: LanguageId.Pike, name: 'Pike', fileExtension: '.pike' },
    { id: LanguageId.sed, name: 'sed', fileExtension: '.sed' },
    { id: LanguageId.Boo, name: 'Boo', fileExtension: '.boo' },
    { id: LanguageId.Intercal, name: 'INTERCAL', fileExtension: '.i' },
    { id: LanguageId.bc, name: 'bc', fileExtension: '.bc' },
    { id: LanguageId.Nemerle, name: 'Nemerle', fileExtension: '.n' },
    { id: LanguageId.Cobra, name: 'Cobra', fileExtension: '.cobra' },
    { id: LanguageId.Algol68, name: 'Algol 68', fileExtension: '.a68' },
    { id: LanguageId.Befunge, name: 'Befunge', fileExtension: '.bf' },
    { id: LanguageId.Haxe, name: 'Haxe', fileExtension: '.hx' },
    { id: LanguageId.LolCode, name: 'LOLCODE', fileExtension: '.lol' },
    { id: LanguageId.Aheui, name: '아희', fileExtension: '.aheui' },
];
exports.KeyedLanguages = Object.fromEntries(exports.Languages.map(function (language) { return [language.id, language]; }));
function searchLanguage(query) {
    return fuzzy_1.filter(query, exports.Languages, {
        extract: function (_a) {
            var id = _a.id, name = _a.name, fileExtension = _a.fileExtension;
            return id + " " + name + " " + fileExtension;
        },
    }).map(function (_a) {
        var original = _a.original;
        return ({
            name: original.name + " (" + original.fileExtension + ")",
            value: original,
            short: original.name,
        });
    });
}
exports.searchLanguage = searchLanguage;
