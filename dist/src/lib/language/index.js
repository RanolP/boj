"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fuzzy_1 = require("fuzzy");
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
function parseCommand(source) {
    const [base, ...args] = source.split(' ');
    return {
        origin: source,
        base,
        args,
    };
}
const limitModifier = (unit) => ({ multiply = 1, add = 0, }) => {
    return {
        stringified: [multiply != 1 && `×${multiply}`, add !== 0 && `+${add}`, unit]
            .filter(Boolean)
            .join(''),
        evaluate: (base) => base * multiply + add,
    };
};
const time = limitModifier('초');
const memory = limitModifier('MB');
const NativeRun = {
    executeCommand: './Main',
};
exports.Languages = [
    {
        id: LanguageId.CPP,
        name: 'C++',
        fileExtension: '.cc',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'C++2a', compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++2a -DONLINE_JUDGE -DBOJ` }, NativeRun), { version: `g++ (GCC) 8.3.0`, limitModifications: [] }),
            Object.assign(Object.assign({ name: 'C++17', compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ` }, NativeRun), { version: `g++ (GCC) 8.3.0`, limitModifications: [] }),
            Object.assign(Object.assign({ name: 'C++14', compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++14 -DONLINE_JUDGE -DBOJ` }, NativeRun), { version: `g++ (GCC) 8.3.0`, limitModifications: [] }),
            Object.assign(Object.assign({ name: 'C++11', compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++11 -DONLINE_JUDGE -DBOJ` }, NativeRun), { version: `g++ (GCC) 8.3.0`, limitModifications: [] }),
            Object.assign(Object.assign({ name: 'C++', compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++98 -DONLINE_JUDGE -DBOJ` }, NativeRun), { version: `gcc (GCC) 8.3.0`, limitModifications: [] }),
            Object.assign(Object.assign({ name: 'C++ (Clang)', compileCommand: 'clang++ Main.cc -o Main -O2 -Wall -lm -static -std=c++98 -DONLINE_JUDGE -DBOJ' }, NativeRun), { version: 'clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104' }),
            Object.assign(Object.assign({ name: 'C++11 (Clang)', compileCommand: 'clang++ Main.cc -o Main -O2 -Wall -lm -static -std=c++11 -DONLINE_JUDGE -DBOJ' }, NativeRun), { version: 'clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104' }),
            Object.assign(Object.assign({ name: 'C++14 (Clang)', compileCommand: 'clang++ Main.cc -o Main -O2 -Wall -lm -static -std=c++14 -DONLINE_JUDGE -DBOJ' }, NativeRun), { version: 'clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104' }),
            Object.assign(Object.assign({ name: 'C++17 (Clang)', compileCommand: 'clang++ Main.cc -o Main -O2 -Wall -lm -static -std=c++17 -DONLINE_JUDGE -DBOJ' }, NativeRun), { version: 'clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104' }),
            Object.assign(Object.assign({ name: 'C++2a (Clang)', compileCommand: 'clang++ Main.cc -o Main -O2 -Wall -lm -static -std=c++2a -DONLINE_JUDGE -DBOJ' }, NativeRun), { version: 'clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104' }),
        ],
    },
    {
        id: LanguageId.Python,
        name: 'Python',
        fileExtension: '.py',
        bojRuntimes: [
            {
                name: 'Python 3',
                compileCommand: `python3 -c "import py_compile; py_compile.compile(r'Main.py')"`,
                executeCommand: `python3 Main.py`,
                version: `Python 3.8.2`,
                limitModifications: [
                    time({ multiply: 3, add: 2 }),
                    memory({ multiply: 2, add: 32 }),
                ],
            },
            {
                name: 'PyPy3',
                compileCommand: `python3 -c "import py_compile; py_compile.compile(r'Main.py')"`,
                executeCommand: `pypy3 Main.py`,
                version: `PyPy 7.3.0 with GCC 7.3.1 20180303 (Python 3.6.9)`,
                timeLimit: (base) => base * 3 + 2,
                memoryLimit: (base) => base * 2 + 128,
            },
            {
                name: 'Python 2',
                compileCommand: `python -c "import py_compile; py_compile.compile(r'Main.py')"`,
                executeCommand: `python Main.py`,
                version: `Python 2.7.17`,
                timeLimit: (base) => base * 3 + 2,
                memoryLimit: (base) => base * 2 + 32,
            },
            {
                name: 'PyPy2',
                compileCommand: `python -c "import py_compile; py_compile.compile(r'Main.py')"`,
                executeCommand: `pypy Main.py`,
                version: `PyPy 7.3.0 with GCC 7.3.1 20180303 (Python 2.7.13)`,
                timeLimit: (base) => base * 3 + 2,
                memoryLimit: (base) => base * 2 + 128,
            },
        ],
    },
    {
        id: LanguageId.Kotlin,
        name: 'Kotlin',
        fileExtension: '.kt',
        bojRuntimes: [
            {
                name: 'Kotlin (JVM)',
                compileCommand: `kotlinc-jvm -J-Xms1024m -J-Xmx1024m -J-Xss512m -include-runtime -d Main.jar Main.kt`,
                executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -jar Main.jar`,
                version: `kotlinc-jvm 1.3.71 (JRE 1.8.0_201-b09)`,
                timeLimit: (base) => base * 2 + 1,
                memoryLimit: (base) => base * 2 + 16,
            },
            {
                name: 'Kotlin (Native)',
                compileCommand: `kotlinc-native -o Main -opt Main.kt`,
                executeCommand: `./Main.kexe`,
                version: `kotlinc-native 1.3.71-release-424 (JRE 1.8.0_201-b09)`,
                memoryLimit: (base) => base + 16,
            },
        ],
    },
    {
        id: LanguageId.Rust,
        name: 'Rust',
        fileExtension: '.rs',
        bojRuntimes: [
            {
                name: 'Rust 2018',
                compileCommand: `rustc --edition 2018 -O -o Main Main.rs`,
                executeCommand: `./Main`,
                version: `rustc 1.42.0 (b8cedc004 2020-03-09)`,
                memoryLimit: (base) => base + 16,
            },
            {
                name: 'Rust',
                compileCommand: `rustc --edition 2015 -O -o Main Main.rs`,
                executeCommand: `./Main`,
                version: `rustc 1.42.0 (b8cedc004 2020-03-09)`,
                memoryLimit: (base) => base + 16,
            },
        ],
    },
    {
        id: LanguageId.Text,
        name: 'Text',
        fileExtension: '.txt',
        bojRuntimes: [
            {
                name: 'Text',
                compileCommand: `fromdos Main.txt`,
                executeCommand: `cat Main.txt`,
                version: `cat (GNU coreutils) 8.25`,
            },
        ],
    },
    {
        id: LanguageId.Java,
        name: 'Java',
        fileExtension: '.java',
        bojRuntimes: [
            {
                name: 'Java',
                compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
                executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
                version: `Java(TM) SE Runtime Environment (build 1.8.0_201-b09)`,
                timeLimit: (base) => base * 2 + 1,
                memoryLimit: (base) => base * 2 + 16,
            },
            {
                name: 'Java (OpenJDK)',
                compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
                executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
                version: `OpenJDK Runtime Environment (build 1.8.0_242-8u242-b08-0ubuntu3~16.04-b08)`,
                timeLimit: (base) => base * 2 + 1,
                memoryLimit: (base) => base * 2 + 16,
            },
            {
                name: 'Java 11',
                compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
                executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
                version: `OpenJDK Runtime Environment (build 13+33)`,
                timeLimit: (base) => base * 2 + 1,
                memoryLimit: (base) => base * 2 + 16,
            },
        ],
    },
    {
        id: LanguageId.C,
        name: 'C',
        fileExtension: '.c',
        bojRuntimes: [
            {
                name: 'C11',
                compileCommand: `gcc Main.c -o Main -O2 -Wall -lm -static -std=c11 -DONLINE_JUDGE -DBOJ`,
                executeCommand: `./Main`,
                version: `gcc (GCC) 8.3.0`,
            },
            {
                name: 'C',
                compileCommand: `gcc Main.c -o Main -O2 -Wall -lm -static -std=c99 -DONLINE_JUDGE -DBOJ`,
                executeCommand: `./Main`,
                version: `gcc (GCC) 8.3.0`,
            },
            {
                name: 'C (Clang)',
                compileCommand: `clang Main.c -o Main -O2 -Wall -lm -static -std=c99 -DONLINE_JUDGE -DBOJ`,
                executeCommand: `./Main`,
                version: `clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104`,
            },
            Object.assign(Object.assign({ name: 'C11 (Clang)', compileCommand: 'clang Main.c -o Main -O2 -Wall -lm -static -std=c11 -DONLINE_JUDGE -DBOJ' }, NativeRun), { version: 'clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104' }),
        ],
    },
    {
        id: LanguageId.Ruby,
        name: 'Ruby',
        fileExtension: '.rb',
        bojRuntimes: [
            {
                name: 'Ruby 2.7',
                compileCommand: `ruby -c Main.rb`,
                executeCommand: `ruby Main.rb`,
                version: `ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-linux]`,
                timeLimit: (base) => base + 5,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.Swift,
        name: 'Swift',
        fileExtension: '.swift',
        bojRuntimes: [
            {
                name: 'Swift',
                compileCommand: `swiftc Main.swift`,
                executeCommand: `./Main`,
                version: `Swift version 5.2.1 (swift-5.2.1-RELEASE)`,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.CSharp,
        name: 'C#',
        fileExtension: '.cs',
        bojRuntimes: [
            {
                name: 'C# 6.0',
                compileCommand: `mcs -codepage:utf8 -warn:0 -optimize+ -checked+ -clscheck- -reference:System.Numerics.dll -out:Main.exe Main.cs`,
                executeCommand: `mono --optimize=all Main.exe`,
                version: `Mono C# compiler version 6.8.0.105`,
                timeLimit: (base) => base + 5,
                memoryLimit: (base) => base * 2 + 16,
            },
        ],
    },
    {
        id: LanguageId.Nodejs,
        name: 'Node.js',
        fileExtension: '.js',
        bojRuntimes: [
            {
                name: 'node.js',
                executeCommand: `node Main.js`,
                version: `v12.16.1`,
                timeLimit: (base) => base * 3 + 2,
                memoryLimit: (base) => base * 2,
            },
            {
                name: 'Rhino',
                compileCommand: 'uglifyjs -o Main_uglify.js Main.js',
                executeCommand: 'java -Xms128m -Xmx512m -Xss64m -jar rhino.jar Main.js',
                version: 'Rhino 1.7.8',
                limitModifications: [
                    time({ multiply: 2, add: 1 }),
                    memory({ multiply: 2, add: 16 }),
                ],
            },
        ],
    },
    {
        id: LanguageId.Go,
        name: 'Go',
        fileExtension: '.go',
        bojRuntimes: [
            {
                name: 'Go',
                compileCommand: `go build Main.go`,
                executeCommand: `./Main`,
                version: `go version go1.14.1 linux/amd64`,
                timeLimit: (base) => base + 2,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.D,
        name: 'D',
        fileExtension: '.d',
        bojRuntimes: [
            {
                name: 'D',
                compileCommand: `dmd -boundscheck=off -O -of=Main -fPIC -inline -release Main.d`,
                executeCommand: `./Main`,
                version: `DMD64 D Compiler v2.088.0`,
                memoryLimit: (base) => base + 16,
            },
        ],
    },
    {
        id: LanguageId.FSharp,
        name: 'F#',
        fileExtension: '.fs',
        bojRuntimes: [
            {
                name: 'F#',
                compileCommand: `fsharpc Main.fs`,
                executeCommand: `mono --optimize=all Main.exe`,
                version: `Microsoft (R) F# Compiler version 10.2.3 for F# 4.5`,
                timeLimit: (base) => base + 5,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.PHP,
        name: 'PHP',
        fileExtension: '.php',
        bojRuntimes: [
            {
                name: 'PHP',
                compileCommand: `php -l Main.php`,
                executeCommand: `php Main.php`,
                version: `PHP 7.4.4`,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.Pascal,
        name: 'Pascal',
        fileExtension: '.pas',
        bojRuntimes: [
            {
                name: 'Pascal',
                compileCommand: `fpc Main.pas -O2 -Co -Ct -Ci`,
                executeCommand: `./Main`,
                version: `Free Pascal Compiler version 3.0.0+dfsg-2 [2016/01/28] for x86_64`,
            },
        ],
    },
    {
        id: LanguageId.Lua,
        name: 'Lua',
        fileExtension: '.lua',
        bojRuntimes: [
            {
                name: 'Lua',
                compileCommand: `luac -p Main.lua`,
                executeCommand: `lua Main.lua`,
                version: `Lua 5.3.5 Copyright (C) 1994-2018 Lua.org, PUC-Rio`,
                timeLimit: (base) => base + 5,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.Perl,
        name: 'Perl',
        fileExtension: '.pl',
        bojRuntimes: [
            {
                name: 'Perl',
                compileCommand: `perl -c Main.pl`,
                executeCommand: `perl Main.pl`,
                version: `Perl v5.30.0`,
                memoryLimit: (base) => base + 512,
            },
        ],
    },
    {
        id: LanguageId.R,
        name: 'R',
        fileExtension: '.R',
        bojRuntimes: [
            {
                name: 'R',
                executeCommand: `Rscript Main.R`,
                version: `R scripting front-end version 3.6.1 (2019-07-05)`,
                timeLimit: (base) => base + 2,
                memoryLimit: (base) => base + 128,
            },
        ],
    },
    {
        id: LanguageId.ObjectiveC,
        name: 'Objective-C',
        fileExtension: '.m',
        bojRuntimes: [
            {
                name: 'Objective-C',
                compileCommand: 'gcc Main.m -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DB',
                executeCommand: `./Main`,
                version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
            },
        ],
    },
    {
        id: LanguageId.ObjectiveCpp,
        name: 'Objective-C++',
        fileExtension: '.mm',
        bojRuntimes: [
            {
                name: 'Objective-C++',
                compileCommand: 'g++ Main.mm -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DBOJ',
                executeCommand: `./Main`,
                version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
            },
        ],
    },
    {
        id: LanguageId.GolfScript,
        name: 'GolfScript',
        fileExtension: '.gs',
        bojRuntimes: [
            {
                name: 'Golfscript',
                executeCommand: `ruby golfscript.rb Main.gs`,
                version: `Golfscript (April 30, 2013)`,
                timeLimit: time({ add: 2 }),
                memoryLimit: memory({ add: 64 }),
            },
        ],
    },
    {
        id: LanguageId.Assembly,
        name: 'Assembly',
        fileExtension: '.asm',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Assembly (32bit)', compileCommand: `nasm -f elf32 -o Main.o Main.asm && gcc -m32 -o Main Main.o` }, NativeRun), { version: `NASM version 2.14` }),
            Object.assign(Object.assign({ name: 'Assembly (64bit)', compileCommand: `nasm -f elf64 -o Main.o Main.asm && gcc -o Main Main.o` }, NativeRun), { version: `NASM version 2.14` }),
        ],
    },
    {
        id: LanguageId.VBNet,
        name: 'VB.NET',
        fileExtension: '.vb',
        bojRuntimes: [
            {
                name: 'VB.NET 4.0',
                compileCommand: 'vbnc -out:Main.exe Main.vb',
                executeCommand: 'mono --optimize=all Main.exe',
                version: `Visual Basic.Net Compiler version 0.0.0.5943 (Mono 4.7 - tarball)`,
                timeLimit: time({ add: 5 }),
                memoryLimit: memory({ add: 512 }),
            },
        ],
    },
    {
        id: LanguageId.Bash,
        name: 'Bash',
        fileExtension: '.sh',
        bojRuntimes: [
            {
                name: 'Bash',
                compileCommand: 'bash -n Main.sh',
                executeCommand: 'bash Main.sh',
                version: `GNU bash, version 5.0.0(1)-release (x86_64-pc-linux-gnu)`,
            },
        ],
    },
    {
        id: LanguageId.Fortran,
        name: 'Fortran',
        fileExtension: '.f95',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Fortran', compileCommand: 'gfortran Main.f95 -o Main -O2 -Wall -fmax-array-constructor=2097152' }, NativeRun), { version: `GNU Fortran (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`, limitModifications: [memory({ add: 16 })] }),
        ],
    },
    {
        id: LanguageId.Scheme,
        name: 'Scheme',
        fileExtension: '.scm',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Scheme', compileCommand: 'csc -output-file Main -O5 Main.scm' }, NativeRun), { version: `Chicken Version 5.1.0 (rev 8e62f718)`, limitModifications: [
                    time({ multiply: 2, add: 1 }),
                    memory({ multiply: 2, add: 16 }),
                ] }),
        ],
    },
    {
        id: LanguageId.Ada,
        name: 'Ada',
        fileExtension: '.ada',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Ada', compileCommand: 'gnatmake -o Main Main.ada' }, NativeRun), { version: `GNATMAKE 5.5.0` }),
        ],
    },
    {
        id: LanguageId.Awk,
        name: 'Awk',
        fileExtension: '.awk',
        bojRuntimes: [
            {
                name: 'awk',
                compileCommand: 'gawk --source "BEGIN { exit(0) } END { exit(0) }" --file Main.awk',
                executeCommand: 'gawk --file Main.awk',
                version: `GNU Awk 4.2.1, API: 2.0`,
                limitModifications: [memory({ add: 16 })],
            },
        ],
    },
    {
        id: LanguageId.OCaml,
        name: 'OCaml',
        fileExtension: '.ml',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'OCaml', compileCommand: 'ocamlc -o Main Main.ml' }, NativeRun), { version: `OCaml version 4.07.0`, limitModifications: [memory({ add: 32 })] }),
        ],
    },
    {
        id: LanguageId.BrainFuck,
        name: 'Brainf**k',
        fileExtension: '.bf',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Brainf**k', compileCommand: [
                    './bfi -c Main.bf',
                    'gcc Main.c -o Main -O2 -Wall -lm -static -std=c11 -DONLINE_JUDGE -DBOJ',
                ] }, NativeRun), { version: `bfi: Version 1.1.0 dabe513 on Linux x64`, limitModifications: [time({ add: 1 })] }),
        ],
    },
    {
        id: LanguageId.Whitespace,
        name: 'Whitespace',
        fileExtension: '.ws',
        bojRuntimes: [
            {
                name: 'Whitespace',
                executeCommand: 'whitespace Main.ws',
                version: 'Whitespace',
            },
        ],
    },
    {
        id: LanguageId.Tcl,
        name: 'Tcl',
        fileExtension: '.tcl',
        bojRuntimes: [
            {
                name: 'Tcl',
                executeCommand: 'tclsh Main.tcl',
                version: '8.6',
                limitModifications: [memory({ add: 512 })],
            },
        ],
    },
    {
        id: LanguageId.Cobol,
        name: 'Cobol',
        fileExtension: '.cob',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Cobol', compileCommand: 'cobc -x -O2 -o Main Main.cob' }, NativeRun), { version: 'cobc (GnuCOBOL) 2.2.0' }),
        ],
    },
    {
        id: LanguageId.Pike,
        name: 'Pike',
        fileExtension: '.pike',
        bojRuntimes: [
            {
                name: 'Pike',
                compileCommand: 'pike -e compile_file(\\"Main.pike\\");',
                executeCommand: 'pike Main.pike',
                version: 'Pike v7.8 release 866',
                limitModifications: [time({ add: 5 }), memory({ add: 512 })],
            },
        ],
    },
    {
        id: LanguageId.sed,
        name: 'sed',
        fileExtension: '.sed',
        bojRuntimes: [
            {
                name: 'sed',
                compileCommand: 'fromdos Main.sed',
                executeCommand: 'sed -f Main.sed',
                version: 'sed (GNU sed) 4.7',
            },
        ],
    },
    {
        id: LanguageId.Boo,
        name: 'Boo',
        fileExtension: '.boo',
        bojRuntimes: [
            {
                name: 'Boo',
                compileCommand: 'booc.exe Main.boo',
                // TODO: It may not work.
                executeCommand: './Main.exe',
                version: 'Boo Compiler version 0.9.4.9',
                limitModifications: [time({ add: 5 }), memory({ add: 512 })],
            },
        ],
    },
    {
        id: LanguageId.Intercal,
        name: 'INTERCAL',
        fileExtension: '.i',
        bojRuntimes: [
            {
                name: 'INTERCAL',
                executeCommand: 'ick Main.i',
                version: 'C-INTERCAL 0.29',
            },
        ],
    },
    {
        id: LanguageId.bc,
        name: 'bc',
        fileExtension: '.bc',
        bojRuntimes: [
            {
                name: 'bc',
                compileCommand: 'from Main.bc',
                executeCommand: 'bc -q Main.bc',
                version: 'bc 1.06.95',
            },
        ],
    },
    {
        id: LanguageId.Nemerle,
        name: 'Nemerle',
        fileExtension: '.n',
        bojRuntimes: [
            {
                name: 'Nemerle',
                compileCommand: 'ncc.exe -o Main -O Main.n',
                // TODO: It may not work.
                executeCommand: './Main.exe',
                version: 'Nemerle Compiler (ncc) version 1.2.0.539',
                limitModifications: [time({ add: 5 }), memory({ add: 512 })],
            },
        ],
    },
    {
        id: LanguageId.Cobra,
        name: 'Cobra',
        fileExtension: '.cobra',
        bojRuntimes: [
            Object.assign(Object.assign({ name: 'Cobra', compileCommand: 'cobra -compile -o Main.cobra' }, NativeRun), { version: 'The Cobra Programming Language 0.9.2', limitModifications: [time({ add: 5 }), memory({ add: 512 })] }),
        ],
    },
    {
        id: LanguageId.Algol68,
        name: 'Algol 68',
        fileExtension: '.a68',
        bojRuntimes: [
            {
                name: 'Algol 68',
                compileCommand: 'a68g --check Main.a68',
                executeCommand: 'a68g Main.a68',
                version: 'Algol 68 Genie 2.8',
            },
        ],
    },
    {
        id: LanguageId.Befunge,
        name: 'Befunge',
        fileExtension: '.bf',
        bojRuntimes: [
            {
                name: 'Befunge',
                executeCommand: 'cfunge Main.bf',
                version: 'cfunge 0.9.0',
                limitModifications: [memory({ add: 32 })],
            },
        ],
    },
    {
        id: LanguageId.Haxe,
        name: 'Haxe',
        fileExtension: '.hx',
        bojRuntimes: [
            {
                name: 'Haxe',
                compileCommand: 'haxe -main Main -python Main.py',
                executeCommand: 'python3 Main.py',
                version: 'Haxe 3.4.7',
                limitModifications: [
                    time({ multiply: 3, add: 2 }),
                    memory({ multiply: 2, add: 32 }),
                ],
            },
        ],
    },
    {
        id: LanguageId.LolCode,
        name: 'LOLCODE',
        fileExtension: '.lol',
        bojRuntimes: [
            {
                name: 'LOLCODE',
                executeCommand: 'lci Main.lol',
                version: 'lci v0.10.5',
            },
        ],
    },
    {
        id: LanguageId.Aheui,
        name: '아희',
        fileExtension: '.aheui',
        bojRuntimes: [
            {
                name: '아희',
                executeCommand: 'rpaheui-c -O2 Main.aheui',
                version: 'rpaheui 1.2.2-24-gb66f488',
                limitModifications: [memory({ add: 32 })],
            },
        ],
    },
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
