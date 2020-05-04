# Config

```json
{
  "browser": "firefox, chromium, or webkit",
  "runtimeOverrides": {
    "languageId": {
      "compile": "string or array of string",
      "execute": "string or array of string",
      "forceRuntime": "string"
    }
  }
}
```

## browser

`boj solve`에 필요한 값입니다. 어떤 브라우저를 띄울지 정합니다.

## runtimeOverrides

`boj run` 혹은 `boj test (todo)`가 참조하는 값입니다.
특정 언어의 컴파일/실행 명령을 갈아끼우거나 특정 런타임으로 강제할 수 있습니다.
우선 순위는 커스텀 컴파일/실행 명령 - 강제 런타임 - 직접 선택 순입니다.
