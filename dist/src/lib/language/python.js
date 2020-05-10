"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const PythonLanguage = {
    id: id_1.LanguageId.Python,
    name: 'Python',
    fileExtension: '.py',
    color: '#3572A5',
    bojRuntimes: [
        {
            name: 'Python 3',
            compileCommand: `python3 -c "import py_compile; py_compile.compile(r'Main.py')"`,
            executeCommand: `python3 Main.py`,
            version: `Python 3.8.2`,
            limitModifications: [
                util_1.time({ multiply: 3, add: 2 }),
                util_1.memory({ multiply: 2, add: 32 }),
            ],
        },
        {
            name: 'PyPy3',
            compileCommand: `python3 -c "import py_compile; py_compile.compile(r'Main.py')"`,
            executeCommand: `pypy3 Main.py`,
            version: `PyPy 7.3.0 with GCC 7.3.1 20180303 (Python 3.6.9)`,
            limitModifications: [
                util_1.time({ multiply: 3, add: 2 }),
                util_1.memory({ multiply: 2, add: 128 }),
            ],
        },
        {
            name: 'Python 2',
            compileCommand: `python -c "import py_compile; py_compile.compile(r'Main.py')"`,
            executeCommand: `python Main.py`,
            version: `Python 2.7.17`,
            limitModifications: [
                util_1.time({ multiply: 3, add: 2 }),
                util_1.memory({ multiply: 2, add: 32 }),
            ],
        },
        {
            name: 'PyPy2',
            compileCommand: `python -c "import py_compile; py_compile.compile(r'Main.py')"`,
            executeCommand: `pypy Main.py`,
            version: `PyPy 7.3.0 with GCC 7.3.1 20180303 (Python 2.7.13)`,
            limitModifications: [
                util_1.time({ multiply: 3, add: 2 }),
                util_1.memory({ multiply: 2, add: 128 }),
            ],
        },
    ],
};
exports.default = PythonLanguage;
