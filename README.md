![npm version](https://img.shields.io/npm/v/boj?style=for-the-badge)
![npm license](https://img.shields.io/npm/l/boj?style=for-the-badge)
![code size in bytes](https://img.shields.io/github/languages/code-size/RanolP/boj?style=for-the-badge)
![BOJ Toolchain](https://img.shields.io/badge/BOJ-Toolchain-blue?style=for-the-badge)

# boj

(deprecated) see [boj-toolchain/boj-toolchain](https://github.com/boj-toolchain/boj-toolchain)

> Modern problem-solvers require modern toolchains.

## 설치

npm 계열 패키지 매니저가 필요합니다.

```sh
yarn global add boj            # for yarn
npm install -g boj             # for npm
```

:tada: 끝!

## 사용법

### (TODO) boj new \<folder-name\> [--template \<git-url\>]

템플릿을 기반으로 저장소를 초기화 합니다.

### (TODO) boj cat [--id \<number\>]

터미널에서 백준 문제를 읽습니다.

### boj solve

Playwright를 통해 백준에 제출합니다.
`맞았습니다!!`가 뜨면 meta.json의 `status` 항목을 `solved`로 바꿀지 물어봅니다.

### boj hide-solved

이미 풀었고, 노트가 완성되어 더 이상 업데이트가 없을 문제를 숨깁니다.
VS Code에서만 지원합니다.

### boj init [--id \<number\>]

문제 초기 설정을 수행합니다.
템플릿을 기반으로 솔루션 파일, meta.json, Note.md를 생성합니다.
Note.md와 솔루션 파일의 경우 생략하고 이후에 다시 명령어를 수행해 생성할 수 있습니다.
솔루션 템플릿 파일은 `template/{language-id}/*.{file extension}` 에 저장하며,
기본적으로 `template/{language-id}/main.{file extension}`이 선택됩니다.
스페이스 키로 선택/해제할 수 있습니다.
각 템플릿은 줄바꿈 문자 두 개로(`\n\n`) 결합하여 사용합니다.
`main` 템플릿이 맨 아래 오는 것이 보장됩니다.

### boj run

솔루션 파일을 선택하고 BOJ 실행 환경과 유사한 상태로 만들어 실행합니다.
[설정][]을 통해 실행 환경을 조정할 수 있습니다.

### (TODO) boj test \<number\>

솔루션 파일을 선택하고 테스트 수트를 수행합니다.
`/{number}/test/` 폴더가 없거나 파일이 하나도 없는 경우 종료 코드 `1`로 종료합니다.
`/{number}/solution.{file extension}` 을 BOJ 실행 환경과 유사한 상태로 만들어 실행합니다.
그리고 모든 `{name}`에 대해, `/{number}/test/{name}.in`을 입력으로 넣었을 때 `/{number}/test/{name}.out` 결과물과 동일한지 검증합니다.
이 검증 과정은 라인 피드 문자 (`\n`)나 뒤에 붙는 공백 문자 등 시각적으로 보이지 않는다고 해도 다르다면 거부합니다.

### boj update-readme [--force]

`template/README.template.md`를 기반으로 `README.md` 파일을,
`{problem-number}/Note.md`를 기반으로 `{problem-number}/README.md` 파일을 업데이트합니다.
해당 템플릿 파일은 GFM을 확장한 마크다운 방언[\[1\]][1]을 사용합니다.

### boj update-symlink

저장소 루트에 있는 심링크 파일들을 업데이트합니다.

### boj clean

`.boj-cache/` 폴더를 제거합니다.

[1]: ./docs/PGFM.md
[설정]: ./docs/Config.md
