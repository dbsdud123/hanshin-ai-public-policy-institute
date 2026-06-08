/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum MemberCategory {
  DIRECTOR = 'DIRECTOR',         // 연구소장
  RESEARCHER = 'RESEARCHER',     // 실장 / 연구위원 / 객원연구위원
  ADVISOR = 'ADVISOR',           // 자문위원단
}

export interface Member {
  id: string;
  name: string;
  title: string;          // 직위 (예: 소장, 연구위원, 수석실장 등)
  affiliation: string;    // 소속 (예: 한신대학교 공공정책학과 교수, AI학부 교수 등)
  email?: string;
  researchArea: string;   // 연구 분야
  category: MemberCategory;
  imageUrl?: string;      // 사진 URL (기본 아바타 사용 가능)
  order: number;          // 정렬 순서
}

export enum ResearchCategory {
  POLICY_REPORT = 'POLICY_REPORT',   // 정책보고서
  ACADEMIC_PAPER = 'ACADEMIC_PAPER', // 학술논문
  POLICY_BRIEF = 'POLICY_BRIEF',     // 정책브리프
  RESEARCH_REPORT = 'RESEARCH_REPORT', // 일반 연구보고서
}

export interface ResearchReport {
  id: string;
  title: string;
  authors: string;
  date: string;
  category: ResearchCategory;
  summary: string;
  tags: string[];
  pdfUrl?: string;
  downloadCount: number;
}

export enum NoticeCategory {
  NOTICE = 'NOTICE',         // 일반 공지사항
  SEMINAR = 'SEMINAR',       // 세미나/학술행사
  RECRUIT = 'RECRUIT',       // 채용/초빙
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: NoticeCategory;
  views: number;
  isPinned: boolean;
  attachments?: string[]; // 첨부파일 이름 리스트
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  affiliation: string;
  title: string;
  content: string;
  date: string;
  status: 'PENDING' | 'RESOLVED';
}

export interface InstituteIntro {
  purpose: string;         // 설립 목적
  vision: string;          // 비전
  mission: string;         // 미션
  coreValues: string[];    // 핵심 가치
  history: { year: string; event: string }[]; // 연혁
}
