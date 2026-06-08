/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, Mail, Phone, MapPin, Shield, Lock, ExternalLink } from 'lucide-react';
import { SITE_CREDIT } from '../config';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
  setOpenLoginModal: (open: boolean) => void;
}

export default function Footer({
  setActiveTab,
  isAdmin,
  onLogout,
  setOpenLoginModal,
}: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-left">
      {/* Upper Area widgets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <Landmark className="w-6 h-6 text-sky-450" />
              <span className="text-lg font-extrabold tracking-tight">한신대학교 AI 공공정책연구소</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
              인공지능(AI) 기술과 공공 가치의 조화로운 융합을 연구하여,
              투명하고 정교한 미래 디지털 정책 표준과 거버넌스를 설계합니다.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 font-bold">
              <span className="hover:text-amber-500 cursor-pointer">개인정보처리방침</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">이용약관</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">이메일무단수집거부</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">연구소 바로가기</h4>
            <ul className="text-sm text-slate-400 space-y-2.5 font-bold">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  연구소개 및 비전
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('people')} className="hover:text-white transition-colors text-left cursor-pointer">
                  상임 연구진 및 자문위원단
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('research')} className="hover:text-white transition-colors text-left cursor-pointer">
                  주요 정책연구·논문 아카이브
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('board')} className="hover:text-white transition-colors text-left cursor-pointer">
                  학술세미나 및 소식 자료실
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">대표 연락처</h4>
            <div className="space-y-3 text-sm text-slate-400 font-medium">
              <address className="not-italic flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>경기도 오산시 한신대길 137 (양산동) 한신대학교 소통관 8431호</span>
              </address>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:nsc0203@hs.ac.kr" className="hover:text-white transition-colors">nsc0203@hs.ac.kr</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:0313790842" className="hover:text-white transition-colors">031-379-0842</a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-slate-800 my-8" />

        {/* Bottom copyright & management shortcut */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div>
            <p>© {new Date().getFullYear()} Hanshin University AI Public Policy Research Institute. All rights reserved.</p>
            <p className="mt-1 text-slate-600">본 사이트에 수록된 정책 보고서는 정보 공유 목적으로 전체 무료 개방하고 있습니다.</p>
            <p className="mt-1 text-slate-600">
              Website designed & developed by{' '}
              <a href={`mailto:${SITE_CREDIT.email}`} className="hover:text-slate-300 transition-colors font-bold">
                {SITE_CREDIT.name}
              </a>
              .
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://www.hs.ac.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-300 transition-colors font-bold"
            >
              한신대학교 대표홈페이지 <ExternalLink className="w-3 h-3" />
            </a>
            
            <span>|</span>

            {isAdmin ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/40 hover:bg-blue-900 border border-blue-800 rounded text-blue-300 transition-all font-bold cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" /> 연구소 통합관리도구
              </button>
            ) : (
              <button
                onClick={() => setOpenLoginModal(true)}
                className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" /> 관리체계 로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
