/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import PeopleView from './components/PeopleView';
import ResearchView from './components/ResearchView';
import BoardView from './components/BoardView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';

import { 
  getStoredData, 
  setStoredData, 
  INITIAL_INTRO, 
  INITIAL_MEMBERS, 
  INITIAL_RESEARCH, 
  INITIAL_NOTICES 
} from './data';
import { 
  InstituteIntro, 
  Member, 
  ResearchReport, 
  Notice, 
  Inquiry 
} from './types';
import { ADMIN_EMAILS, TEMP_ADMIN_PASSWORD } from './config';
import { Lock, X, KeyRound, ShieldAlert } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab ] = useState<string>('home');

  // Language State: 'ko' (Korean) or 'en' (English)
  const [lang, setLang] = useState<'ko' | 'en'>(() => 
    getStoredData<'ko' | 'en'>('lang', 'ko')
  );

  useEffect(() => {
    setStoredData('lang', lang);
  }, [lang]);

  // Core App Datasets with Persistent State (localStorage)
  const [intro, setIntro] = useState<InstituteIntro>(() => 
    getStoredData<InstituteIntro>('intro', INITIAL_INTRO)
  );
  const [members, setMembers] = useState<Member[]>(() => 
    getStoredData<Member[]>('members', INITIAL_MEMBERS)
  );
  const [research, setResearch] = useState<ResearchReport[]>(() => 
    getStoredData<ResearchReport[]>('research', INITIAL_RESEARCH)
  );
  const [notices, setNotices] = useState<Notice[]>(() => 
    getStoredData<Notice[]>('notices', INITIAL_NOTICES)
  );

  // Default Inquiries sample to keep the admin page from looking blank at first
  const initialInquiries: Inquiry[] = [
    {
      id: 'HSX-824150',
      name: '김우중',
      email: 'wj.kim@korea-ict.org',
      phone: '010-4829-1925',
      affiliation: '한국정보통신산업진흥원 공공사업본부',
      title: '지자체 디지털 유연 플랫폼 시범 탑재에 관한 학술 자문 위탁 신청',
      content: '행정안전부 주관 정보화 평가지표 최적화를 위해 귀 연구소의 [2026 지자체 AI 정보화 역량 진단 맞춤형 도입 프레임워크 보고서] 내용을 실제 실증사업 가이드라인으로 차용 위탁 심의하고자 정식 컨설팅 공문을 사전 발송합니다. 회신 일시를 이메일로 송부해 주십시오.',
      date: '2026-06-07',
      status: 'PENDING'
    },
    {
      id: 'HSX-315809',
      name: '이지연 주무관',
      email: 'jy.lee@asan.go.kr',
      phone: '041-530-1114',
      affiliation: '아산시청 디지털정보센터 정보통신팀',
      title: '아산시 스마트시티 안착을 위한 한신대 연구교수진 공동 연구 참여 요청의 건',
      content: '교통 편향 및 자율 주행 인지 체계에 인공지능 윤리 등 한신대학교 연구소만의 고유한 4대 핵심 가치 모델을 이식하고 싶습니다. 정기 자문 위원단에 정인수 교수님 혹은 강지훈 전임연구관님을 위촉하는 절차를 확인 요청드립니다.',
      date: '2026-06-04',
      status: 'RESOLVED'
    }
  ];

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => 
    getStoredData<Inquiry[]>('inquiries', initialInquiries)
  );

  // External selection triggers (e.g. tracking click from Home -> Research / Board detail)
  const [selectedResearchId, setSelectedResearchId] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  // Administration Authorization State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => 
    getStoredData<boolean>('isAdmin', false)
  );
  const [adminEmail, setAdminEmail] = useState<string>(() =>
    getStoredData<string>('adminEmail', '')
  );
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Synchronization Side Effects: Save changed state back to localStorage
  useEffect(() => {
    setStoredData('intro', intro);
  }, [intro]);

  useEffect(() => {
    setStoredData('members', members);
  }, [members]);

  useEffect(() => {
    setStoredData('research', research);
  }, [research]);

  useEffect(() => {
    setStoredData('notices', notices);
  }, [notices]);

  useEffect(() => {
    setStoredData('inquiries', inquiries);
  }, [inquiries]);

  useEffect(() => {
    setStoredData('isAdmin', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    setStoredData('adminEmail', adminEmail);
  }, [adminEmail]);

  // Administration Actions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = loginEmail.trim().toLowerCase();

    if (!ADMIN_EMAILS.includes(normalizedEmail)) {
      setLoginError('등록된 관리자 이메일이 아닙니다. 관리자 후보 이메일을 다시 확인해주십시오.');
      return;
    }

    if (loginPassword === TEMP_ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminEmail(normalizedEmail);
      setOpenLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
      setLoginError(null);
      // Automatically redirect to admin dashboard
      setActiveTab('admin');
    } else {
      setLoginError('지정 기입된 비밀번호가 일치하지 않습니다. 다시 확인해주십시오.');
    }
  };

  const handleLogout = () => {
    if (confirm('관리자 모드를 해제하고 세션을 로그아웃 하시겠습니까?')) {
      setIsAdmin(false);
      setAdminEmail('');
      if (activeTab === 'admin') {
        setActiveTab('home');
      }
    }
  };

  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const fresh: Inquiry = {
      ...newInq,
      id: 'HSX-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().substring(0, 10),
      status: 'PENDING'
    };
    setInquiries((prev) => [fresh, ...prev]);
  };

  // Render current tab component safely
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            intro={intro}
            members={members}
            research={research}
            notices={notices}
            setActiveTab={setActiveTab}
            setSelectedResearchId={setSelectedResearchId}
            setSelectedNoticeId={setSelectedNoticeId}
            lang={lang}
            onAddInquiry={handleAddInquiry}
          />
        );
      case 'about':
        return <AboutView intro={intro} />;
      case 'people':
        return <PeopleView members={members} />;
      case 'research':
        return (
          <ResearchView
            research={research}
            setResearch={setResearch}
            selectedResearchId={selectedResearchId}
            setSelectedResearchId={setSelectedResearchId}
          />
        );
      case 'board':
        return (
          <BoardView
            notices={notices}
            selectedNoticeId={selectedNoticeId}
            setSelectedNoticeId={setSelectedNoticeId}
          />
        );
      case 'contact':
        return <ContactView onAddInquiry={handleAddInquiry} />;
      case 'admin':
        if (isAdmin) {
          return (
            <AdminView
              intro={intro}
              setIntro={setIntro}
              members={members}
              setMembers={setMembers}
              research={research}
              setResearch={setResearch}
              notices={notices}
              setNotices={setNotices}
              inquiries={inquiries}
              setInquiries={setInquiries}
              setActiveTab={setActiveTab}
            />
          );
        } else {
          return (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-red-700 font-bold">
                ⚠️ 비정상 우회 접근 탐지
              </div>
              <p className="text-slate-500 text-sm">관리 도구는 기명자 로그인이 요망됩니다.</p>
              <button 
                onClick={() => setOpenLoginModal(true)} 
                className="px-5 py-2.5 bg-[#004a99] text-white rounded-lg font-bold text-xs cursor-pointer"
              >
                관리 도구 로그인하기
              </button>
            </div>
          );
        }
      default:
        return (
          <HomeView
            intro={intro}
            members={members}
            research={research}
            notices={notices}
            setActiveTab={setActiveTab}
            setSelectedResearchId={setSelectedResearchId}
            setSelectedNoticeId={setSelectedNoticeId}
            lang={lang}
            onAddInquiry={handleAddInquiry}
          />
        );
    }
  };

  return (
    <div id="hs-root-app" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. Global Header Section */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        adminEmail={adminEmail}
        onLogout={handleLogout}
        setOpenLoginModal={setOpenLoginModal}
        lang={lang}
        setLang={setLang}
      />

      {/* 2. Main Page Content Viewport */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* 3. Global Footer Section */}
      <Footer
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        setOpenLoginModal={setOpenLoginModal}
      />

      {/* 4. Administrative Login Modal Trigger Dialog */}
      {openLoginModal && (
        <div id="login-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div id="login-modal-card" className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 md:p-8 max-w-sm w-full space-y-6 relative text-left select-none animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setOpenLoginModal(false);
                setLoginEmail('');
                setLoginPassword('');
                setLoginError(null);
              }}
              className="absolute top-4.5 right-4.5 p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition"
              id="close-login-modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header branding lockup */}
            <div className="space-y-2 text-center pt-2">
              <div className="w-12 h-12 bg-[#004a99]/10 rounded-xl flex items-center justify-center mx-auto text-[#004a99] border border-blue-100 shadow-3xs">
                <Lock className="w-5.5 h-5.5" />
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">연구소 관리자 계정 승인</h2>
              <p className="text-xs text-slate-400">등록된 관리자 이메일과 임시 비밀번호로 1차 시안 관리도구에 접속합니다.</p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">관리자 이메일</label>
                <input
                  required
                  autoFocus
                  type="email"
                  id="admin-email-input"
                  placeholder="등록된 관리자 이메일"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition-all font-mono font-bold"
                />
              </div>

              <div className="space-y-1 text-left relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">접속 보안 비밀번호</label>
                <div className="relative">
                  <input
                    required
                    type="password"
                    id="admin-password-input"
                    placeholder="임시 비밀번호"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-sm pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition-all font-mono font-bold"
                  />
                  <KeyRound className="w-4.5 h-4.5 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {loginError && (
                <div className="text-[11px] text-red-650 bg-red-50 p-2.5 rounded border border-red-150 leading-relaxed font-bold font-sans">
                  🚨 {loginError}
                </div>
              )}

              <button
                type="submit"
                id="submit-login-form"
                className="w-full py-3 rounded-lg bg-[#004a99] hover:bg-blue-800 text-white font-extrabold text-sm transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                인가 확인 및 관리도구 실행
              </button>

              <div className="flex items-center gap-1.5 p-3 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-400 leading-normal pl-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-slate-400" />
                <span>
                  1차 시안용 임시 로그인입니다. 테스트 비밀번호는 <b className="font-mono text-slate-700">{TEMP_ADMIN_PASSWORD}</b> 이며, 정식 운영 전 Supabase 인증으로 교체합니다.
                </span>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
