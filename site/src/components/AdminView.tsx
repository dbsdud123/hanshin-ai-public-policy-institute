/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, Trash2, Edit2, Save, Check, X, FileText, Users, Megaphone, 
  HelpCircle, History, Award, BookOpen, ExternalLink, RefreshCw 
} from 'lucide-react';
import { 
  Member, MemberCategory, ResearchReport, ResearchCategory, 
  Notice, NoticeCategory, Inquiry, InstituteIntro 
} from '../types';

interface AdminViewProps {
  intro: InstituteIntro;
  setIntro: React.Dispatch<React.SetStateAction<InstituteIntro>>;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  research: ResearchReport[];
  setResearch: React.Dispatch<React.SetStateAction<ResearchReport[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  setActiveTab: (tab: string) => void;
  syncStatus?: string;
}

type AdminSubTab = 'intro' | 'members' | 'research' | 'notices' | 'inquiries';

export default function AdminView({
  intro,
  setIntro,
  members,
  setMembers,
  research,
  setResearch,
  notices,
  setNotices,
  inquiries,
  setInquiries,
  setActiveTab,
  syncStatus,
}: AdminViewProps) {
  const [subTab, setSubTab] = useState<AdminSubTab>('intro');

  // Intro Form states
  const [introForm, setIntroForm] = useState<InstituteIntro>({ ...intro });
  const [newHistoryYear, setNewHistoryYear] = useState('');
  const [newHistoryEvent, setNewHistoryEvent] = useState('');
  const [newValueText, setNewValueText] = useState('');

  // Editing state trackers
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingResearchId, setEditingResearchId] = useState<string | null>(null);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);

  // Success messages
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. INTRO ACTIONS
  const handleSaveIntro = () => {
    setIntro(introForm);
    triggerToast('연구소 소개 및 기본 가치가 성공적으로 저장되었습니다.');
  };

  const handleAddHistory = () => {
    if (!newHistoryYear || !newHistoryEvent) return;
    const updatedHistory = [...introForm.history, { year: newHistoryYear, event: newHistoryEvent }];
    setIntroForm({
      ...introForm,
      history: updatedHistory.sort((a, b) => b.year.localeCompare(a.year)),
    });
    setNewHistoryYear('');
    setNewHistoryEvent('');
    triggerToast('새 연혁 정보가 추가되었습니다. (임시 저장 상태)');
  };

  const handleRemoveHistory = (idx: number) => {
    const updatedHistory = introForm.history.filter((_, i) => i !== idx);
    setIntroForm({ ...introForm, history: updatedHistory });
    triggerToast('연혁 항목이 제거되었습니다.');
  };

  const handleAddCoreValue = () => {
    if (!newValueText) return;
    setIntroForm({
      ...introForm,
      coreValues: [...introForm.coreValues, newValueText],
    });
    setNewValueText('');
    triggerToast('새 핵심 가치가 추가되었습니다.');
  };

  const handleRemoveCoreValue = (idx: number) => {
    setIntroForm({
      ...introForm,
      coreValues: introForm.coreValues.filter((_, i) => i !== idx),
    });
    triggerToast('핵심 가치 항목이 제거되었습니다.');
  };

  // 2. MEMBER FORM STATES & ACTIONS
  const [newMember, setNewMember] = useState<Omit<Member, 'id'>>({
    name: '',
    title: '',
    affiliation: '',
    researchArea: '',
    category: MemberCategory.RESEARCHER,
    order: 10,
    email: '',
    imageUrl: '',
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.title || !newMember.affiliation) return;
    const added: Member = {
      ...newMember,
      id: 'm-' + Date.now(),
    };
    setMembers((prev) => [...prev, added]);
    setNewMember({
      name: '',
      title: '',
      affiliation: '',
      researchArea: '',
      category: MemberCategory.RESEARCHER,
      order: 10,
      email: '',
      imageUrl: '',
    });
    triggerToast(`연구자 ${added.name}님이 신규 등록되었습니다.`);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (confirm(`${name} 연구원 데이터를 영구 삭제하시겠습니까?`)) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      triggerToast('연구진이 명단에서 해제되었습니다.');
    }
  };

  const handleUpdateMemberField = (id: string, field: keyof Member, value: any) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // 3. RESEARCH FORM STATES & ACTIONS
  const [newReport, setNewReport] = useState<Omit<ResearchReport, 'id' | 'downloadCount'>>({
    title: '',
    authors: '',
    date: new Date().toISOString().substring(0, 10),
    category: ResearchCategory.POLICY_REPORT,
    summary: '',
    tags: [],
  });
  const [newReportTag, setNewReportTag] = useState('');

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.title || !newReport.authors) return;
    const added: ResearchReport = {
      ...newReport,
      id: 'r-' + Date.now(),
      downloadCount: 0,
    };
    setResearch((prev) => [added, ...prev]);
    setNewReport({
      title: '',
      authors: '',
      date: new Date().toISOString().substring(0, 10),
      category: ResearchCategory.POLICY_REPORT,
      summary: '',
      tags: [],
    });
    setNewReportTag('');
    triggerToast(`정책 보고서 "${added.title}"가 성과 아카이브에 기증 등재되었습니다.`);
  };

  const handleDeleteReport = (id: string, title: string) => {
    if (confirm(`주요 연구성과 [${title}]를 명단에서 제거하시겠습니까?`)) {
      setResearch((prev) => prev.filter((r) => r.id !== id));
      triggerToast('해당 보고서가 삭제되었습니다.');
    }
  };

  const handleUpdateReportField = (id: string, field: keyof ResearchReport, value: any) => {
    setResearch((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (field === 'tags' && typeof value === 'string') {
            return { ...r, tags: value.split(',').map(t => t.trim()) };
          }
          return { ...r, [field]: value };
        }
        return r;
      })
    );
  };

  // 4. NOTICE FORM STATES & ACTIONS
  const [newNotice, setNewNotice] = useState<Omit<Notice, 'id' | 'views'>>({
    title: '',
    content: '',
    date: new Date().toISOString().substring(0, 10),
    author: 'AI 공공정책연구소 사무국',
    category: NoticeCategory.NOTICE,
    isPinned: false,
    attachments: [],
  });

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    const added: Notice = {
      ...newNotice,
      id: 'n-' + Date.now(),
      views: 0,
    };
    setNotices((prev) => [added, ...prev]);
    setNewNotice({
      title: '',
      content: '',
      date: new Date().toISOString().substring(0, 10),
      author: 'AI 공공정책연구소 사무국',
      category: NoticeCategory.NOTICE,
      isPinned: false,
      attachments: [],
    });
    triggerToast(`새 공지글 "${added.title}"이 게시판에 등재되었습니다.`);
  };

  const handleDeleteNotice = (id: string, title: string) => {
    if (confirm(`게시글 [${title}]을 정식 삭제하시겠습니까?`)) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
      triggerToast('공지사항이 영구 삭제되었습니다.');
    }
  };

  const handleUpdateNoticeField = (id: string, field: keyof Notice, value: any) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [field]: value } : n))
    );
  };

  // 5. INQUIRIES ACTIONS
  const handleResolveInquiry = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'RESOLVED' as const } : inq))
    );
    triggerToast('문의 사항이 검토 및 처리완료 건으로 갱신되었습니다.');
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('접수된 문의 원본 내역을 서버 보안 파기하시겠습니까?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      triggerToast('접수 티켓이 정상적으로 파기 삭제되었습니다.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8 animate-fade-in text-left">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#004a99] text-white px-5 py-3 rounded-xl border border-blue-600 shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-xs font-bold text-[#004a99] tracking-widest uppercase">ADMINISTRATION CONTROL CENTER</h2>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1 font-sans">연구소 관리센터</h1>
          <p className="text-slate-500 text-sm mt-1">
            코딩을 몰라도 소개글, 연구진 명단, 연구보고서, 학술게시판, 접수된 문의 내역까지 원클릭으로 수정 관리할 수 있습니다.
          </p>
          {syncStatus && (
            <p className="text-[11px] text-slate-400 mt-2 font-bold">
              저장 상태: {syncStatus}
            </p>
          )}
        </div>
        <button
          onClick={() => setActiveTab('home')}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" /> 홈페이지 라이브뷰 가기
        </button>
      </div>

      {/* Grid: Bento Control Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (3 span) */}
        <div className="lg:col-span-3 bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-2">콘텐츠 통합 관리 모듈</h3>
          
          <button
            onClick={() => setSubTab('intro')}
            className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-lg text-[14px] font-semibold tracking-tight transition-all cursor-pointer text-left ${
              subTab === 'intro'
                ? 'bg-[#004a99]/10 text-[#004a99] border-l-2 border-[#004a99]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <History className="w-4 h-4" /> 연구소 소개 및 연혁
          </button>

          <button
            onClick={() => setSubTab('members')}
            className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-lg text-[14px] font-semibold tracking-tight transition-all cursor-pointer text-left ${
              subTab === 'members'
                ? 'bg-[#004a99]/10 text-[#004a99] border-l-2 border-[#004a99]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <Users className="w-4 h-4" /> 연구진 및 자문위원
          </button>

          <button
            onClick={() => setSubTab('research')}
            className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-lg text-[14px] font-semibold tracking-tight transition-all cursor-pointer text-left ${
              subTab === 'research'
                ? 'bg-[#004a99]/10 text-[#004a99] border-l-2 border-[#004a99]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 정책 연구성과물
          </button>

          <button
            onClick={() => setSubTab('notices')}
            className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-lg text-[14px] font-semibold tracking-tight transition-all cursor-pointer text-left ${
              subTab === 'notices'
                ? 'bg-[#004a99]/10 text-[#004a99] border-l-2 border-[#004a99]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <Megaphone className="w-4 h-4" /> 공지 및 세미나일정
          </button>

          <button
            onClick={() => setSubTab('inquiries')}
            className={`w-full flex items-center justify-between px-4.5 py-3 rounded-lg text-[14px] font-semibold tracking-tight transition-all cursor-pointer ${
              subTab === 'inquiries'
                ? 'bg-[#004a99]/10 text-[#004a99] border-l-2 border-[#004a99]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4" /> 접수 문의 내역
            </span>
            {inquiries.filter((i) => i.status === 'PENDING').length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold">
                {inquiries.filter((i) => i.status === 'PENDING').length}
              </span>
            )}
          </button>

          <div className="hr border-t border-slate-150 my-4" />

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-500">
            <p className="font-extrabold text-slate-700">💡 관리자 모드 안내</p>
            <p className="leading-relaxed">관리자 대시보드 내 변경사항은 Supabase 연결 시 서버 DB에 저장되고, 미연결 시 로컬 시안 데이터로 보존됩니다.</p>
          </div>
        </div>

        {/* Content Pane (9 col span) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: INTRO EDITOR */}
          {subTab === 'intro' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">연구소 소개글 및 핵심 규범가치 관리</h2>
                <p className="text-xs text-slate-400">연구소 설립취지, 비전, 핵심가치 및 주요 연혁을 수정합니다.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-600">설립 목적 (Purpose)</label>
                  <textarea
                    rows={4}
                    value={introForm.purpose}
                    onChange={(e) => setIntroForm({ ...introForm, purpose: e.target.value })}
                    className="w-full text-sm p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#004a99] focus:ring-1 focus:ring-[#004a99] leading-relaxed resize-none font-medium text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-600">연구비전 (Vision)</label>
                    <input
                      type="text"
                      value={introForm.vision}
                      onChange={(e) => setIntroForm({ ...introForm, vision: e.target.value })}
                      className="w-full text-sm p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#004a99] font-medium text-slate-800"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-600">미션 선언문 (Mission)</label>
                    <input
                      type="text"
                      value={introForm.mission}
                      onChange={(e) => setIntroForm({ ...introForm, mission: e.target.value })}
                      className="w-full text-sm p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#004a99] font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Core values list */}
                <div className="space-y-2 border-t border-slate-100 pt-4 text-left">
                  <span className="text-xs font-bold text-slate-600 block">4대 핵심 규율가치 목록</span>
                  <div className="flex flex-wrap gap-2">
                    {introForm.coreValues.map((val, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-250 text-slate-700 text-xs font-semibold rounded-lg shadow-3xs">
                        {val}
                        <button onClick={() => handleRemoveCoreValue(idx)} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1 max-w-md">
                    <input
                      type="text"
                      placeholder="새 핵심 가치 기입..."
                      value={newValueText}
                      onChange={(e) => setNewValueText(e.target.value)}
                      className="text-xs p-2 rounded border border-slate-200 grow font-medium"
                    />
                    <button
                      onClick={handleAddCoreValue}
                      className="px-3 bg-slate-900 text-white rounded text-xs font-bold cursor-pointer"
                    >
                      추가
                    </button>
                  </div>
                </div>

                {/* History timeline list view editor */}
                <div className="space-y-3 border-t border-slate-100 pt-4 text-left">
                  <span className="text-xs font-bold text-slate-600 block">공식 주요 연혁 편집 목록</span>
                  <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                    {introForm.history.map((hist, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-lg text-xs font-medium">
                        <div className="flex gap-3">
                          <span className="font-extrabold text-[#004a99] font-mono shrink-0">{hist.year}</span>
                          <span className="text-slate-700 line-clamp-1">{hist.event}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveHistory(idx)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add history widget */}
                  <div className="flex flex-wrap gap-2 pt-1 items-end">
                    <div className="grow sm:w-1/4">
                      <input
                        type="text"
                        placeholder="연월 (예: 2026.06)"
                        value={newHistoryYear}
                        onChange={(e) => setNewHistoryYear(e.target.value)}
                        className="w-full text-xs p-2.5 rounded border border-slate-200 font-mono font-bold"
                      />
                    </div>
                    <div className="grow sm:w-3/5">
                      <input
                        type="text"
                        placeholder="연혁 성과 내용 상세"
                        value={newHistoryEvent}
                        onChange={(e) => setNewHistoryEvent(e.target.value)}
                        className="w-full text-xs p-2.5 rounded border border-slate-200 font-medium"
                      />
                    </div>
                    <button
                      onClick={handleAddHistory}
                      className="px-4.5 py-2.5 bg-[#004a99] hover:bg-blue-800 text-white rounded text-xs font-bold cursor-pointer shrink-0"
                    >
                      연혁 추가
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 pt flex justify-end">
                  <button
                    onClick={handleSaveIntro}
                    className="px-6 py-3 bg-[#004a99] hover:bg-blue-800 text-white rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> 변경사항 통합 즉시 저장
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERS LIST EDITOR */}
          {subTab === 'members' && (
            <div className="space-y-6">
              {/* Add form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-left">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">신규 위원 및 연구진 정식 추가 등록</h3>
                
                <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">성함 *</label>
                    <input
                      required
                      type="text"
                      placeholder="성함 기입"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">직위 / 대외 자위 *</label>
                    <input
                      required
                      type="text"
                      placeholder="예) 소장, 상임연구관, 자문위원"
                      value={newMember.title}
                      onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">공식 소속 대학·기관 *</label>
                    <input
                      required
                      type="text"
                      placeholder="예) 한신대 공공행정학과 교수"
                      value={newMember.affiliation}
                      onChange={(e) => setNewMember({ ...newMember, affiliation: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500">담당 및 핵심 연구분야 *</label>
                    <input
                      required
                      type="text"
                      placeholder="예) AI 법학 지능형 정책, 공공데이터, 로봇행정법"
                      value={newMember.researchArea}
                      onChange={(e) => setNewMember({ ...newMember, researchArea: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">연구진 부류구분 *</label>
                    <select
                      value={newMember.category}
                      onChange={(e) => setNewMember({ ...newMember, category: e.target.value as MemberCategory })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
                    >
                      <option value={MemberCategory.DIRECTOR}>연구소장 (DIRECTOR)</option>
                      <option value={MemberCategory.RESEARCHER}>상임 및 객원연구위원</option>
                      <option value={MemberCategory.ADVISOR}>대외 정책자문단</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:col-span-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500">연구소장 메일 연락처</label>
                      <input
                        type="email"
                        placeholder="nsc0203@hs.ac.kr"
                        value={newMember.email || ''}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500">정렬 순위 (정수)</label>
                      <input
                        type="number"
                        placeholder="1~100"
                        value={newMember.order}
                        onChange={(e) => setNewMember({ ...newMember, order: parseInt(e.target.value) || 10 })}
                        className="w-full text-xs p-2.5 rounded border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="pt-4 md:col-span-1 flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#004a99] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> 연구진 정식 위촉
                    </button>
                  </div>
                </form>
              </div>

              {/* Members listing and instant editing row */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-left space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">전체 수록 연구인력 편집 명단 ({members.length}명)</h3>
                <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {members
                    .sort((a, b) => a.order - b.order)
                    .map((m) => (
                      <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex justify-between items-center bg-white p-2 border border-slate-150 rounded-lg">
                          <span className="text-xs font-extrabold text-[#004a99]">[ID: {m.id}] 정렬순위: {m.order}</span>
                          <div className="flex gap-2">
                            {editingMemberId === m.id ? (
                              <button
                                onClick={() => setEditingMemberId(null)}
                                className="px-2.5 py-1 text-[10px] font-extrabold text-white bg-slate-900 rounded cursor-pointer"
                              >
                                저장완료
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingMemberId(m.id)}
                                className="px-2.5 py-1 text-[10px] font-extrabold text-slate-700 bg-white border border-slate-250 rounded cursor-pointer flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" /> 빠른 필드 수정
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMember(m.id, m.name)}
                              className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {editingMemberId === m.id ? (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={m.name}
                              onChange={(e) => handleUpdateMemberField(m.id, 'name', e.target.value)}
                              placeholder="이름"
                              className="text-xs p-2 rounded border bg-white"
                            />
                            <input
                              type="text"
                              value={m.title}
                              onChange={(e) => handleUpdateMemberField(m.id, 'title', e.target.value)}
                              placeholder="직위"
                              className="text-xs p-2 rounded border bg-white"
                            />
                            <input
                              type="text"
                              value={m.affiliation}
                              onChange={(e) => handleUpdateMemberField(m.id, 'affiliation', e.target.value)}
                              placeholder="소속"
                              className="text-xs p-2 rounded border bg-white"
                            />
                            <input
                              type="text"
                              value={m.researchArea}
                              onChange={(e) => handleUpdateMemberField(m.id, 'researchArea', e.target.value)}
                              placeholder="연구분야"
                              className="text-xs p-2 rounded border bg-white sm:col-span-2"
                            />
                            <input
                              type="text"
                              value={m.email || ''}
                              onChange={(e) => handleUpdateMemberField(m.id, 'email', e.target.value)}
                              placeholder="이메일"
                              className="text-xs p-2 rounded border bg-white"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-4 justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-sm">{m.name}</span>
                                <span className="text-xs font-bold text-slate-500 px-1.5 py-0.5 bg-slate-200 rounded">{m.title}</span>
                              </div>
                              <p className="text-xs text-slate-500 font-medium mt-1">소속: {m.affiliation}</p>
                              <p className="text-xs text-slate-700 pt-1.5"><span className="text-slate-400 font-extrabold">연구분야:</span> {m.researchArea}</p>
                            </div>
                            {m.email && <div className="text-xs text-slate-400 font-mono self-end sm:self-center">📧 {m.email}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESEARCH REPORTS GENERAL ARCHIVE */}
          {subTab === 'research' && (
            <div className="space-y-6">
              {/* Add form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-left">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">신규 주요 정책보고서 및 논문 아카이브 저장</h3>
                
                <form onSubmit={handleAddReport} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  <div className="space-y-1 sm:col-span-2 text-left">
                    <label className="text-[11px] font-bold text-slate-500">연구 결과 리포트 제목 *</label>
                    <input
                      required
                      type="text"
                      placeholder="한글 정책 결과 보고서 제목 입력"
                      value={newReport.title}
                      onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">출간 발표일 등록 *</label>
                    <input
                      required
                      type="date"
                      value={newReport.date}
                      onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 font-mono"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">공동 집필진 명의 기재 *</label>
                    <input
                      required
                      type="text"
                      placeholder="예) 노승철 소장, 윤건 실장"
                      value={newReport.authors}
                      onChange={(e) => setNewReport({ ...newReport, authors: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">자료 연계분류 카테고리 *</label>
                    <select
                      value={newReport.category}
                      onChange={(e) => setNewReport({ ...newReport, category: e.target.value as ResearchCategory })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
                    >
                      <option value={ResearchCategory.POLICY_REPORT}>정책보고서 (POLICY_REPORT)</option>
                      <option value={ResearchCategory.ACADEMIC_PAPER}>학술논문 (ACADEMIC_PAPER)</option>
                      <option value={ResearchCategory.POLICY_BRIEF}>정책브리프 (POLICY_BRIEF)</option>
                      <option value={ResearchCategory.RESEARCH_REPORT}>일반 연구보고서</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">색인 태그 키워드 (쉼표 구분)</label>
                    <input
                      type="text"
                      placeholder="공공인프라, 지능형교통, 거버넌스"
                      value={newReportTag}
                      onChange={(e) => {
                        setNewReportTag(e.target.value);
                        setNewReport({
                          ...newReport,
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        });
                      }}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-3 text-left">
                    <label className="text-[11px] font-bold text-slate-500">국문 요약 초록 데이터 기재 (Abstract Preview) *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="방문자가 다운로드 전에 읽어볼 수 있는 국문 요약문이나 주요 분석 의제를 핵심 서술하십시오."
                      value={newReport.summary}
                      onChange={(e) => setNewReport({ ...newReport, summary: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#004a99] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> 아카이브 책자 기증
                    </button>
                  </div>
                </form>
              </div>

              {/* Research listing */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-left space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">등록된 연구성과 관리 목록 ({research.length}건)</h3>
                <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-2">
                  {research.map((r) => (
                    <div key={r.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex justify-between items-center bg-white p-2 border border-slate-150 rounded-lg">
                        <span className="text-xs font-extrabold text-[#004a99]">{r.category} | 수록일: {r.date}</span>
                        <div className="flex gap-2">
                          {editingResearchId === r.id ? (
                            <button
                              onClick={() => setEditingResearchId(null)}
                              className="px-2.5 py-1 text-[10px] font-extrabold text-white bg-slate-900 rounded cursor-pointer"
                            >
                              저장완료
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingResearchId(r.id)}
                              className="px-2.5 py-1 text-[10px] font-extrabold text-slate-700 bg-white border border-slate-250 rounded cursor-pointer"
                            >
                              텍스트 수정
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteReport(r.id, r.title)}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {editingResearchId === r.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={r.title}
                            onChange={(e) => handleUpdateReportField(r.id, 'title', e.target.value)}
                            className="w-full text-xs p-2 rounded border bg-white font-extrabold"
                            placeholder="제목"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={r.authors}
                              onChange={(e) => handleUpdateReportField(r.id, 'authors', e.target.value)}
                              className="text-xs p-2 rounded border bg-white"
                              placeholder="집필진"
                            />
                            <input
                              type="text"
                              value={r.tags.join(', ')}
                              onChange={(e) => handleUpdateReportField(r.id, 'tags', e.target.value)}
                              className="text-xs p-2 rounded border bg-white"
                              placeholder="태그 (쉼표로 구분)"
                            />
                          </div>
                          <textarea
                            rows={3}
                            value={r.summary}
                            onChange={(e) => handleUpdateReportField(r.id, 'summary', e.target.value)}
                            className="w-full text-xs p-2 rounded border bg-white font-mono"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-slate-900">{r.title}</h4>
                          <p className="text-xs text-slate-500">집필: {r.authors} | 가상 다운로드계수: {r.downloadCount}회</p>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-white border border-slate-100 p-2 rounded">{r.summary}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: POSTS & NOTICES COMMITTEE */}
          {subTab === 'notices' && (
            <div className="space-y-6">
              {/* Add form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-left">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">신규 학술 소식 및 콜로키움 모집 등 게시글 작성</h3>
                
                <form onSubmit={handleAddNotice} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  <div className="space-y-1 sm:col-span-3 text-left">
                    <label className="text-[11px] font-bold text-slate-500">공게글 및 세미나 안건 제목 *</label>
                    <input
                      required
                      type="text"
                      placeholder="학술안 행사 정보 제목 기입"
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">등록 일자 *</label>
                    <input
                      required
                      type="date"
                      value={newNotice.date}
                      onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 font-mono"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">분류구분 *</label>
                    <select
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as NoticeCategory })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 bg-white"
                    >
                      <option value={NoticeCategory.NOTICE}>일반 공지사항 (NOTICE)</option>
                      <option value={NoticeCategory.SEMINAR}>세미나/학술행사 (SEMINAR)</option>
                      <option value={NoticeCategory.RECRUIT}>채용/초빙 (RECRUIT)</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-500">작성단 서명 명의 *</label>
                    <input
                      required
                      type="text"
                      value={newNotice.author}
                      onChange={(e) => setNewNotice({ ...newNotice, author: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 font-bold"
                    />
                  </div>

                  <div className="space-y-1 flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newNotice.isPinned}
                        onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                        className="rounded text-[#004a99] focus:ring-[#004a99] w-4 h-4"
                      />
                      <span className="text-xs font-extrabold text-red-500">최상단 중요 고정글 지정</span>
                    </label>
                  </div>

                  <div className="space-y-1 sm:col-span-4 text-left">
                    <label className="text-[11px] font-bold text-slate-500">안내 텍스트 전문 데이터 (Content Body) *</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="내용 단락이나 세밀 일시, 접수 기간등 본래 소통 가이드라인을 상세 적어 기술 해 주십시오."
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-200 resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 sm:col-span-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#004a99] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> 안건 게시 공고 실행
                    </button>
                  </div>
                </form>
              </div>

              {/* Notice listings */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-left space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">학술게시판 통합 공무 제어 수록목록 ({notices.length}개)</h3>
                <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-2">
                  {notices.map((n) => (
                    <div key={n.id} className={`p-4 border rounded-xl space-y-3 ${n.isPinned ? 'bg-amber-50/20 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between items-center bg-white p-2 border border-slate-150 rounded-lg">
                        <span className="text-xs font-extrabold text-slate-700">
                          {n.isPinned && <span className="text-red-500 mr-1 font-black">[★공지]</span>}
                          {n.category} | 작성: {n.author} | {n.date}
                        </span>
                        <div className="flex gap-2">
                          {editingNoticeId === n.id ? (
                            <button
                              onClick={() => setEditingNoticeId(null)}
                              className="px-2.5 py-1 text-[10px] font-extrabold text-white bg-slate-900 rounded cursor-pointer"
                            >
                              저장완료
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingNoticeId(n.id)}
                              className="px-2.5 py-1 text-[10px] font-extrabold text-slate-700 bg-white border border-slate-250 rounded cursor-pointer"
                            >
                              글 수정
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteNotice(n.id, n.title)}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {editingNoticeId === n.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={n.title}
                            onChange={(e) => handleUpdateNoticeField(n.id, 'title', e.target.value)}
                            className="w-full text-xs p-2 rounded border bg-white font-extrabold"
                            placeholder="공지 제목"
                          />
                          <textarea
                            rows={3}
                            value={n.content}
                            onChange={(e) => handleUpdateNoticeField(n.id, 'content', e.target.value)}
                            className="w-full text-xs p-2 rounded border bg-white font-mono"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1 text-left">
                          <h4 className="text-sm font-extrabold text-slate-900">{n.title}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-white p-2 border border-slate-100 rounded whitespace-pre-line">{n.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RECEIVED INQUIRIES */}
          {subTab === 'inquiries' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">학술 제안 및 대외 협력 위탁 문의 내역</h2>
                  <p className="text-xs text-slate-400">홈페이지 문의 기입 폼으로부터 SSL 수집된 안전 티켓 목록입니다.</p>
                </div>
                <button
                  onClick={() => {
                    triggerToast('안전 서버 데이터베이스와 즉시 동기화가 반영되었습니다.');
                  }}
                  className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-pointer"
                  title="새로고침"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {inquiries.length > 0 ? (
                <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                  {inquiries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((inq) => (
                      <div key={inq.id} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50/50 hover:bg-slate-100/30 transition-all text-left">
                        <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-150 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-400">🎟 티켓ID: {inq.id}</span>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                              inq.status === 'RESOLVED'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {inq.status === 'RESOLVED' ? '처리/검토완료' : '검토중 (PENDING)'}
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            {inq.status === 'PENDING' && (
                              <button
                                onClick={() => handleResolveInquiry(inq.id)}
                                className="px-2.5 py-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold cursor-pointer transition-all flex items-center gap-0.5 shadow-3xs"
                              >
                                <Check className="w-2.5 h-2.5" /> 검토필 함 처리
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 bg-white border border-slate-200 rounded hover:bg-red-50 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Metadata table inside card */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600 font-medium">
                          <p><span className="text-slate-400 font-bold">성함 / 제안자:</span> <span className="text-slate-800 font-extrabold">{inq.name}</span></p>
                          <p><span className="text-slate-400 font-bold">소속 기명:</span> <span className="text-slate-800 font-bold">{inq.affiliation || '미기재'}</span></p>
                          <p><span className="text-slate-400 font-bold">회신 이메일:</span> <a href={`mailto:${inq.email}`} className="text-blue-600 underline font-semibold">{inq.email}</a></p>
                          <p><span className="text-slate-400 font-bold">유선 기재처:</span> <span className="text-slate-800 font-mono font-bold">{inq.phone || '미기재'}</span></p>
                          <p className="sm:col-span-2"><span className="text-slate-400 font-bold">전송 접수일:</span> <span className="text-slate-500 font-mono">{inq.date}</span></p>
                        </div>

                        <div className="bg-white p-3.5 border border-slate-150 rounded-lg space-y-1">
                          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#004a99]" /> {inq.title}
                          </h4>
                          <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap pt-1 font-medium">{inq.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <Megaphone className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 text-xs font-bold">접수 수집 승인된 학술 위탁 문의가 하나도 존재하지 않습니다.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
