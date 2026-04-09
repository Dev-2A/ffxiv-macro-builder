# 🔨 FFXIV 제작 매크로 빌더

> 드래그 & 드롭으로 FFXIV 제작 스킬을 조립하고, `/ac` 매크로를 자동 생성하는 한국어 웹 도구

[![Deploy](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-blue)](https://dev-2a.github.io/ffxiv-macro-builder/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ 주요 기능

- **스킬 팔레트** — Dawntrail 7.x 기준 전체 제작 스킬 수록 (한/영 이름, CP, 레벨, 카테고리)
- **드래그 & 드롭 빌더** — 클릭으로 스킬 추가, 드래그로 순서 변경, 복제/삭제
- **매크로 자동 생성** — `/ac "스킬명" <wait.N>` 포맷, 한국어/English 전환
- **15줄 자동 분할** — FFXIV 매크로 줄 수 제한에 맞춰 자동으로 매크로 분할 + `/echo` 구분
- **CP 실시간 계산** — CP 예산 대비 사용량 게이지, 잔여/초과 표시
- **매크로 요약** — 스텝 수, 매크로 수, 내구도 소모, 예상 시간, 스킬 분포 시각화
- **원클릭 복사** — 매크로별 개별 복사 + 전체 복사
- **프리셋 저장** — localStorage에 이름 붙여 저장/불러오기/이름 변경/삭제
- **가져오기/내보내기** — 기존 매크로 텍스트 붙여넣기로 역파싱 + .txt 다운로드
- **반응형 UI** — 데스크탑 3단 레이아웃 / 모바일 세로 스택

## 🖥️ 스크린샷

> 배포 후 실제 화면을 캡처해서 추가해 주세요

## 🛠️ 기술 스택

| 분류 | 기술 |
| --- | --- |
| 프레임워크 | React 19 + Vite |
| 스타일링 | Tailwind CSS v4 |
| 드래그 & 드롭 | @dnd-kit/core + @dnd-kit/sortable |
| 배포 | GitHub Pages (gh-pages) |
| 데이터 | FFXIV Dawntrail 7.x 기준 제작 스킬 JSON |

## 📦 설치 및 실행

```bash
# 클론
git clone https://github.com/Dev-2A/ffxiv-macro-builder.git
cd ffxiv-macro-builder

# 의존성 설치
npm install

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## 📁 프로젝트 구조

```text
src/
├── components/
│   ├── layout/        # Header, Footer
│   ├── skill/         # SkillPalette, SkillCard
│   └── macro/         # MacroBuilder, MacroStep, MacroOutput,
│                      # MacroSummary, PresetPanel, MacroImportModal
├── data/
│   └── skills.js      # FFXIV 7.x 제작 스킬 데이터
├── hooks/
│   └── useMacroBuilder.js  # 매크로 상태 관리 커스텀 훅
├── utils/
│   ├── macroGenerator.js   # /ac 매크로 텍스트 생성 + 분할
│   ├── macroParser.js      # 매크로 텍스트 → 스킬 역파싱
│   ├── macroExporter.js    # .txt 파일 다운로드
│   └── presetStorage.js    # localStorage 프리셋 관리
├── App.jsx
├── main.jsx
└── index.css
```

## 🎮 FFXIV 도구 생태계

이 프로젝트는 Dev-2A의 FFXIV 도구 시리즈 중 하나입니다:

| 프로젝트 | 설명 |
| --- | --- |
| [gravity-raid-hub](https://github.com/Dev-2A/gravity-raid-hub) | 🌌 공대 관리 도구 |
| [ffxiv-loot-tracker](https://github.com/Dev-2A/ffxiv-loot-tracker) | 🎲 전리품 분배 도구 |
| **ffxiv-macro-builder** | 🔨 제작 매크로 빌더 (현재) |

## 📝 스킬 데이터 출처

- [Icy Veins — Crafting Skills Guide](https://www.icy-veins.com/ffxiv/crafting-skills-guide-for-ffxiv) (7.4 검증)
- [FFXIV Consolegamewiki](https://ffxiv.consolegameswiki.com/wiki/Crafting)
- [Teamcraft Simulator](https://github.com/ffxiv-teamcraft/simulator) (CP/레벨 코드 참조)
- 한국 커뮤니티 (postype 빔슬 가이드 — 한국어 스킬명 대조)

## ⚠️ 면책

- 이 도구는 팬 프로젝트이며 Square Enix와 무관합니다
- FINAL FANTASY는 Square Enix Holdings Co., Ltd.의 등록 상표입니다
- 스킬 데이터는 패치에 따라 변경될 수 있습니다

## 📜 License

MIT
