# 원본 웹사이트 정밀 분석

## 확인한 원본

- GitHub: `https://github.com/LeeSeogMin/AI_center.git`
- 원격 브랜치: `master`
- 확인 커밋: `59b062b33e0dea9194f095b41e2c969603de4cf9`
- 아이클라우드 원본: `AI_center-master`
- 공개 배포 주소: `https://ai-policy-institute.vercel.app/`

아이클라우드 원본과 GitHub 원격 저장소는 `.git`, `.DS_Store` 같은 메타 파일을 제외하면 파일 차이가 없었습니다.

## 기술 스택

- 프레임워크: Next.js 14 App Router
- 언어: TypeScript
- UI: React 18
- 스타일: Tailwind CSS
- UI 컴포넌트: shadcn/ui 스타일의 자체 컴포넌트, Radix UI 일부 사용
- 아이콘: lucide-react
- 백엔드/DB/Auth/Storage: Supabase
- 배포 추정: Vercel

## 실행 방식

원본 프로젝트 루트에서 실행합니다.

```bash
npm install
npm run dev
```

개발 서버 기본 주소는 `http://localhost:3000`입니다.

프로덕션 빌드는 다음 명령입니다.

```bash
npm run build
npm start
```

## 주요 라우트

- `/`: 홈페이지
- `/about`: 연구소 소개
- `/members`: 연구진
- `/research`: 연구성과
- `/board`: 게시판 목록
- `/board/[id]`: 게시글 상세
- `/board/write`: 게시글 작성/수정
- `/login`: 로그인
- `/register`: 회원가입
- `/auth/callback`: Supabase OAuth 콜백
- `/admin`: 관리자 대시보드

## 실제 데이터 흐름

현재 원본은 두 종류의 데이터 흐름이 섞여 있습니다.

1. DB에서 가져오는 데이터
   - 게시글: `posts`
   - 댓글: `comments`
   - 첨부파일: `attachments`
   - 사용자 역할: `user_roles`

2. 코드 안에 박혀 있는 데이터
   - 홈페이지 문구
   - 연구소 소개, 비전, 미션, 핵심가치, 핵심과제
   - 연구실 설명
   - 연구진, 자문위원단
   - 연구성과 테스트 목록
   - 연락처, 주소, 지도

즉 현재 사이트는 게시판 중심으로만 관리자/DB 구조가 있고, 공식 웹사이트의 핵심 정보는 대부분 개발자가 코드로 수정해야 합니다.

## Supabase 구조

원본에는 SQL 파일이 3개 있습니다.

- `supabase_setup.sql`: 게시판 기본 테이블
- `supabase_setup_with_admin.sql`: 게시판 + `user_roles` 관리자 역할 구조
- `supabase-schema.sql`: `profiles`, `members`, `research`까지 포함한 확장 스키마 초안

하지만 실제 코드에서 `members`, `research`, `profiles` 테이블은 거의 사용하지 않습니다. 특히 `/members`와 `/research`는 DB가 아니라 코드 배열을 렌더링합니다.

## 관리자 페이지 상태

`/admin`은 관리자 권한 확인 후 다음을 보여줍니다.

- 전체 게시글 수
- 전체 사용자 수
- 관리자 수
- 게시글 목록
- 사용자 역할 목록

현재 한계는 다음과 같습니다.

- 소개글, 연구진, 연구성과, 연락처를 수정하는 에디터가 없습니다.
- 사용자 역할 변경도 화면에서 못 하고 Supabase 대시보드에서 SQL로 처리해야 합니다.
- `supabase.auth.admin.listUsers()`를 일반 Supabase anon key 클라이언트로 호출하고 있어 실서비스에서 실패할 가능성이 큽니다. 이 기능은 보통 service role key가 필요한 서버 전용 API로 분리해야 합니다.

## 보안/운영 리스크

- 테스트용 샘플 게시글과 댓글이 코드에 남아 있습니다.
- Supabase 연결 실패 시 가짜 데이터가 표시될 수 있습니다.
- 관리자 페이지는 로그인 여부는 middleware에서 막지만, 진짜 관리자 여부는 페이지 안에서 검사합니다.
- 첨부파일 Storage 정책과 DB 정책이 서로 어긋날 수 있습니다.
- 개인 전화번호/이메일이 연구진 페이지에 공개되어 있어 공개 범위를 재검토해야 합니다.
- 문의 폼은 화면만 있고 실제 제출 처리 기능은 없습니다.

## 디자인 상태

원본은 기본적인 공식 사이트 느낌은 있으나, 아직 임시 제작 흔적이 많습니다.

- 인디고/블루 계열이 반복되어 단조롭습니다.
- 영웅 영역과 섹션이 카드/일러스트 중심이라 연구소 공식성보다 스타트업 랜딩 페이지에 가깝습니다.
- 이미지 파일 확장자는 `.png`지만 실제 파일 포맷은 JPEG입니다.
- `bg-${lab.color}-50` 같은 동적 Tailwind 클래스는 빌드 시 누락될 수 있습니다.
- `grid.svg` 배경을 참조하지만 public 폴더에 해당 파일이 없습니다.
- 일부 문구 오탈자가 있습니다. 예: `이끍니다`, `성사시키기`

## 결론

원본은 좋은 출발점입니다. Next.js, Supabase, 인증, 게시판의 기본 골격은 재사용할 가치가 있습니다. 그러나 공식 웹사이트로 키우려면 “디자인 개선”보다 먼저 “콘텐츠 관리 구조”를 새로 잡아야 합니다.
