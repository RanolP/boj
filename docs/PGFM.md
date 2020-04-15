# PGFM

PGFM은 마크다운 전처리기 및 그 규격으로, Preprocessor for Github Flavored Markdown의 약어입니다.

## 문법

### 블록 문법

물결표 세 개로 시작해, 명령 이름을 붙이고, 필요하다면 JSON 규격에 맞는 추가 설정을 넘긴 후, 물결표 세 개로 끝마칩니다.

예시:

```markdown
~~~solved-table
~~~
```

### 인라인 변수

중괄호와 골뱅이 기호로 감쌉니다.

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

## 지원 인라인 문법 목록

### problem-name `[note]`

각 문제의 이름입니다.

### problem-number `[note]`

각 문제의 번호입니다.

### problem-title `[note]`

각 문제의 제목입니다.
`{@ problem-number @} {@ problem-name @}` 과 동치입니다.
