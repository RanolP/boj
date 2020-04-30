import { spawn } from 'child_process';
import { Stream } from 'stream';

export class ShellCommand {
  constructor(
    public readonly origin: string,
    public readonly base: string,
    public readonly args: string[],
  ) {}

  static parse(source: string): ShellCommand {
    const [base, ...args] = source.split(' ');
    return new ShellCommand(source, base, args);
  }

  executeInherit(where: string) {
    return new Promise((resolve) => {
      spawn(this.base, this.args, {
        cwd: where,
        windowsHide: true,
        stdio: 'inherit',
      }).on('exit', (id) => resolve(id));
    });
  }

  executeControl(where: string, input: Stream, output: Stream) {
    return new Promise((resolve) => {
      spawn(this.base, this.args, {
        cwd: where,
        windowsHide: true,
        stdio: [input, output, output],
      }).on('exit', (id) => resolve(id));
    });
  }
}
