/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Mail, BookOpen, Layers, User2 } from 'lucide-react';
import { Member, MemberCategory } from '../types';

interface PeopleViewProps {
  members: Member[];
}

export default function PeopleView({ members }: PeopleViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: '전체 보기' },
    { id: MemberCategory.DIRECTOR, label: '연구소장' },
    { id: MemberCategory.RESEARCHER, label: '상임 및 객원연구위원' },
    { id: MemberCategory.ADVISOR, label: '대외 정책자문단' },
  ];

  // Filtering logic
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.researchArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.affiliation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10 text-left">
      {/* View Title */}
      <div className="text-center md:text-left border-b border-slate-200 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#004a99] uppercase tracking-widest bg-blue-150/10 px-2 py-0.5 rounded inline-block">
            RESEARCH STAFF & ADVISORS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-sans tracking-tight">연구진 및 자문위원단</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">학계, 공공 연구원, 법조계의 분야별 최고 전문가들로 구성된 연구소 구성원입니다.</p>
        </div>

        {/* Dynamic Search box */}
        <div className="relative w-full md:w-80 max-w-sm">
          <input
            type="search"
            placeholder="이름, 소속, 연구분야 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition-all font-medium text-slate-800"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category Pills Slider */}
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

      {/* Grid listing */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers
            .sort((a, b) => a.order - b.order)
            .map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-3xs hover:shadow-2xs transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Upper profile section */}
                <div className="p-6 space-y-4">
                  {/* Avatar / Name Row */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#004a99] font-extrabold text-lg shrink-0 shadow-3xs">
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User2 className="w-6 h-6 text-[#004a99]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        {member.name}
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#004a99]/10 text-[#004a99] border border-blue-100">
                          {member.title}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{member.affiliation}</p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Research Core detail */}
                  <div className="space-y-1.5">
                    <h4 className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" /> 핵심 연구분야
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-655 leading-relaxed font-semibold">
                      {member.researchArea}
                    </p>
                  </div>
                </div>

                {/* Footer contact section inside card */}
                {member.email && (
                  <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${member.email}`} className="hover:text-[#004a99] transition-colors">
                      {member.email}
                    </a>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-205">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-semibold">입력한 검색 기준과 일치하는 연구원이 발견되지 않았습니다.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('ALL');
            }}
            className="mt-3 text-xs font-extrabold text-[#004a99] hover:underline cursor-pointer"
          >
            기본값으로 복원
          </button>
        </div>
      )}
    </div>
  );
}
