# 클라우드와 배포 구조

## 현재 공개 주소

현재 웹사이트는 다음 주소에서 확인됩니다.

https://ai-policy-institute.vercel.app/

검색과 실제 페이지 확인 결과, 로컬 원본 코드와 동일한 콘텐츠가 배포되어 있습니다.

## 현재 구조 추정

```text
사용자 브라우저
  ↓
Vercel에 배포된 Next.js 웹사이트
  ↓
Supabase
  ├── Auth: 로그인/회원가입/Google 로그인
  ├── Database: 게시글, 댓글, 첨부파일 메타데이터, 사용자 역할
  └── Storage: 첨부파일 업로드
```

## Vercel이 하는 일

Vercel은 Next.js 사이트를 인터넷에 올려 주는 배포 서비스입니다.

- GitHub 저장소와 연결 가능
- push하면 자동 배포 가능
- 환경변수 관리 가능
- 무료 플랜으로 시작 가능
- Next.js와 궁합이 좋음

## Supabase가 하는 일

Supabase는 웹사이트의 서버 역할을 대신해 주는 서비스입니다.

- Database: 게시글, 연구진, 연구성과 같은 데이터를 저장
- Auth: 로그인, 회원가입, Google 로그인 처리
- Storage: PDF, 이미지, 첨부파일 저장
- RLS: 사용자가 볼 수 있는 데이터와 수정할 수 있는 데이터를 제한

## 필요한 환경변수

원본 기준 필수 환경변수는 다음입니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

리뉴얼에서는 관리자 전용 서버 API를 만들 가능성이 높으므로 다음도 필요할 수 있습니다.

```bash
SUPABASE_SERVICE_ROLE_KEY=...
```

주의: `SUPABASE_SERVICE_ROLE_KEY`는 절대 브라우저에 노출하면 안 됩니다. 서버 Route Handler나 Server Action에서만 사용해야 합니다.

## 원본의 Supabase 프로젝트 단서

`SUPABASE_SETUP.md`에 다음 프로젝트 ID가 적혀 있습니다.

```text
nnahzwqjmounacacbihr
```

문서에는 `https://nnahzwqjmounacacbihr.supabase.co`가 예시로 적혀 있습니다. 실제 운영 프로젝트인지, 개발용 프로젝트인지 확인이 필요합니다.

## 리뉴얼 배포 권장안

1. GitHub 새 저장소 또는 기존 저장소 새 브랜치 결정
2. Supabase 새 프로젝트 생성 또는 기존 프로젝트 인수 여부 결정
3. DB migration 파일을 `supabase/migrations`로 관리
4. Vercel 프로젝트 생성
5. Vercel 환경변수 등록
6. `main` 브랜치 자동 배포, `preview` 브랜치 미리보기 배포 운영

## 도메인 권장

현재는 Vercel 기본 도메인입니다. 공식 웹사이트라면 학교 도메인 하위 주소를 권장합니다.

예시:

- `ai-policy.hs.ac.kr`
- `aipp.hs.ac.kr`
- `policyai.hs.ac.kr`

학교 전산팀 또는 도메인 담당 부서와 DNS 연결을 협의해야 합니다.
