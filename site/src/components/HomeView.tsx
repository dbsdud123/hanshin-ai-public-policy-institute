/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, BookOpen, Calendar, Cpu, Gavel, Award, 
  Users, FileText, Landmark, FileCheck, ArrowUpRight, 
  Activity, ChevronDown, CheckCircle2, MapPin, Mail, Phone, ExternalLink 
} from 'lucide-react';
import { Member, ResearchReport, Notice, NoticeCategory, Inquiry } from '../types';

interface HomeViewProps {
  intro: { purpose: string; vision: string };
  members: Member[];
  research: ResearchReport[];
  notices: Notice[];
  setActiveTab: (tab: string) => void;
  setSelectedResearchId?: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedNoticeId?: React.Dispatch<React.SetStateAction<string | null>>;
  lang: 'ko' | 'en';
  onAddInquiry?: (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => void | Promise<void>;
}

export default function HomeView({
  intro,
  members,
  research,
  notices,
  setActiveTab,
  setSelectedResearchId,
  setSelectedNoticeId,
  lang,
  onAddInquiry,
}: HomeViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Home Form state for mini-contact
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAffiliation, setFormAffiliation] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Stats
  const academicStaffCount = members.filter(m => m.category !== 'ADVISOR').length;
  const advisoryStaffCount = members.filter(m => m.category === 'ADVISOR').length;
  const reportCount = research.length;

