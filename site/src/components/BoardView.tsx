/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Eye, ArrowLeft, Pin, ChevronRight, MessageSquareCode } from 'lucide-react';
import { Notice, NoticeCategory } from '../types';

interface BoardViewProps {
  notices: Notice[];
  selectedNoticeId: string | null;
  setSelectedNoticeId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function BoardView({
  notices,
  selectedNoticeId,
  setSelectedNoticeId,
}: BoardViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);

  const categories = [
    { id: 'ALL', label: '전체 공지사항' },
    { id: NoticeCategory.NOTICE, label: '일반공지' },
    { id: NoticeCategory.SEMINAR, label: '세미나/워크샵' },
    { id: NoticeCategory.RECRUIT, label: '채용/초빙' },
  ];

  // Sync selection logic
  useEffect(() => {
    if (selectedNoticeId) {
      const found = notices.find((n) => n.id === selectedNoticeId);
      if (found) {
        setCurrentNotice(found);
        // Increment visual views dynamically for UX
        found.views = (found.views || 0) + 1;
      }
    } else {
      setCurrentNotice(null);
    }
  }, [selectedNoticeId, notices]);

  // Filtering list
  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || n.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getNoticeCategoryLabel = (cat: NoticeCategory) => {
    switch (cat) {
      case NoticeCategory.NOTICE:
        return '일반공지';
      case NoticeCategory.SEMINAR:
        return '세미나/워크샵';
      case NoticeCategory.RECRUIT:
        return '채용/초빙';
      default:
        return '기타';
    }
  };

  // Render detail view
  if (currentNotice) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-left">
        {/* Back navigation */}
        <button
          onClick={() => {
            setCurrentNotice(null);
            setSelectedNoticeId(null);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 전체 목록으로 복귀
        </button>

        {/* Detailed Board Box */}
        <article className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-6 md:p-8 space-y-6">
          
          <div className="space-y-4 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-3">
              {currentNotice.isPinned && (
                <span className="inline-flex items-center gap-1 bg-[#004a99] text-white px-2.5 py-0.5 rounded text-[10px] font-black uppercase shadow-3xs">
                  ★ 고정공지
                </span>
              )}
              <span className={`inline-block px-2.5 py-0.5 text-xs font-extrabold rounded ${
                currentNotice.category === NoticeCategory.SEMINAR
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-150'
                  : currentNotice.category === NoticeCategory.RECRUIT
                  ? 'bg-amber-100/60 text-amber-800 border border-amber-200'
                  : 'bg-blue-50 text-[#004a99] border border-blue-100'
              }`}>
                {getNoticeCategoryLabel(currentNotice.category)}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {currentNotice.date}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {currentNotice.title}
            </h1>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <span className="font-semibold text-slate-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" /> 작성처: {currentNotice.author}
              </span>
              <span className="font-mono flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> 조회수: {currentNotice.views}회
              </span>
            </div>
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
            {currentNotice.content}
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-400 space-y-1">
              <p>※ 본 게재글은 한신대학교 AI 공공정책연구소 정식 공지사항입니다.</p>
              <p>※ 행사 일정 변경이나 세부 문의는 <b className="text-[#004a99]">대표 이메일(nsc0203@hs.ac.kr)</b>을 이용해 주십시오.</p>
            </div>
          </div>

        </article>
      </div>
    );
  }

  // Render notice board main index listing
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10 text-left">
      {/* Title block */}
      <div className="text-center md:text-left border-b border-slate-200 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 animate-fade-in">
        <div>
          <span className="text-[11px] font-bold text-[#004a99] uppercase tracking-widest bg-blue-150/10 px-2 py-0.5 rounded inline-block">
            ANNOUNCEMENTS & ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-sans tracking-tight">공지 및 자료실</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">연구소 세미나 일정, 긴급 초빙 소식, 학술지 게재 정보 등 원격 공문 아카이브입니다.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 max-w-sm">
          <input
            type="search"
            placeholder="공지 한글제목, 기성부서 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition-all font-medium text-slate-800"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category Toggles */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Board Listing */}
      {filteredNotices.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredNotices
              .sort((a, b) => {
                // If isPinned, float to top
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => {
                    setCurrentNotice(notice);
                    setSelectedNoticeId(notice.id);
                  }}
                  className={`group p-5 sm:p-6 transition-all hover:bg-slate-50 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer ${
                    notice.isPinned ? 'bg-slate-50/40' : ''
                  }`}
                >
                  <div className="space-y-2 flex-1 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 bg-[#004a99] text-white px-2 py-0.5 rounded text-[9px] font-extrabold tracking-tight">
                          ★ 필독
                        </span>
                      )}
                      <span className={`inline-block px-2.5 py-0.5 text-[10px] font-black rounded ${
                        notice.category === NoticeCategory.SEMINAR
                          ? 'bg-emerald-50 text-emerald-700'
                          : notice.category === NoticeCategory.RECRUIT
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-[#004a99]'
                      }`}>
                        {getNoticeCategoryLabel(notice.category)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{notice.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#004a99] transition-colors line-clamp-1">
                      {notice.title}
                    </h3>

                    <p className="text-slate-400 text-xs line-clamp-1">
                      {notice.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs text-slate-400 font-mono self-center font-bold">
                    <span className="hidden sm:inline">조회수 {notice.views}회</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-205">
          <MessageSquareCode className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-semibold">조건에 적합한 공문 등록 사항이 검색 수신되지 않았습니다.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('ALL');
            }}
            className="mt-3 text-xs font-bold text-[#004a99] hover:underline cursor-pointer"
          >
            기본 보기 목록
          </button>
        </div>
      )}
    </div>
  );
}
