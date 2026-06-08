/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, Award, History, BookOpen, User, Users, GraduationCap } from 'lucide-react';
import { InstituteIntro } from '../types';

interface AboutViewProps {
  intro: InstituteIntro;
}

export default function AboutView({ intro }: AboutViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 text-left">
      {/* Title Header */}
      <div className="text-center md:text-left border-b border-slate-200 pb-6">
        <h2 className="text-xs font-bold text-[#004a99] tracking-widest uppercase bg-blue-150/10 px-2 py-0.5 rounded inline-block">
          ABOUT THE INSTITUTE
        </h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-sans tracking-tight">연구소 소개</h1>
        <p className="text-slate-500 text-sm mt-1">한신대학교 AI 공공정책연구소의 창립 배경, 비전, 지향 가치와 조직 체계입니다.</p>
      </div>

      {/* Segment 1: Establishment Purpose (설립목적) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#004a99] rounded-full text-xs font-bold border border-blue-105">
            <BookOpen className="w-3.5 h-3.5" /> ESTABLISHMENT PURPOSE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            창립 배경 및 <br />설립 목적
          </h2>
          <div className="h-1.5 w-16 bg-[#004a99] rounded" />
        </div>
        <div className="lg:col-span-8 bg-slate-50 border border-slate-200/60 rounded-xl p-6 sm:p-8 space-y-4">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-wrap">
            {intro.purpose}
          </p>
          <div className="border-t border-slate-200/80 pt-4 text-xs text-slate-400 font-semibold">
            ※ 한신대학교는 국가 지능화 전략 및 자치행정 혁신 수탁 과제 수행을 주도하기 위해 본 전문 대학교 고유 학술연구기구를 편제 개설하였습니다.
          </div>
        </div>
      </section>

      {/* Segment 2: Vision & Mission (비전과 미션) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
            <Landmark className="w-32 h-32 text-blue-400" />
          </div>
          <div className="space-y-4 relative z-10 text-left">
            <span className="text-xs font-bold text-sky-400 tracking-widest uppercase">RESEARCH VISION</span>
            <h3 className="text-xl sm:text-2xl font-black">연구소 비전</h3>
            <div className="h-0.5 bg-[#004a99] w-12" />
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-2 font-bold select-none leading-snug">
              "{intro.vision}"
            </p>
          </div>
        </div>

        <div className="bg-[#002e60] text-white p-8 rounded-2xl border border-blue-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
            <Award className="w-32 h-32 text-teal-400" />
          </div>
          <div className="space-y-4 relative z-10 text-left">
            <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">OUR MISSION</span>
            <h3 className="text-xl sm:text-2xl font-black">미션 선언문</h3>
            <div className="h-0.5 bg-teal-500 w-12" />
            <p className="text-slate-200 text-xs sm:text-[14px] leading-relaxed pt-2 font-medium">
              {intro.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Segment 3: Core Values (핵심 가치) */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#004a99] tracking-widest uppercase">CORE VALUES</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">4대 핵심 규율가치</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {intro.coreValues.map((value, idx) => {
            const parts = value.split(' (');
            const main = parts[0];
            const sub = parts[1] ? parts[1].replace(')', '') : '';
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-3xs">
                <div className="text-[#004a99] font-bold font-mono text-lg mb-2">0{idx + 1}</div>
                <h4 className="text-base font-extrabold text-slate-900 leading-tight leading-snug">{main}</h4>
                {sub && <p className="text-[11px] text-slate-400 font-semibold tracking-wide pt-1.5 font-mono">{sub}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Segment 4: Organizational Chart (조직도) */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#004a99] tracking-widest uppercase">ORGANIZATION CHART</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">연구소 조직 편제</h2>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 overflow-x-auto shadow-3xs">
          <div className="min-w-[600px] flex flex-col items-center">
            
            {/* Level 1: Director */}
            <div className="bg-[#002e60] text-white rounded-xl px-10 py-4 shadow-md text-center max-w-xs border border-blue-950">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-300">소장 (Director)</span>
              <h4 className="text-base font-extrabold text-white mt-0.5">노승철 소장</h4>
              <p className="text-[11px] text-blue-200 font-medium pt-0.5">한신대 공공인재빅데이터융합 전공 부교수</p>
            </div>

            {/* Vertical connector line */}
            <div className="w-0.5 h-6 bg-slate-350" />

            {/* Joint */}
            <div className="bg-slate-200 px-4 py-1.5 rounded-lg text-[10px] font-extrabold text-slate-600 border border-slate-250">
              운영위원회 및 심의단 (Managing Committee & Advisory Board)
            </div>

            {/* Vertical connector line */}
            <div className="w-0.5 h-6 bg-slate-355" />

            {/* Level 2: Executive Director */}
            <div className="bg-blue-50/60 text-[#004a99] rounded-xl px-8 py-3.5 text-center border-2 border-blue-100 max-w-xs leading-normal">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#004a99]">AI 행정혁신실장</span>
              <h5 className="text-[14px] font-bold text-slate-900 mt-0.5">윤건 교수</h5>
              <p className="text-[11px] text-slate-500 font-medium">AI 거버넌스, 데이터기반행정</p>
            </div>

            {/* Vertical connector line */}
            <div className="w-0.5 h-6 bg-slate-357" />

            {/* Horizontal line for splits */}
            <div className="w-full relative">
              <div className="absolute top-0 left-[16.6%] right-[16.6%] h-0.5 bg-slate-300" />
            </div>

            {/* Level 3: Three branches */}
            <div className="grid grid-cols-3 gap-4 w-full pt-6">
              
              {/* Branch 1 */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300 -mt-6" />
                <div className="bg-white rounded-xl p-4.5 border border-slate-200 shadow-3xs text-center w-full min-h-[110px] flex flex-col justify-center">
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-[#004a99] flex items-center justify-center mx-auto mb-2 font-bold text-xs border border-blue-100">
                    <User className="w-4 h-4" />
                  </div>
                  <h6 className="text-[13px] font-extrabold text-slate-900">AI 행정혁신실</h6>
                  <p className="text-[10px] text-slate-500 pt-1 leading-snug">AI 거버넌스, AI 정책·제도 연구, 정책평가모형 개발</p>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300 -mt-6" />
                <div className="bg-white rounded-xl p-4.5 border border-slate-200 shadow-3xs text-center w-full min-h-[110px] flex flex-col justify-center">
                  <div className="w-7 h-7 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs border border-violet-100">
                    <Users className="w-4 h-4" />
                  </div>
                  <h6 className="text-[13px] font-extrabold text-slate-900">AI 지역학연구실</h6>
                  <p className="text-[10px] text-slate-500 pt-1 leading-snug">AI 방법론 기반 동아시아 지역학 연구 및 지역 맞춤형 LLM 개발</p>
                </div>
              </div>

              {/* Branch 3 */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300 -mt-6" />
                <div className="bg-white rounded-xl p-4.5 border border-slate-200 shadow-3xs text-center w-full min-h-[110px] flex flex-col justify-center">
                  <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs border border-amber-100">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h6 className="text-[13px] font-extrabold text-slate-900">AI 개발창업실</h6>
                  <p className="text-[10px] text-slate-500 pt-1 leading-snug">AI 기반 공공서비스·플랫폼 개발, MLOps, 인큐베이팅, 기술이전</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Segment 5: History Timeline (연혁) */}
      <section className="space-y-6">
        <div className="text-center md:text-left border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#004a99]" />
            <h3 className="text-xl font-extrabold text-slate-900">연구소 발자취 (공식 연혁)</h3>
          </div>
        </div>

        <div className="relative border-l-2 border-slate-200 pl-6 sm:pl-8 ml-4 space-y-8 text-left">
          {intro.history.map((h, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 bg-white p-1 rounded-full border-2 border-[#004a99] shadow-3xs z-10">
                <div className="w-2 h-2 rounded-full bg-[#004a99]" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-extrabold text-[#004a99] font-mono tracking-wide">{h.year}</span>
                <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                  {h.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
