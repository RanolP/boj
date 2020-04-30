import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const PythonLanguage: Language = {
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
      limitModifications: [
        time({ multiply: 3, add: 2 }),
        memory({ multiply: 2, add: 128 }),
      ],
    },
    {
      name: 'Python 2',
      compileCommand: `python -c "import py_compile; py_compile.compile(r'Main.py')"`,
      executeCommand: `python Main.py`,
      version: `Python 2.7.17`,
      limitModifications: [
        time({ multiply: 3, add: 2 }),
        memory({ multiply: 2, add: 32 }),
      ],
    },
    {
      name: 'PyPy2',
      compileCommand: `python -c "import py_compile; py_compile.compile(r'Main.py')"`,
      executeCommand: `pypy Main.py`,
      version: `PyPy 7.3.0 with GCC 7.3.1 20180303 (Python 2.7.13)`,
      limitModifications: [
        time({ multiply: 3, add: 2 }),
        memory({ multiply: 2, add: 128 }),
      ],
    },
  ],
};

export default PythonLanguage;
