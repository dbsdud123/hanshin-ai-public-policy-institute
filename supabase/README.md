# Supabase

Supabase 데이터베이스 스키마와 migration 파일을 관리하는 폴더입니다.

## 1차 CMS 구조

- 프로젝트명: `hanshin-ai-public-policy`
- Project ref: `svjbxfetepsoeudxgnoj`
- 리전: `ap-northeast-2`

- `site_content`: 연구소 소개, 연구진, 연구성과, 공지사항을 JSON으로 저장합니다.
- `inquiries`: 방문자 문의를 저장합니다.
- 공개 방문자는 `site_content.public_read = true`인 콘텐츠만 읽을 수 있습니다.
- 공개 방문자는 문의를 등록할 수 있지만 문의 목록은 볼 수 없습니다.
- 관리자 이메일만 콘텐츠 수정과 문의 관리를 할 수 있습니다.

## 관리자 이메일

- `lps.official.231128@gmail.com`
- `lubjugi3@hs.ac.kr`
- `newmind68@hs.ac.kr`

## 적용 파일

```bash
supabase/migrations/20260609000000_initial_cms.sql
```

Supabase 프로젝트 생성 후 이 마이그레이션을 적용하고, `site/.env.local` 또는 Vercel 환경변수에 아래 값을 넣습니다.

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

정식 관리자 로그인은 Supabase Auth의 이메일/비밀번호 계정을 사용합니다. 위 관리자 이메일 3개를 Auth 사용자로 만들고 비밀번호를 지정해야 합니다.
