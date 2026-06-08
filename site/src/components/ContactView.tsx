/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Landmark, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactViewProps {
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
}

export default function ContactView({ onAddInquiry }: ContactViewProps) {
  // Input fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Form Submission Success Feedback inside modal/banner
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Invoke parent action
    onAddInquiry({
      name,
      email,
      phone,
      affiliation,
      title,
      content,
    });

    // Generate local success key
    const mockTicketNum = 'HSX-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedTicket(mockTicketNum);

    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setAffiliation('');
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
      {/* Title */}
      <div className="text-center md:text-left border-b border-slate-200 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#004a99] uppercase tracking-widest bg-blue-150/10 px-2 py-0.5 rounded inline-block">
            CONTACT COOPERATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-sans tracking-tight">연락처 및 학술문의</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">연구 교섭, 공동 논문 용역 계약, 정기 및 하계 세미나 발표 신청 전용 통로입니다.</p>
        </div>
      </div>

      {submittedTicket ? (
        /* Success Screen layout instead of native dialogs */
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-3xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900">학술 컨설팅 문의가 접수되었습니다.</h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-medium">
              기재 전송해주신 연락처와 공문 정보가 연구소 총괄운영 기획실 보안 데이터베이스에 안전하게 기입 수신되었습니다.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto font-mono text-xs">
            <div className="text-slate-400 font-bold">임시 티켓 접수 증서번호</div>
            <div className="text-base font-black text-slate-800 tracking-wider mt-1">{submittedTicket}</div>
          </div>

          <p className="text-[11px] text-slate-400">
            연구소 담당자가 접수 내용을 확인한 뒤 기재해 주신 연락처 또는 이메일로 회신드리겠습니다.
          </p>

          <button
            onClick={() => setSubmittedTicket(null)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition cursor-pointer"
          >
            신규 학술 문의서 작성
          </button>
        </div>
      ) : (
        /* Form Main Layout split screen */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Information Column (5 Col span) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#002e60] text-white p-6 sm:p-8 rounded-2xl space-y-6 border border-blue-950 shadow-sm relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                <Landmark className="w-48 h-48" />
              </div>
              <div className="space-y-2 relative z-10 text-left">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-300">ADMINISTRATIVE INFO</span>
                <h3 className="text-xl font-black">사무실 안내 및 주소</h3>
                <div className="h-0.5 bg-[#004a99] w-12 mt-1.5" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-200 relative z-10 leading-normal">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-350 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    경기도 오산시 한신대길 137 (양산동) 한신대학교 소통관 8431호
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-355 shrink-0" />
                  <span>대표 전화: 031-379-0842</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-357 shrink-0" />
                  <a href="mailto:nsc0203@hs.ac.kr" className="hover:underline text-white font-extrabold">nsc0203@hs.ac.kr</a>
                </div>
              </div>
            </div>

            {/* Support and operating hours detail widget */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-slate-800 tracking-wider flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-slate-400" /> 운영 시간
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                연구소 사무국은 평일 09:00 ~ 17:30 (점심시간 12:00 ~ 13:00) 동안 신규 수탁 사업 사전 조율 접수를 대면 처리하고 있습니다. 방학 기간 단축 운영시 사전 공문 참조를 부탁드립니다.
              </p>
            </div>

          </div>

          {/* Inquiry form input (7 Col span) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-3xs">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#004a99]" /> 학술 문의·제안서 작성
              </h3>
              <p className="text-xs text-slate-400">연구위원을 거격하고 정식 공문을 전달하기 위해 양식을 작성해 주십시오.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">성명 및 의결관</label>
                  <input
                    required
                    type="text"
                    placeholder="성함 기입 (예: 김교수)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">소속 기관 / 직급</label>
                  <input
                    required
                    type="text"
                    placeholder="예: 서울디지털재단 책임위원"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">이메일 주소</label>
                  <input
                    required
                    type="email"
                    placeholder="example@affiliation.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium font-mono"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">연락처 번호</label>
                  <input
                    required
                    type="tel"
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">상담 제목</label>
                <input
                  required
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-3.5 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">제안 용지 및 세부 내용</label>
                <textarea
                  required
                  rows={5}
                  placeholder="공동 연구, 세미나 발표 신청 등 상세 용지를 적어주시면 보안 등록 처리후 즉시 확인 위임 처리됩니다..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full pl-3.5 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#004a99] hover:bg-blue-800 text-white rounded-lg font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
              >
                <Send className="w-4 h-4" /> 보안 이송 및 문의 접수
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
