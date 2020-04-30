"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const JavaLanguage = {
    id: id_1.LanguageId.Java,
    name: 'Java',
    fileExtension: '.java',
    bojRuntimes: [
        {
            name: 'Java',
            compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
            executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
            version: `Java(TM) SE Runtime Environment (build 1.8.0_201-b09)`,
            limitModifications: [
                util_1.time({ multiply: 2, add: 1 }),
                util_1.memory({ multiply: 2, add: 16 }),
            ],
        },
        {
            name: 'Java (OpenJDK)',
            compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
            executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
            version: `OpenJDK Runtime Environment (build 1.8.0_242-8u242-b08-0ubuntu3~16.04-b08)`,
            limitModifications: [
                util_1.time({ multiply: 2, add: 1 }),
                util_1.memory({ multiply: 2, add: 16 }),
            ],
        },
        {
            name: 'Java 11',
            compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
            executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
            version: `OpenJDK Runtime Environment (build 13+33)`,
            limitModifications: [
                util_1.time({ multiply: 2, add: 1 }),
                util_1.memory({ multiply: 2, add: 16 }),
            ],
        },
    ],
};
exports.default = JavaLanguage;
