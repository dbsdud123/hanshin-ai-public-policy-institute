/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Landmark, GraduationCap, ShieldAlert, Cpu, Globe, ChevronDown, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  adminEmail?: string;
  onLogout: () => void;
  setOpenLoginModal: (open: boolean) => void;
  lang: 'ko' | 'en';
  setLang: (lang: 'ko' | 'en') => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isAdmin,
  adminEmail,
  onLogout,
  setOpenLoginModal,
  lang,
  setLang,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);

  // Localization dict for navigation
  const menuItems = [
    { id: 'home', label: lang === 'ko' ? '홈' : 'Home' },
    { id: 'about', label: lang === 'ko' ? '연구소 소개' : 'About' },
    { id: 'people', label: lang === 'ko' ? '연구진 및 자문단' : 'People' },
    { id: 'research', label: lang === 'ko' ? '연구성과' : 'Research' },
    { id: 'board', label: lang === 'ko' ? '공지 및 자료실' : 'Notice & Board' },
    { id: 'contact', label: lang === 'ko' ? '연락처' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 backdrop-blur-md bg-white/95">
      {/* Top utility bar wrapper */}
      <div className="bg-slate-900 text-slate-350 text-xs py-2.5 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400 font-semibold tracking-tight text-[11px]">
              <Landmark className="w-3.5 h-3.5 text-sky-450" /> 
              {lang === 'ko' ? '한신대학교 부설 연구기관' : 'Affiliated Research Institute of Hanshin University'}
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline font-mono tracking-wider text-[10px] text-slate-400">
              AI & PUBLIC POLICY RESEARCH INSTITUTE
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            {isAdmin ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-[#004a99] text-[10px] border border-blue-500/30 font-bold">
                  <ShieldAlert className="w-2.5 h-2.5" /> {adminEmail || (lang === 'ko' ? '관리자 상태' : 'Admin Session')}
                </span>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="font-bold text-sky-400 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {lang === 'ko' ? '통합 관리자도구' : 'Console'}
                </button>
                <span className="text-slate-700">|</span>
                <button
                  onClick={onLogout}
                  className="hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {lang === 'ko' ? '로그아웃' : 'Logout'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpenLoginModal(true)}
                className="font-medium text-slate-400 hover:text-white transition-colors text-[11px] cursor-pointer"
              >
                {lang === 'ko' ? '관리자 로그인' : 'Admin Login'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* [LEFT] Logo and branding lockup */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              <div className="flex items-center justify-center w-11 h-11 bg-slate-100 group-hover:bg-blue-50 text-slate-900 group-hover:text-[#004a99] rounded-lg border border-slate-200 transition-all shadow-3xs">
                <div className="relative">
                  <GraduationCap className="w-6 h-6 text-slate-800 transition-transform group-hover:scale-105" />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-[#004a99] p-0.5 rounded-full text-white">
                    <Cpu className="w-3 h-3" />
                  </span>
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none font-sans">
                  {lang === 'ko' ? '한신대학교' : 'Hanshin University'}
                </div>
                <div className="text-xs text-[#004a99] font-black tracking-widest mt-1 uppercase">
                  {lang === 'ko' ? 'AI 공공정책연구소' : 'AI & Public Policy Inst.'}
                </div>
              </div>
            </button>
          </div>

          {/* [CENTER] Desktop Navigation - Perfectly Centered */}
          <nav className="hidden md:flex space-x-1 items-center justify-center flex-grow mx-8">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-md text-[14px] font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#004a99] bg-blue-50/50'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004a99] rounded-t-xl" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* [RIGHT] Language Switching & Academic Links */}
          <div className="hidden md:flex items-center gap-3.5 flex-shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setLang('ko')}
                className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-colors cursor-pointer ${
                  lang === 'ko'
                    ? 'bg-white text-[#004a99] shadow-3xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                KO
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-colors cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#004a99] shadow-3xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                EN
              </button>
            </div>

            {/* External Links Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLinkDropdownOpen(!linkDropdownOpen)}
                onBlur={() => setTimeout(() => setLinkDropdownOpen(false), 200)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'ko' ? '대외 연계망' : 'Afil. Links'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {linkDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50 text-left animate-scale-up">
                  <a
                    href="https://www.hs.ac.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#004a99]"
                  >
                    <span>한신대학교 대표 사이트</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href="https://aiis.snu.ac.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#004a99]"
                  >
                    <span>서울대학교 AI연구원 (SNU AI)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <div className="border-t border-slate-100 my-1"></div>
                  <a
                    href="https://www.kisdi.re.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-[11px] text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span>KISDI 정보통신정책연구원</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right-hand control lockup */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Simple Mobile Lang switcher */}
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="px-2 py-1 text-xs font-extrabold text-slate-650 bg-slate-100 border border-slate-200 rounded cursor-pointer"
            >
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-850 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-150 px-4 pt-2 pb-6 space-y-1.5 shadow-lg animate-fade-in text-left">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50/65 text-[#004a99]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {/* Extra Mobile Buttons */}
          <div className="border-t border-slate-100 pt-3 mt-3 space-y-2">
            <a
              href="https://www.hs.ac.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg"
            >
              <span>한신대학교 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://aiis.snu.ac.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg"
            >
              <span>서울대 AI연구원 (참고자료)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