  // Sorted notices & research
  const latestNotices = [...notices]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const notableResearch = [...research]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 3);

  // Setup animated high-end grid neural data wave
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      width = w;
      height = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Initialize floating academic network data particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particlesCount = 28;
    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    // Sine waves configurations
    const waves = [
      { y: 0.52, length: 0.0018, amplitude: 55, speed: 0.006, phase: 0, color: 'rgba(0, 74, 153, 0.16)' },
      { y: 0.57, length: 0.0022, amplitude: 35, speed: 0.004, phase: 1.2, color: 'rgba(14, 165, 233, 0.14)' },
      { y: 0.47, length: 0.0014, amplitude: 25, speed: 0.008, phase: 2.5, color: 'rgba(3, 105, 161, 0.09)' }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle gradient background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#ffffff');
      skyGrad.addColorStop(0.5, '#f8fafc');
      skyGrad.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw mathematical neural waves
      waves.forEach((wave) => {
        // Line gradient
        const waveY = height * wave.y;
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = wave.color;

        for (let x = 0; x < width; x += 15) {
          const y = waveY + Math.sin(x * wave.length + wave.phase) * wave.amplitude * Math.sin(x / width * Math.PI);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw small nodes on the sine waves
        for (let x = 100; x < width - 100; x += (width > 768 ? 130 : 200)) {
          const y = waveY + Math.sin(x * wave.length + wave.phase) * wave.amplitude * Math.sin(x / width * Math.PI);
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = wave.color.replace('0.1', '0.4').replace('0.09', '0.35');
          ctx.fill();
        }

        wave.phase += wave.speed;
      });

      // Float data particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 74, 153, ${p.alpha})`;
        ctx.fill();
      });

      // Join close particles with cyber lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / 140) * 0.12})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Form submission handler
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formContent) return;

    if (onAddInquiry) {
      await onAddInquiry({
        name: formName,
        email: formEmail,
        phone: formPhone,
        affiliation: formAffiliation,
        title: formTitle || '한신대학교 AI 공공정책연구소 홈페이지 문의',
        content: formContent
      });
      setFormSuccess(true);
      // Reset after success
      setTimeout(() => {
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormAffiliation('');
        setFormTitle('');
        setFormContent('');
        setFormSuccess(false);
      }, 5000);
    }
  };

  const corePillars = [
    {
      title: lang === 'ko' ? 'AI 공공거버넌스 & 디지털 행정' : 'AI Public Governance & Admin',
      desc: lang === 'ko' 
        ? '행정 데이터와 알고리즘을 활용한 초정밀 맞춤 지자체 의사결정 연구 및 정책 도출.'
        : 'Precision local government decision models fueled by administrative data science.',
      icon: Cpu,
      color: 'text-[#004a99] bg-blue-50',
    },
    {
      title: lang === 'ko' ? '설명가능한 AI & 윤리 검증' : 'Explainable AI & Tech Ethics',
      desc: lang === 'ko'
        ? '알고리즘의 잠재적 편향을 교정하고, 공공 수용성을 위한 설명가능성 지표 수립.'
        : 'Correcting bias and formulating compliance audits to foster public service transparency.',
      icon: FileCheck,
      color: 'text-emerald-700 bg-emerald-50',
    },
    {
      title: lang === 'ko' ? '미래 규제 & 디지털 지능 법제' : 'Future Regulation & Smart Laws',
      desc: lang === 'ko'
        ? '저작권 유출, 생성형 모델 부작용 및 딥페이크 오남용을 타파할 법제적 규격 제안.'
        : 'Crafting legislative guidelines to counteract copyright erosion and synthetic deepfakes.',
      icon: Gavel,
      color: 'text-amber-700 bg-amber-50',
    },
    {
      title: lang === 'ko' ? '스마트 시티 & 지역 연계 혁신' : 'Smart Cities & Civic Integration',
      desc: lang === 'ko'
        ? '자율주행, 정밀 사회 안전망 및 복지 네트워크를 한신대 중심 지자체 네트워크에 안착.'
        : 'Embedding automated safety networks within cities linked to local community structures.',
      icon: Landmark,
      color: 'text-purple-700 bg-purple-50',
    },
  ];

  return (
    <div id="hs-home-viewport" className="w-full flex flex-col justify-start text-left bg-slate-50 relative">

      {/* ================= SECTION 1: FULL SCREEN HERO ================= */}
      <section className="relative w-full h-[calc(100vh-120px)] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-slate-200">
        {/* Animated wave canvas background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Content Lockup */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#004a99]/10 text-[#004a99] border border-[#004a99]/20 rounded-full text-xs font-extrabold uppercase tracking-widest"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse text-[#004a99]" />
            <span>
              {lang === 'ko' ? '대학교 부설 첨단 공공 정책 싱크탱크' : 'Adv. Public Affairs Academic Think Tank'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="text-3.5xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none"
          >
            {lang === 'ko' ? (
              <>
                인공지능으로 설계하는 <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004a99] via-blue-700 to-sky-600">
                  공공정책의 미래
                </span>
              </>
            ) : (
              <>
                Harmonizing AI Policies <br className="sm:inline" />
                with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004a99] via-blue-700 to-sky-600">
                  Human-Centric Values
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {lang === 'ko' ? (
              '한신대학교 AI 공공정책연구소는 데이터와 AI 기술을 통해 행정의 과학화·투명화·효율화를 촉진하고, 공공가치 창출과 지역사회 문제 해결에 기여합니다.'
            ) : (
              'The Hanshin University AI Public Policy Research Institute devises rigorous tech-frameworks for digital national transformation and trustworthy local autonomy.'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.8 }}
            className="flex items-center justify-center gap-4.5 pt-4"
          >
            <a
              href="#about-section"
              className="px-5 py-3 rounded-lg bg-[#004a99] hover:bg-blue-800 text-white font-extrabold text-xs transition shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'ko' ? '연구소 탐색하기' : 'Explore Institute'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setActiveTab('research')}
              className="px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-350 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'ko' ? '학술보고서 열람' : 'Academic Reports'}</span>
            </button>
          </motion.div>
        </div>

        {/* Floating Mouse Scroll down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-mono">
            {lang === 'ko' ? '아래로 스크롤' : 'Scroll Down'}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ChevronDown className="w-4.5 h-4.5 text-slate-400" />
          </motion.div>
        </div>
      </section>


      {/* ================= SECTION 2: INTRO & MISSION ================= */}
      <section id="about-section" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-extrabold text-[#004a99] tracking-widest uppercase bg-[#004a99]/10 px-2.5 py-1 rounded">
              01. PURPOSE & VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'ko' ? '설립의 취지 및 핵심 지향점' : 'Purpose of the Institute'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              {lang === 'ko' ? '공동체의 사회적 가치를 보존하며 혁신하는 유기적 R&D 플랫폼' : 'An interdisciplinary R&D platform serving public equity and precision governance.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#004a99] hover:underline cursor-pointer"
              >
                <span>{lang === 'ko' ? '상세 연혁 및 미션 선언문 보기' : 'View Core Values, History & Organization'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-150 shadow-3xs">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                {lang === 'ko' ? '설립 목적' : 'ESTABLISHMENT STATEMENT'}
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold whitespace-pre-wrap">
                {lang === 'ko' ? intro.purpose : 'The Hanshin University AI Public Policy Research Institute is dedicated to establishing human-centric public policy guidelines and computing standard governance parameters on explaining algorithmic choices in governance.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-gradient-to-br from-slate-900 to-[#002f61] text-white p-6 rounded-2xl border border-slate-800 shadow-3xs">
                <span className="text-[10px] text-sky-400 font-bold tracking-widest uppercase">VISION STATEMENT</span>
                <h4 className="text-base font-extrabold text-white mt-1.5 mb-2">{lang === 'ko' ? '연구소 비전' : 'Core Vision'}</h4>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  "{lang === 'ko' ? intro.vision : 'Leading the construction of trustworthy future governance through technology and human-centric consensus.'}"
                </p>
              </div>

              <div className="bg-[#004a99]/10 text-slate-950 p-6 rounded-2xl border border-blue-100 shadow-3xs">
                <span className="text-[10px] text-[#004a99] font-bold tracking-widest uppercase">ACADEMIC EXCELLENCE</span>
                <h4 className="text-base font-extrabold text-slate-900 mt-1.5 mb-2">{lang === 'ko' ? '통계 성과 지표' : 'Key Milestones'}</h4>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="border-r border-blue-200 pb-1">
                    <div className="text-sm text-slate-400 font-bold">{lang === 'ko' ? '연구원 규모' : 'Staff'}</div>
                    <div className="text-lg font-mono font-black text-[#004a99]">{academicStaffCount}명+</div>
                  </div>
                  <div className="pl-2 pb-1">
                    <div className="text-sm text-slate-400 font-bold">{lang === 'ko' ? '성과보고서' : 'Outputs'}</div>
                    <div className="text-lg font-mono font-black text-[#004a99]">{reportCount}건</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= SECTION 3: CORE PILLARS ================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[11px] font-extrabold text-[#004a99] tracking-widest uppercase bg-[#004a99]/10 px-2.5 py-1 rounded inline-block">
              02. RESEARCH PILLARS
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight">
              {lang === 'ko' ? '4대 핵심 역량 연구 분야' : 'Core Domains of Scholarly Focus'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              {lang === 'ko' 
                ? '공학 기술과 규제 과학, 행정 실증을 용해하는 본 연구소만의 정교한 다학제간 융합 연구 카테고리입니다.'
                : 'Interdisciplinary policy-making structures crossing smart systems, computer science, and legal jurisprudence.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-3xs hover:shadow-2xs hover:border-blue-400 transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${pillar.color}`}>
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-505 text-xs leading-relaxed font-medium">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= SECTION 4: RESEARCH DIRECTORY ================= */}
      <section className="py-20 bg-white border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-[11px] font-extrabold text-[#004a99] tracking-widest uppercase bg-[#004a99]/10 px-2.5 py-1 rounded">
              03. RESEARCH STAFF
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {lang === 'ko' ? '교수진 및 상임 위원단' : 'Our Leading Faculty'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
              {lang === 'ko' 
                ? '학계의 정격 검증을 이행하는 핵심 인사들과 분야별 위생 지표 자문단들의 실인명 정보입니다.'
                : 'Top-tier researchers guiding governance frameworks across key departments.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('people')}
                className="px-4.5 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ko' ? '전체 프로필 & 자문단 열람' : 'View Staff Profiles'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {members.slice(0, 3).map((m) => (
              <div 
                key={m.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center flex flex-col justify-between hover:border-blue-300 hover:bg-white transition"
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-center text-[#004a99] font-black mx-auto">
                    {m.imageUrl ? (
                      <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
                    ) : (
                      <Users className="w-6 h-6 text-[#004a99]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {m.name} <span className="text-[10px] text-[#004a99] font-black">{m.title}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 font-bold">{m.affiliation}</p>
                  </div>
                  <hr className="border-slate-200" />
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                    {m.researchArea}
                  </p>
                </div>
                {m.email && (
                  <div className="text-[10px] text-[#004a99] font-mono mt-3 select-all">
                    {m.email}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= SECTION 5: RESEARCH OUTPUTS ================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 text-left">
            <div>
              <span className="text-[11px] font-extrabold text-[#004a99] tracking-widest uppercase bg-[#004a99]/10 px-2.5 py-1 rounded inline-block">
                04. SCHOLARLY ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight mt-1.5">
                {lang === 'ko' ? '최신 학술 논문 및 정책 성과' : 'Key Research Publications'}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('research')}
              className="text-xs font-extrabold text-[#004a99] hover:underline shrink-0 text-left cursor-pointer"
            >
              {lang === 'ko' ? '아카이브 전집 열람하기 →' : 'Browse Complete Archive →'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notableResearch.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  if (setSelectedResearchId) {
                    setSelectedResearchId(report.id);
                  }
                  setActiveTab('research');
                }}
                className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-2xs transition duration-200 flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
                    <span className="text-[#004a99] px-2 py-0.5 bg-[#004a99]/5 rounded border border-[#004a99]/25">
                      {report.category === 'ACADEMIC_PAPER' ? (lang === 'ko' ? '학술논문' : 'Paper') : (lang === 'ko' ? '정책보고서' : 'Report')}
                    </span>
                    <span>{report.date}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#004a99] line-clamp-2 leading-snug transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-[11px] text-slate-455 line-clamp-2 leading-relaxed">
                    {report.summary}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center text-[10px] text-slate-405 font-bold">
                  <span>{lang === 'ko' ? '공동기명:' : 'Authors:'} {report.authors}</span>
                  <span className="text-[#004a99]">{lang === 'ko' ? '열람수' : 'Downloads'} {report.downloadCount}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= SECTION 6: ANNOUNCEMENTS ================= */}
      <section className="py-20 bg-white border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 text-left">
            <div>
              <span className="text-[11px] font-extrabold text-[#004a99] tracking-widest uppercase bg-[#004a99]/10 px-2.5 py-1 rounded inline-block">
                05. PUBLIC NOTICE & COLLOQUIUM
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight mt-1.5">
                {lang === 'ko' ? '연구소 주관 일정 및 학술 공지' : 'Notices, Colloquiums & News'}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('board')}
              className="text-xs font-extrabold text-[#004a99] hover:underline shrink-0 text-left cursor-pointer"
            >
              {lang === 'ko' ? '공지자료실 주소 바로가기 →' : 'Check All News & Notices →'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Spotlight Pin Info (Left 7 Columns) */}
            <div className="lg:col-span-7">
              {latestNotices.filter(n => n.isPinned)[0] ? (
                (() => {
                  const pin = latestNotices.filter(n => n.isPinned)[0];
                  return (
                    <div 
                      onClick={() => {
                        if (setSelectedNoticeId) setSelectedNoticeId(pin.id);
                        setActiveTab('board');
                      }}
                      className="group cursor-pointer bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-sm hover:scale-[1.002] transition duration-200 flex flex-col justify-between h-full min-h-[300px]"
                    >
                      <div className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-bold tracking-wider rounded-lg border border-amber-400/35">
                          <Award className="w-3.5 h-3.5 animate-bounce" /> {lang === 'ko' ? '주목할 만한 주요 학술세미나' : 'Featured Colloquium'}
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {pin.title}
                        </h3>
                        <p className="text-xs text-slate-350 leading-relaxed font-semibold line-clamp-4">
                          {pin.content}
                        </p>
                      </div>
                      <div className="border-t border-slate-800 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-400 font-semibold font-mono">
                        <span>{lang === 'ko' ? '행정 부처:' : 'Host:'} {pin.author}</span>
                        <span>{pin.date}</span>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                  <p className="text-slate-400 text-xs font-semibold">{lang === 'ko' ? '고정된 중점 자문 정보가 존재하지 않습니다.' : 'No spotlight notices present.'}</p>
                </div>
              )}
            </div>

            {/* Scrolling Normal Notices (Right 5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {latestNotices.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (setSelectedNoticeId) setSelectedNoticeId(n.id);
                    setActiveTab('board');
                  }}
                  className="group cursor-pointer p-4 rounded-xl border border-slate-150 hover:border-blue-400 hover:bg-slate-50 transition duration-200 text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`inline-block px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      n.category === NoticeCategory.SEMINAR 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : n.category === NoticeCategory.RECRUIT
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-blue-50 text-[#004a99]'
                    }`}>
                      {n.category === NoticeCategory.SEMINAR 
                        ? (lang === 'ko' ? '학술세미나' : 'Colloquium')
                        : n.category === NoticeCategory.RECRUIT
                        ? (lang === 'ko' ? '연구진초빙' : 'Careers')
                        : (lang === 'ko' ? '일반공지' : 'Notice')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#004a99] line-clamp-1 transition-colors leading-relaxed">
                    {n.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ================= SECTION 7: INQUIRY & CONTACT ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[11px] font-extrabold text-[#004a99] tracking-widest uppercase bg-[#004a99]/10 px-2.5 py-1 rounded inline-block">
              06. CONTACT US
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight">
              {lang === 'ko' ? '학술 위탁 및 협력 공동 연구 제안' : 'Academic Collaboration & Inquiries'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
              {lang === 'ko' 
                ? '지자체, 정부기관, 지능형 융합 기업과의 공동 학술 조사를 상시 접수 수용합니다.'
                : 'Submit requests for policy validation, advisory boards, or joint research programs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
            
            {/* Form Box (7 Columns) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/85 shadow-3xs">
              <h3 className="text-sm font-extrabold text-[#004a99] uppercase tracking-wider mb-5">
                {lang === 'ko' ? '삼자 관계 서류 및 의사 제전' : 'Send us a Message'}
              </h3>
              
              {formSuccess ? (
                <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 text-center transition animate-fade-in">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-[#004a99]">
                    <CheckCircle2 className="w-6 h-6 text-[#004a99]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-100">{lang === 'ko' ? '전송이 정상 수록되었습니다.' : 'Inquiry Document Logged'}</h4>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ko' ? '접수 고유 번호 생성을 마쳤으며, 신속 검증을 위해 기입해 주신 이메일 주소로 회신을 송부할 것입니다.' : 'The executive admin team will respond to your associated email address shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'ko' ? '성명 / 담당자' : 'Contact Name'}</label>
                      <input 
                        required
                        type="text" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="예: 홍길동"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'ko' ? '이메일 주소' : 'Email Address'}</label>
                      <input 
                        required
                        type="email" 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="예: prof@hs.ac.kr"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'ko' ? '기관 / 소속명' : 'Affiliation'}</label>
                      <input 
                        type="text" 
                        value={formAffiliation}
                        onChange={(e) => setFormAffiliation(e.target.value)}
                        placeholder="예: 행정안전부 디지털본부"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'ko' ? '긴급 회신 연락처' : 'Contact Phone'}</label>
                      <input 
                        type="tel" 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'ko' ? '의뢰서 제목' : 'Inquiry Title'}</label>
                    <input 
                      type="text" 
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder={lang === 'ko' ? '예: 스마트시티 구축 관련 행정위탁 자문 의뢰' : 'Title of your joint proposal'}
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'ko' ? '협력 제안/문의 상세 내용' : 'Message details'}</label>
                    <textarea 
                      required
                      rows={5}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder={lang === 'ko' ? '자문 의뢰 목적과 개략적인 일정을 기술해 주십시오.' : 'Specify collaboration details, budget and schedule.'}
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#004a99] transition font-medium text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#004a99] hover:bg-blue-800 text-white font-extrabold text-xs transition shadow-sm hover:shadow-md cursor-pointer text-center"
                  >
                    {lang === 'ko' ? '공식 위탁 자문 신청서 전송하기 (암호화 송신)' : 'Transmit Formal Proposal via Secure TLS'}
                  </button>
                </form>
              )}
            </div>

            {/* Address / Location Map Placeholder (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-3xs space-y-6">
                <div>
                  <h4 className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">{lang === 'ko' ? '연구소 주소지' : 'HQ Headquarters'}</h4>
                  <p className="text-base font-extrabold text-white mt-1">{lang === 'ko' ? '한신대학교 소통관 8431호' : 'Sotong Hall 8431'}</p>
                </div>

                <div className="space-y-4 text-xs text-slate-350">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>경기도 오산시 한신대길 137 (양산동) 한신대학교 소통관 8431호</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <a href="mailto:nsc0203@hs.ac.kr" className="hover:text-white transition">nsc0203@hs.ac.kr</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                    <a href="tel:0313790842" className="hover:text-white transition">031-379-0842</a>
                  </div>
                </div>

                <hr className="border-slate-850" />

                {/* Simulated geographic map representation with academic brand */}
                <div className="rounded-xl overflow-hidden border border-slate-750 bg-slate-950 p-1 relative h-40">
                  <div className="absolute inset-0 bg-slate-900 flex flex-col justify-center items-center opacity-70">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping mb-1" />
                    <div className="text-[10px] font-bold text-slate-300">한신대학교 소통관 8431호</div>
                    <div className="text-[8px] text-slate-500 mt-0.5 font-mono">Hanshin University, Osan</div>
                  </div>
                  {/* Styling grid decor lines for simulated academic map */}
                  <div className="w-full h-full border border-slate-800 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="border border-slate-800" />
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="https://www.hs.ac.kr/kor/1155/subview.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] text-slate-420 hover:text-white transition font-black"
                  >
                    <span>{lang === 'ko' ? '한신대학교 캠퍼스 맵 자세히 보기' : 'Show Campus Blueprint'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Secure Assurance Tag */}
              <div className="bg-white p-5 rounded-xl border border-slate-205 text-[11px] text-slate-455 space-y-2 leading-relaxed shadow-3xs z-10">
                <div className="flex items-center gap-1.5 font-extrabold text-[#004a99] uppercase text-[10px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ko' ? '개인정보 보호 및 국책 보안 준수' : 'Security Policy Compliance'}</span>
                </div>
                <p>
                  {lang === 'ko' 
                    ? '본 창구를 통해 발송되는 학정 위탁 서신들은 256비트 SSL 암호화 절차를 필하며, 상임 관리 실장 검증 후에 즉시 아카이브에 기밀 안착 처리됩니다.'
                    : 'All proposal packets transmitted via this station comply with standard HTTPS AES-256 validation schemes prior to inspection by executive personnel.'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
