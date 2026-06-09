# 한신대학교 AI 공공정책연구소 웹사이트 제작 프로젝트

이 폴더는 한신대학교 AI 공공정책연구소 공식 웹사이트를 새로 제작하기 위한 작업 공간입니다.

기존 교수님 원본 프로젝트는 GitHub 공개 저장소와 아이클라우드 원본을 기준으로 분석했고, 현재 구현은 Google AI Studio에서 만든 새 UI/UX 초안을 기반으로 제작했습니다. 교수님 원본 사이트의 실제 핵심 내용은 새 디자인 안의 대응되는 영역에만 옮겼고, 원본에 없는 새 디자인의 부가 화면과 인터랙션은 유지했습니다.

- 원본 GitHub: https://github.com/LeeSeogMin/AI_center.git
- 현재 공개 배포 주소: https://ai-policy-institute.vercel.app/
- 아이클라우드 원본 위치: `/Users/dbsdud03/Library/Mobile Documents/com~apple~CloudDocs/LPS/LPS_사업부/사업3과                 (대행사업)/한신대학교_연구소_웹사이트제작/AI_center-master`

## 목표

1. Google AI Studio 시안의 세련된 공식 연구소형 UI/UX를 실제 웹사이트로 실행 가능하게 유지합니다.
2. 교수님 원본 사이트의 실제 연구소 소개, 연구진, 연구성과, 공지사항, 연락처 정보를 새 사이트에 반영합니다.
3. Supabase 기반 CMS를 연결해 관리자 수정 내용이 서버 DB에 저장되도록 구성합니다.
4. GitHub/Vercel 배포와 장기 운영을 위한 문서, 구조, 관리자 정보를 남깁니다.

## 현재 실행 방법

```bash
cd /Users/dbsdud03/Documents/웹사이트제작/site
npm install
npm run dev
```

브라우저에서 `http://localhost:3000/`을 열면 현재 1차 구현 사이트를 볼 수 있습니다.

## 관리자 로그인

Supabase 환경변수가 설정되면 Supabase Auth 이메일/비밀번호 인증을 사용합니다. 환경변수가 없을 때만 로컬 시연용 임시 로그인을 사용합니다.

- 허용 이메일: `lps.official.231128@gmail.com`, `lubjugi3@hs.ac.kr`, `newmind68@hs.ac.kr`
- 로컬 임시 비밀번호: `admin1234`

정식 운영에서는 Supabase Auth에 위 이메일 계정을 생성하고, 각 계정의 비밀번호를 별도로 지정해야 합니다.

## 제작자 표시

사이트 하단과 패키지 정보에 제작자 정보를 남겨두었습니다.

- 제작: LPS Official
- 이메일: `lps.official.231128@gmail.com`
- 학교 이메일: `lubjugi3@hs.ac.kr`

## 폴더 구조

```text
.
├── README.md
├── docs/
│   ├── 00-project-overview.md
│   ├── 01-original-site-analysis.md
│   ├── 02-content-inventory.md
│   ├── 03-cloud-and-deployment.md
│   ├── 04-cms-admin-plan.md
│   ├── 05-roadmap.md
│   └── 06-beginner-concepts.md
├── site/
│   └── README.md
├── supabase/
│   └── README.md
├── assets/
│   └── README.md
├── scripts/
│   └── .gitkeep
└── original-project-reference/
    └── README.md
```

## 다음 작업

1차 구현은 `site/` 안에 있습니다. 다음 단계는 Supabase 프로젝트 생성, 마이그레이션 적용, GitHub 저장소 연결, Vercel 환경변수 등록 및 배포 순서로 진행합니다.
