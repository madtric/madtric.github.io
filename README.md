# madtric.github.io

정적 포트폴리오 사이트. 빌드 과정 없음.

## 프로젝트 추가·수정

`projects.json`만 고치면 된다. 항목 하나 = 카드 하나.

| 필드 | 설명 |
|---|---|
| `title` | 프로젝트 이름 |
| `kind` | 분류 (iOS, 자동화, 웹 …). 분류가 2개 이상이면 필터 버튼이 생김 |
| `description` | 한두 줄 설명 |
| `tags` | 기술 스택 |
| `links` | `[{ "label": "...", "url": "..." }]` |
| `hidden` | `true`면 사이트에 안 보임 (작성 중인 항목용) |

## 로컬 미리보기

`python3 -m http.server` 실행 후 http://localhost:8000
