# 한신대학교 AI 공공정책연구소 웹사이트

Google AI Studio에서 제작한 디자인 초안을 기반으로 구현한 한신대학교 AI 공공정책연구소 1차 시안입니다.

## 실행

```bash
npm install
npm run dev
```

기본 주소는 `http://localhost:3000/`입니다.

## 검증

```bash
npm run lint
npm run build
```

## 주요 구조

- `src/data.ts`: 사이트에 들어가는 소개, 연구진, 연구성과, 공지사항 기본 데이터
- `src/config.ts`: 제작자 정보, 관리자 허용 이메일, 임시 비밀번호
- `src/components/`: 화면별 React 컴포넌트

## 관리자

현재 관리자 기능은 1차 시연용입니다. localStorage에 저장되며, 정식 운영 전에는 Supabase Auth와 데이터베이스로 교체해야 합니다.

- 관리자 이메일: `lps.official.231128@gmail.com`, `lubjugi3@hs.ac.kr`, `newmind68@hs.ac.kr`
- 임시 비밀번호: `admin1234`

## 원본 AI Studio 앱

https://ai.studio/apps/6d308f82-620d-483a-9963-b6e00e102411
