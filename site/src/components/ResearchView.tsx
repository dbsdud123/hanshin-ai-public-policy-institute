/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Tag, X, Calendar, User, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ResearchReport, ResearchCategory } from '../types';

interface ResearchViewProps {
  research: ResearchReport[];
  setResearch: React.Dispatch<React.SetStateAction<ResearchReport[]>>;
  selectedResearchId: string | null;
  setSelectedResearchId: (id: string | null) => void;
}

export default function ResearchView({
  research,
  setResearch,
  selectedResearchId,
  setSelectedResearchId,
}: ResearchViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedReport, setSelectedReport] = useState<ResearchReport | null>(null);

  // Download simulation toast status
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: '전체 성과물' },
    { id: ResearchCategory.POLICY_REPORT, label: '정책보고서' },
    { id: ResearchCategory.ACADEMIC_PAPER, label: '학술논문' },
    { id: ResearchCategory.POLICY_BRIEF, label: '정책브리프' },
    { id: ResearchCategory.RESEARCH_REPORT, label: '일반 연구보고서' },
  ];

  // Open modal if external selectedResearchId is passed (like clicking on Home)
  useEffect(() => {
    if (selectedResearchId) {
      const found = research.find((r) => r.id === selectedResearchId);
      if (found) {
        setSelectedReport(found);
      }
    } else {
      setSelectedReport(null);
    }
  }, [selectedResearchId, research]);

  // Filtering list
  const filteredReports = research.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle virtual download action
  const handleDownload = (id: string) => {
    setResearch((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, downloadCount: item.downloadCount + 1 };
        }
        return item;
      })
    );

    // Trigger simulation notification
    setDownloadSuccessMessage('원문 PDF 파일 다운로드 완료! 컴퓨터 로컬 디렉토리에 시뮬레이션 내려받기가 수반되었습니다.');
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 5000);
  };

  const getCategoryLabel = (cat: ResearchCategory) => {
    switch (cat) {
      case ResearchCategory.POLICY_REPORT:
        return '정책보고서';
      case ResearchCategory.ACADEMIC_PAPER:
        return '학술논문';
      case ResearchCategory.POLICY_BRIEF:
        return '정책브리프';
      case ResearchCategory.RESEARCH_REPORT:
        return '연구보고서';
      default:
        return '연구자료';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10 text-left">
      {/* Title section */}
      <div className="text-center md:text-left border-b border-slate-200 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 animate-fade-in">
        <div>
          <span className="text-[11px] font-bold text-[#004a99] uppercase tracking-widest bg-blue-150/10 px-2 py-0.5 rounded inline-block">
            RESEARCH ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-sans tracking-tight">연구성과</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">우리 공공정책연구소에서 발간해 낸 지능 정밀 보고서 및 공학 논문 초록집입니다.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 max-w-sm">
          <input
            type="search"
            placeholder="부서명, 저자, 원문 초록 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition-all font-medium text-slate-800"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Categories */}
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

      {/* Main List Layout */}
      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  setSelectedReport(report);
                  setSelectedResearchId(report.id);
                }}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-2xs transition-all duration-200 text-left cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2.5 max-w-3xl flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded border ${
                      report.category === ResearchCategory.ACADEMIC_PAPER
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : report.category === ResearchCategory.POLICY_BRIEF
                        ? 'bg-blue-50 text-[#004a99] border-blue-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {getCategoryLabel(report.category)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {report.date}
                    </span>
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {report.authors}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#004a99] transition-colors line-clamp-1">
                    {report.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed font-semibold">
                    {report.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {report.tags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        <Tag className="w-2.5 h-2.5 text-slate-400" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 font-sans">
                  <div className="text-left md:text-right font-mono text-xs text-slate-400">
                    <div>원문 수록 완료 (PDF)</div>
                    <div className="font-bold text-slate-600 mt-0.5">다운로드 {report.downloadCount}회</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReport(report);
                      setSelectedResearchId(report.id);
                    }}
                    className="inline-flex items-center gap-1 px-4 py-2 text-xs font-extrabold text-[#004a99] bg-blue-50/50 hover:bg-blue-100/50 rounded-lg border border-blue-100 transition-all cursor-pointer"
                  >
                    초록 및 PDF <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-205">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-semibold">조건에 매칭되는 정책 연구 결과물이 조회되지 않았습니다.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('ALL');
            }}
            className="mt-3 text-xs font-bold text-[#004a99] hover:underline cursor-pointer"
          >
            전체 리스트 보기
          </button>
        </div>
      )}

      {/* Rich modal overlay details view */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative text-left select-none animate-scale-up">
            
            {/* Close */}
            <button
              onClick={() => {
                setSelectedReport(null);
                setSelectedResearchId(null);
                setDownloadSuccessMessage(null);
              }}
              className="absolute top-4.5 right-4.5 p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title / Badges */}
            <div className="space-y-3.5">
              <span className={`inline-block px-3 py-0.5 text-xs font-extrabold rounded border ${
                selectedReport.category === ResearchCategory.ACADEMIC_PAPER
                  ? 'bg-purple-150/10 text-purple-700 border-purple-250'
                  : 'bg-blue-150/10 text-[#004a99] border-blue-105'
              }`}>
                {getCategoryLabel(selectedReport.category)}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedReport.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5 font-bold">
                  <User className="w-4 h-4 text-slate-400" /> 저자: <span className="text-slate-700 font-extrabold">{selectedReport.authors}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-slate-400" /> 발표 연월일: {selectedReport.date}
                </div>
                <div className="flex items-center gap-1.5 font-mono font-bold">
                  <Eye className="w-4 h-4 text-slate-400" /> 다운로드 수: {selectedReport.downloadCount}회
                </div>
              </div>
            </div>

            {/* Core Summary (초록) */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200/60 leading-normal">
              <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#004a99]" /> 국문 요약 및 정책 논지 (Abstract)
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {selectedReport.summary}
              </p>
            </div>

            {/* Research Keywords */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">분류 색인 키워드 (Keywords)</h4>
              <div className="flex flex-wrap gap-2">
                {selectedReport.tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-250 text-slate-655 text-xs font-bold rounded-lg shadow-3xs">
                    <Tag className="w-3 h-3 text-slate-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated pdf download feedback message */}
            {downloadSuccessMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-150 rounded-xl flex items-center gap-2 text-xs font-bold animate-fade-in">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>{downloadSuccessMessage}</span>
              </div>
            )}

            {/* Download trigger */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
              <div className="text-[11px] text-slate-400 leading-normal">
                본 문서는 한신대학교 산하 학술 공개 자료로서 영리 목적 재사용을 불허합니다. <br />
                PDF 다운로드 횟수는 대외 평가 정보 통계치에 즉시 합산 처리됩니다.
              </div>
              <button
                onClick={() => handleDownload(selectedReport.id)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#004a99] hover:bg-blue-800 text-white font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" /> PDF 원문 다운로드
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
