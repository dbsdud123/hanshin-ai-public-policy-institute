/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Member, MemberCategory, ResearchReport, ResearchCategory, Notice, NoticeCategory, InstituteIntro } from './types';

export const INITIAL_INTRO: InstituteIntro = {
  purpose: `한신대학교 AI 공공정책연구소는 국가·지자체의 AI 기반 공공혁신을 위한 연구 허브를 지향합니다. AI와 데이터 과학을 통해 행정의 과학화·투명화·효율화를 촉진하고, 공공가치 창출과 지역사회 문제 해결에 기여하기 위해 설립되었습니다.

연구소는 AI 거버넌스, 데이터 기반 정책 시뮬레이션, 공공행정 서비스 혁신, 지역사회 문제 해결형 AI 모델 개발을 중심으로 학술 연구와 정책 실증, 대외 협력을 함께 추진합니다.`,
  vision: `국가·지자체의 AI기반 공공혁신을 위한 연구 허브`,
  mission: `AI와 데이터 과학을 통해 행정의 과학화·투명화·효율화를 촉진하고, 공공가치 창출과 지역사회 문제 해결에 기여한다.`,
  coreValues: [
    '공공성 (Responsibility)',
    '신뢰성 (Reliability)',
    '투명성 (Transparency)',
    '포용성 (Inclusion)',
    '개방성 (Open Collaboration)'
  ],
  history: [
    { year: '2026', event: 'AI 정책 연구 및 대외 협력 본격 추진' },
    { year: '2025.12', event: '연구소 운영 체계 구축' },
    { year: '2025.12', event: '한신대학교 AI 공공정책연구소 설립' }
  ]
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: '노승철',
    title: '연구소장',
    affiliation: '한신대학교 공공인재빅데이터융합 전공 부교수',
    email: 'nsc0203@hs.ac.kr',
    researchArea: '공공데이터, 공간정보분석, ML모델개발',
    category: MemberCategory.DIRECTOR,
    imageUrl: '',
    order: 1
  },
  {
    id: 'm2',
    name: '윤건',
    title: 'AI 행정혁신실장',
    affiliation: '한신대학교 공공인재빅데이터융합 전공 부교수',
    email: 'kyoon2010@hs.ac.kr',
    researchArea: '공공관리, 데이터기반행정, AI 거버넌스, 정책평가모형',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 2
  },
  {
    id: 'm3',
    name: '장익현',
    title: 'AI 행정혁신실 연구위원',
    affiliation: '한신대학교 사회복지학 분야',
    researchArea: '사회복지학',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 3
  },
  {
    id: 'm4',
    name: '유영국',
    title: 'AI 행정혁신실 연구위원',
    affiliation: '한신대학교 평화교양대학',
    researchArea: '경제법',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 4
  },
  {
    id: 'm5',
    name: '유은하',
    title: 'AI 지역학연구실장',
    affiliation: '한신대학교 평화교양대학 교수',
    researchArea: 'AI 방법론 기반 지역학 연구',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 5
  },
  {
    id: 'm6',
    name: '주장환',
    title: 'AI 지역학연구실 연구위원',
    affiliation: '한신대학교 동아시아통상학 교수',
    email: 'joojh@hs.ac.kr',
    researchArea: '중국정치경제',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 6
  },
  {
    id: 'm7',
    name: '김계자',
    title: 'AI 지역학연구실 연구위원',
    affiliation: '한신대학교 평화교양대학',
    researchArea: '지역학 및 교양교육',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 7
  },
  {
    id: 'm8',
    name: '이석민',
    title: 'AI 개발창업실장',
    affiliation: '한신대학교 공공인재빅데이터융합 전공 부교수',
    email: 'newmind68@hs.ac.kr',
    researchArea: '정책분석평가, 인공지능 개발',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 8
  },
  {
    id: 'm9',
    name: '이남연',
    title: 'AI 개발창업실 연구위원',
    affiliation: '한신대학교 경영 분야',
    researchArea: '경영정보시스템',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 9
  },
  {
    id: 'm10',
    name: '이용걸',
    title: 'AI 개발창업실 연구위원',
    affiliation: '한신대학교 AISW 분야',
    researchArea: '컴퓨터공학',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 10
  },
  {
    id: 'm11',
    name: '김선래',
    title: '객원연구위원',
    affiliation: '제주대학교 조교수',
    researchArea: '북러관계, 중러관계',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 11
  },
  {
    id: 'm12',
    name: '허재철',
    title: '객원연구위원',
    affiliation: '대외경제정책연구원 실장',
    researchArea: '동아시아, 빅데이터, 커뮤니케이션',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 12
  },
  {
    id: 'm13',
    name: '조형진',
    title: '객원연구위원',
    affiliation: '인천대학교 부교수',
    researchArea: '중국, 동아시아',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 13
  },
  {
    id: 'm14',
    name: '윤석욱',
    title: '객원연구위원',
    affiliation: '충북대학교 교수',
    researchArea: 'EU, 국제정치경제',
    category: MemberCategory.RESEARCHER,
    imageUrl: '',
    order: 14
  },
  {
    id: 'm15',
    name: '이세원',
    title: '자문위원',
    affiliation: '국토연구원 부연구위원',
    researchArea: 'AI도시, 공간정보',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 15
  },
  {
    id: 'm16',
    name: '박정호',
    title: '자문위원',
    affiliation: '연세대학교 행정학과 조교수',
    email: 'jhpark.planner@yonsei.ac.kr',
    researchArea: '국가공간정보(GIS)정책, 주거/주택/부동산정책, 인구보건정책',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 16
  },
  {
    id: 'm17',
    name: '남태우',
    title: '자문위원',
    affiliation: '성균관대학교 국정전문대학원 교수',
    email: 'namtaewoo@skku.edu',
    researchArea: '디지털정부, 정보정책, 정부혁신',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 17
  },
  {
    id: 'm18',
    name: '성욱준',
    title: '자문위원',
    affiliation: '서울과학기술대학교 IT정책대학원 부교수',
    email: 'wjsung@seoultech.ac.kr',
    researchArea: 'IT Policy, Research Design & Methods, Evidence-based Policy',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 18
  },
  {
    id: 'm19',
    name: '최한별',
    title: '자문위원',
    affiliation: '전북대학교 행정학과 조교수',
    email: 'chb@jbnu.ac.kr',
    researchArea: '디지털정부, 성과관리',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 19
  },
  {
    id: 'm20',
    name: '박종수',
    title: '자문위원',
    affiliation: '숙명여자대학교 행정학과 부교수',
    email: 'jpark@sookmyung.ac.kr',
    researchArea: '조직행동, 조직관리, 공공리더십, 공공윤리',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 20
  },
  {
    id: 'm21',
    name: '이창용',
    title: '자문위원',
    affiliation: '고려대학교 행정학과 부교수',
    email: 'changyonglee@korea.ac.kr',
    researchArea: '정책 정보학, 디지털 전환, 기술경영 및 정책, 기계학습 및 딥러닝 응용',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 21
  },
  {
    id: 'm22',
    name: '오경석',
    title: '자문위원',
    affiliation: '영남대학교 경찰행정학과 부교수',
    email: 'gyeongseokoh@yu.ac.kr',
    researchArea: '범죄예방, 범죄학, 치안정책(인공지능 경찰활동 등)',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 22
  },
  {
    id: 'm23',
    name: '홍승헌',
    title: '자문위원',
    affiliation: '한국행정연구원 연구위원',
    email: 'seunghun.hong@kipa.re.kr',
    researchArea: '규제거버넌스, 신산업규제, 인공지능기반 레그테크',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 23
  },
  {
    id: 'm24',
    name: '박정원',
    title: '자문위원',
    affiliation: '국립경북대학교 행정학과 부교수',
    email: 'jwpark@anu.ac.kr',
    researchArea: '정책분석, 보건정책, 정부규제, 공공관리',
    category: MemberCategory.ADVISOR,
    imageUrl: '',
    order: 24
  }
];

