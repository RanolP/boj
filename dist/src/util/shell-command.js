"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class ShellCommand {
    constructor(origin, base, args) {
        this.origin = origin;
        this.base = base;
        this.args = args;
    }
    static parse(source) {
        const [base, ...args] = source.split(' ');
        return new ShellCommand(source, base, args.join(' '));
    }
    executeInherit(where) {
        return new Promise((resolve, reject) => {
            child_process_1.spawn(this.origin, {
                cwd: where,
                windowsHide: true,
                shell: true,
                stdio: 'inherit',
            })
                .on('exit', (id) => resolve(id))
                .on('error', reject);
        });
    }
    executeControl(where, input, output) {
        return new Promise((resolve, reject) => {
            child_process_1.spawn(this.origin, {
                cwd: where,
                windowsHide: true,
                shell: true,
                stdio: [input, output, output],
            })
                .on('exit', (id) => resolve(id))
                .on('error', reject);
        });
    }
}
exports.ShellCommand = ShellCommand;
