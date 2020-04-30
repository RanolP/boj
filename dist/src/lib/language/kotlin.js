"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const KotlinLanguage = {
    id: id_1.LanguageId.Kotlin,
    name: 'Kotlin',
    fileExtension: '.kt',
    bojRuntimes: [
        {
            name: 'Kotlin (JVM)',
            compileCommand: `kotlinc-jvm -J-Xms1024m -J-Xmx1024m -J-Xss512m -include-runtime -d Main.jar Main.kt`,
            executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -jar Main.jar`,
            version: `kotlinc-jvm 1.3.71 (JRE 1.8.0_201-b09)`,
            limitModifications: [
                util_1.time({ multiply: 2, add: 1 }),
                util_1.memory({ multiply: 2, add: 16 }),
            ],
        },
        {
            name: 'Kotlin (Native)',
            compileCommand: `kotlinc-native -o Main -opt Main.kt`,
            executeCommand: `./Main.kexe`,
            version: `kotlinc-native 1.3.71-release-424 (JRE 1.8.0_201-b09)`,
            limitModifications: [util_1.memory({ add: 16 })],
        },
    ],
};
exports.default = KotlinLanguage;
