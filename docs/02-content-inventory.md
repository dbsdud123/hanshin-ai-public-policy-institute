# 콘텐츠 위치 정리

이 문서는 원본 웹사이트의 정보가 어디에 들어 있는지 정리한 지도입니다.

## 홈페이지

파일: `app/page.tsx`

포함 내용:

- 영문 연구소명
- 메인 카피: `인공지능으로 설계하는 공공정책의 미래`
- 소개 문장
- AI Governance 섹션
- Data Intelligence 섹션
- 연구실 안내 3개
- 연구 협력 및 문의 CTA

현재 상태:

- 전부 코드에 하드코딩되어 있습니다.
- 관리자가 웹에서 수정할 수 없습니다.

## 연구소 소개

파일: `app/about/page.tsx`

포함 내용:

- 비전
- 미션
- 핵심가치
- 핵심과제
- 연구실 설명
- 연혁
- 조직 구성

현재 상태:

- 전부 코드에 하드코딩되어 있습니다.
- CMS화 1순위입니다.

## 연구진

파일: `app/members/page.tsx`

보조 원본: `p.xlsx`

포함 내용:

- 연구소장
- AI행정혁신실
- AI지역학연구실
- AI개발창업실
- 운영위원회
- 자문위원단

현재 상태:

- `p.xlsx`에 명단 원본이 있습니다.
- 실제 웹사이트는 `p.xlsx`를 읽지 않고, `app/members/page.tsx` 안의 TypeScript 배열을 표시합니다.
- 일부 연락처는 엑셀과 코드가 다릅니다. 예를 들어 엑셀에는 연구소장 휴대전화가 있으나 코드에는 연구실 전화가 표시됩니다.

리뉴얼 권장:

- `people`, `labs`, `roles`, `affiliations` 같은 DB 테이블로 분리
- 공개 연락처와 내부 관리 연락처를 별도 필드로 분리
- 관리자에서 정렬 순서, 공개 여부, 소속, 직위, 연구분야를 수정 가능하게 구성

## 연구성과

파일: `app/research/page.tsx`

포함 내용:

- 테스트 연구보고서 4개
- 카테고리 필터 UI

현재 상태:

- 실제 필터 기능은 없습니다.
- 연구성과 데이터는 코드 배열입니다.
- 파일 업로드/링크/상세 페이지가 없습니다.

리뉴얼 권장:

- `research_outputs` 테이블 사용
- 보고서 파일, 외부 링크, 저자, 연도, 카테고리, 공개 여부, 대표 이미지 필드 추가
- 관리자에서 PDF 업로드 가능하게 구성

## 게시판

파일:

- `app/board/page.tsx`
- `app/board/[id]/page.tsx`
- `app/board/write/WriteForm.tsx`
- `app/board/[id]/CommentSection.tsx`
- `app/board/[id]/DeleteButton.tsx`

DB:

- `posts`
- `comments`
- `attachments`

현재 상태:

- Supabase DB 연동이 되어 있습니다.
- 글 작성/수정/삭제, 댓글, 첨부파일 업로드 흐름이 있습니다.
- DB 데이터가 없거나 조회 실패 시 샘플 데이터가 표시됩니다.

리뉴얼 권장:

- 샘플 fallback 제거
- 공지/자료/뉴스/보도자료 등 공식 사이트형 카테고리 재정의
- 첨부파일 권한 정책 정리
- 관리자만 공지 작성 가능 여부 결정

## 연락처

파일: `app/contact/page.tsx`

포함 내용:

- 주소
- 이메일
- 전화번호
- 소속
- 문의 폼 UI
- Google Maps iframe

현재 상태:

- 문의 폼은 제출 기능이 없습니다.
- 연락처 정보는 코드에 하드코딩되어 있습니다.

리뉴얼 권장:

- 문의 폼은 Supabase `inquiries` 테이블 또는 이메일 발송 API로 연결
- 스팸 방지 장치 추가
- 관리자에서 문의 확인/처리 상태 변경 가능하게 구성

## 공통 레이아웃

파일:

- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `app/layout.tsx`
- `app/globals.css`

포함 내용:

- 상단 연락처
- 메뉴
- 로그인/회원가입/관리자 버튼
- 하단 주소/저작권
- 메타데이터

현재 상태:

- 공통 연락처와 메뉴도 코드에 있습니다.
- 관리자에서 메뉴/푸터 문구를 수정할 수 없습니다.