export const INITIAL_RESEARCH: ResearchReport[] = [
  {
    id: 'r1',
    title: 'AI 윤리 가이드라인 연구보고서',
    authors: 'AI 공공정책연구소',
    date: '2025-01-10',
    category: ResearchCategory.RESEARCH_REPORT,
    summary: '국내 AI 개발 및 활용을 위한 윤리적 가이드라인을 제안하는 연구보고서입니다. 원본 임시 웹사이트 자료실에 게시된 주요 연구성과 항목을 기반으로 정리했습니다.',
    tags: ['AI 윤리', '공공정책', '가이드라인', '책임성'],
    downloadCount: 89
  },
  {
    id: 'r2',
    title: '생성형 AI의 사회적 영향 분석',
    authors: 'AI 공공정책연구소',
    date: '2024-12-01',
    category: ResearchCategory.POLICY_REPORT,
    summary: 'ChatGPT 등 생성형 AI가 교육, 노동, 창작 분야에 미치는 영향을 분석하고 공공정책 관점의 대응 방향을 검토하는 정책보고서입니다.',
    tags: ['생성형 AI', '사회영향', '교육', '노동'],
    downloadCount: 64
  },
  {
    id: 'r3',
    title: 'AI 규제 국제 비교 연구',
    authors: 'AI 공공정책연구소',
    date: '2024-11-15',
    category: ResearchCategory.RESEARCH_REPORT,
    summary: 'EU AI Act, 미국, 중국 등 주요국 AI 규제 동향을 비교하고 국내 공공정책 설계에 필요한 시사점을 정리한 연구자료입니다.',
    tags: ['AI 규제', '국제비교', 'EU AI Act', '정책동향'],
    downloadCount: 72
  },
  {
    id: 'r4',
    title: 'AI 기술 발전과 일자리 변화',
    authors: 'AI 공공정책연구소',
    date: '2024-10-30',
    category: ResearchCategory.POLICY_BRIEF,
    summary: 'AI 기술 도입에 따른 노동시장 변화 전망과 정책적 대응 방향을 요약한 정책브리프입니다.',
    tags: ['일자리', '노동시장', '정책브리프', 'AI 전환'],
    downloadCount: 51
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: '한신대학교 AI 공공정책연구소 설립 공지',
    content: `안녕하세요.

한신대학교 AI 공공정책연구소가 2025년 12월 29일 한신대학교 학술원 산하 연구소로 공식 설립되었음을 알려드립니다.

■ 연구소 개요
- 명칭: 한신대학교 AI 공공정책연구소
- 설립일: 2025년 12월 29일
- 소속: 한신대학교 학술원
- 비전: 국가·지자체의 AI기반 공공혁신을 위한 연구 허브

■ 연구소 구성
- 연구소장: 노승철 교수
- AI 행정혁신실 (실장: 윤건 교수)
- AI 지역학연구실
- AI 개발창업실 (실장: 이석민 교수)

■ 미션
AI와 데이터 과학을 통해 행정의 과학화·투명화·효율화를 촉진하고, 공공가치 창출과 지역사회 문제 해결에 기여합니다.

■ 핵심가치
- 공공성 (Responsibility)
- 신뢰성 (Reliability)
- 투명성 (Transparency)
- 포용성 (Inclusion)
- 개방성 (Open Collaboration)

앞으로 AI 기술을 통한 공공혁신 연구에 최선을 다하겠습니다.
많은 관심과 협력 부탁드립니다.

감사합니다.

한신대학교 AI 공공정책연구소`,
    date: '2025-12-29',
    author: '관리자',
    category: NoticeCategory.NOTICE,
    views: 1,
    isPinned: true
  },
  {
    id: 'n2',
    title: '2025년 상반기 AI 정책 세미나 개최 안내',
    content: `안녕하세요, AI 공공정책연구소입니다.

2025년 상반기 AI 정책 세미나를 아래와 같이 개최합니다.

■ 일시: 2025년 4월 15일(월) 14:00-17:00
■ 장소: 한신대학교 소통관
■ 주제: "생성형 AI 시대의 정책 방향"

■ 프로그램
- 14:00-14:30 개회 및 기조연설
- 14:30-15:30 발표 1: 생성형 AI의 현황과 전망
- 15:30-15:50 휴식
- 15:50-16:50 발표 2: AI 규제 정책의 국제 동향
- 16:50-17:00 폐회

많은 관심과 참여 부탁드립니다.

감사합니다.`,
    date: '2025-01-15',
    author: '관리자',
    category: NoticeCategory.SEMINAR,
    views: 156,
    isPinned: true
  },
  {
    id: 'n3',
    title: 'AI 윤리 가이드라인 연구보고서',
    content: `AI 윤리 가이드라인 연구보고서를 공유합니다.

본 보고서는 국내 AI 개발 및 활용을 위한 윤리적 가이드라인을 제안합니다.

자세한 내용은 연구성과 메뉴를 참고해 주세요.`,
    date: '2025-01-10',
    author: '김연구',
    category: NoticeCategory.NOTICE,
    views: 89,
    isPinned: false
  },
  {
    id: 'n4',
    title: '연구소 방문 문의 안내',
    content: `안녕하세요.

연구소 방문 및 협력 문의는 연락처 메뉴의 공식 문의 양식을 통해 접수해 주시기 바랍니다.

가능한 일정과 방문 목적을 함께 남겨주시면 확인 후 회신드리겠습니다.`,
    date: '2025-01-08',
    author: '관리자',
    category: NoticeCategory.NOTICE,
    views: 23,
    isPinned: false
  }
];

const STORAGE_PREFIX = 'hs_aipp_real_content_v1_';

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(STORAGE_PREFIX + key);
    if (!val) return defaultValue;
    return JSON.parse(val);
  } catch (e) {
    console.error('Error reading localStorage for ' + key, e);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, val: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
  } catch (e) {
    console.error('Error writing localStorage for ' + key, e);
  }
}
