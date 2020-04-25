# PGFM

PGFM은 마크다운 전처리기 및 그 규격으로, Preprocessor for Github Flavored Markdown의 약어입니다.

## 문법

### 블록 문법

물결표 세 개로 시작해, 명령 이름을 붙이고, 필요하다면 JavaScript 규격에 맞는 추가 설정을 넘긴 후, 물결표 세 개로 끝마칩니다. JavaScript는 매번 샌드박스 안에서 실행됩니다. 가장 마지막에 오는 표현식을 우선하며, 그런 표현식이 없을 경우 `module.exports` 값을 사용합니다.

예시:

```markdown
~~~pirim
module.exports = "db"
~~~
```

### 인라인 변수

중괄호와 골뱅이 기호로 감쌉니다. 만약 콜론이 있다면 그 이후는 문자열로 전달됩니다.

예시:

```markdown
{@ title @}
```

## 지원 문법 목록

- `[root]`가 붙은 건 `template/README.template.md`에서만 쓸 수 있습니다.
- `[note]`가 붙은 건 `{problem-number}/Note.md`에서만 쓸 수 있습니다.
- `[any]`가 붙은 건 어디서든 쓸 수 있습니다.

## 지원 블록 문법 목록

### solved-table `[root]`

설정 규격:

```json
{}
```

daily-boj로 푼 문제 테이블을 생성합니다.

### language-usage `[root]`

설정 규격:

```json
{}
```

문제 풀이에 사용한 언어 비율을 보여줍니다.

### problem-info-table `[note]`

설정 규격:

```json
{}
```

문제 테이블을 생성합니다.
노트 편집에만 이용할 수 있습니다.

### pirim `[any]`

설정 규격:

```json
"string"
```

피림이 트윗을 임베드합니다. 사용 가능한 트윗은 [여기](./Pirim.md)에 등재되어 있습니다.

## 지원 인라인 문법 목록

### problem-name `[note]`

각 문제의 이름입니다.

### problem-number `[note]`

각 문제의 번호입니다.

### problem-title `[note]`

각 문제의 제목입니다.
`{@ problem-number @} {@ problem-name @}` 과 동치입니다.

### math `[any]`

[GitHub의 Jupyter Notebook 지원을 통한 트릭](https://gist.github.com/a-rodin/fef3f543412d6e1ec5b6cf55bf197d7b)을 사용해 수식을 이미지로 변환해줍니다.
