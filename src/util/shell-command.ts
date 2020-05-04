import { spawn } from 'child_process';
import { Stream } from 'stream';

export class ShellCommand {
  constructor(
    public readonly origin: string,
    public readonly base: string,
    public readonly args: string,
  ) {}

  static parse(source: string): ShellCommand {
    const [base, ...args] = source.split(' ');
    return new ShellCommand(source, base, args.join(' '));
  }

  executeInherit(where: string) {
    return new Promise((resolve, reject) => {
      spawn(this.origin, {
        cwd: where,
        windowsHide: true,
        shell: true,
        stdio: 'inherit',
      })
        .on('exit', (id) => {
          if (id === 0) {
            resolve();
          } else {
            reject(id);
          }
        })
        .on('error', reject);
    });
  }

  executeControl(where: string, input: Stream, output: Stream) {
    return new Promise((resolve, reject) => {
      spawn(this.origin, {
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
