# 한신대학교 AI 공공정책연구소 웹사이트

Google AI Studio에서 제작한 디자인 초안을 기반으로 구현한 한신대학교 AI 공공정책연구소 1차 시안입니다.

## 실행

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000/`입니다.

## 배포

- Production: https://hanshin-ai-public-policy-institute.vercel.app
- GitHub: https://github.com/dbsdud123/hanshin-ai-public-policy-institute

## 검증

```bash
npm run lint
npm run build
```

## 주요 구조

- `src/data.ts`: 사이트에 들어가는 소개, 연구진, 연구성과, 공지사항 기본 데이터
- `src/config.ts`: 제작자 정보, 관리자 허용 이메일, 로컬 임시 비밀번호
- `src/lib/supabase.ts`: Supabase 클라이언트 설정
- `src/lib/contentStore.ts`: Supabase CMS 저장/조회 로직
- `src/components/`: 화면별 React 컴포넌트

## 관리자

Supabase 환경변수가 설정되면 Supabase Auth와 데이터베이스를 사용합니다. 환경변수가 없으면 localStorage 기반 시연 모드로 동작합니다.

- 관리자 이메일: `lps.official.231128@gmail.com`, `lubjugi3@hs.ac.kr`, `newmind68@hs.ac.kr`, `nsc0203@hs.ac.kr`
- 로컬 임시 비밀번호: `admin1234`

## Supabase 환경변수

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Vercel 배포 시에도 동일한 환경변수를 등록해야 합니다.

## 원본 AI Studio 앱

https://ai.studio/apps/6d308f82-620d-483a-9963-b6e00e102411
