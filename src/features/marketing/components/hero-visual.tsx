"use client";

import {
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { marketingContent } from "@/features/marketing/content";

type HeroContent = (typeof marketingContent)["hero"];

const flowSteps = [
  {
    id: "capture",
    label: "AI Order Capture",
    icon: MessageSquareText,
    glow: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "risk",
    label: "Risk Check",
    icon: ShieldCheck,
    glow: "rgba(14, 165, 233, 0.4)",
  },
  {
    id: "confirm",
    label: "Confirm with Customer",
    icon: CheckCircle2,
    glow: "rgba(99, 102, 241, 0.45)",
  },
  {
    id: "courier",
    label: "Book Courier",
    icon: Truck,
    glow: "rgba(168, 85, 247, 0.45)",
  },
  {
    id: "track",
    label: "Track & Manage",
    icon: BarChart3,
    glow: "rgba(217, 70, 239, 0.4)",
  },
] as const;

export function HeroVisual({ hero }: { hero: HeroContent }) {
  const [activeStep, setActiveStep] = useState(0);

  // Subtle cyclic highlight on flow items to bring section to life
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center py-1 sm:py-4 lg:justify-end">
      {/* Background radial glow specifically around phone and flow */}
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-radial from-violet-600/25 via-sky-500/15 to-transparent blur-3xl" />

      {/* ==================== MOBILE/TABLET INTELLIGENT STEP CHIPS (Hidden on LG) ==================== */}
      {/* Instead of stacking 5 giant cards below the phone making the screen endlessly long,
          provide an elegant, compact horizontal workflow bar with active indicator */}
      <div className="mb-4 flex w-full max-w-md items-center justify-center lg:hidden">
        <div className="flex w-full items-center justify-between gap-1.5 overflow-x-auto rounded-2xl border border-white/15 bg-slate-900/70 p-1.5 backdrop-blur-xl shadow-lg scrollbar-none">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-[11px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/30 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                aria-label={step.label}
              >
                <Icon className="size-3.5 shrink-0" />
                <span className="truncate hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-end">
        {/* ==================== 1. SMARTPHONE CONTAINER ==================== */}
        <div className="relative z-20 flex-shrink-0">
          {/* Neon outline glow around phone */}
          <div className="hero-phone-glow" />

          {/* Smartphone Hardware Frame (Precision Titanium Curved Edge, responsive sizing) */}
          <div className="hero-phone relative w-[18.2rem] rounded-[2.75rem] border-[4px] border-slate-300/60 dark:border-slate-500/50 bg-gradient-to-b from-slate-200 via-slate-600 to-slate-900 dark:from-slate-700 dark:via-slate-800 dark:to-slate-950 p-[2.5px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] sm:w-[20.5rem] sm:rounded-[3.25rem] sm:border-[4.5px] sm:p-[3px] sm:shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
            {/* Inner Display Bezel */}
            <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-black/80 bg-white dark:bg-slate-950 shadow-inner">
              {/* Dynamic Island / Notch + Status Bar */}
              <div className="flex h-9 sm:h-10 items-center justify-between bg-white dark:bg-slate-950 px-6 sm:px-7 pt-2 sm:pt-2.5 text-slate-800 dark:text-slate-200">
                <span className="text-[0.75rem] sm:text-[0.8rem] font-semibold tracking-tight">
                  {hero.mock.time || "10:24 AM"}
                </span>

                {/* Speaker pill notch */}
                <div className="flex h-3.5 sm:h-4 w-18 sm:w-20 items-center justify-center rounded-full bg-slate-900 dark:bg-black">
                  <div className="size-1.5 sm:size-2 rounded-full bg-slate-950" />
                </div>

                {/* Status Bar Icons (signal, wifi, battery) */}
                <div className="flex items-center gap-1 sm:gap-1.5 text-slate-800 dark:text-slate-200">
                  <span className="flex items-end gap-0.5">
                    <span className="h-1.5 w-0.5 rounded-xs bg-current" />
                    <span className="h-2 w-0.5 rounded-xs bg-current" />
                    <span className="h-2.5 w-0.5 rounded-xs bg-current" />
                    <span className="h-3 w-0.5 rounded-xs bg-current" />
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold">5G</span>
                  <div className="flex h-2.5 sm:h-3 w-4 sm:w-5 items-center rounded-xs sm:rounded-sm border border-slate-700 dark:border-slate-400 p-0.5">
                    <div className="h-full w-full rounded-xs bg-slate-800 dark:bg-slate-200" />
                  </div>
                </div>
              </div>

              {/* Chat Header */}
              <div className="flex items-center gap-2.5 sm:gap-3 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xs">
                {/* Brand Avatar */}
                <div className="relative flex size-8 sm:size-9.5 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-xs sm:text-sm font-bold text-white shadow-sm">
                  <span>N</span>
                  {/* Online indicator green dot */}
                  <span className="absolute right-0 bottom-0 size-2 sm:size-2.5 rounded-full border-2 border-white dark:border-slate-950 bg-emerald-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-[11.5px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                    {hero.mock.brandName || "Your Brand"}
                  </h4>
                  <p className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {hero.mock.activeStatus || "Active now"}
                  </p>
                </div>

                {/* Audio / Video Icons */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-blue-600 dark:text-blue-400">
                  <button
                    type="button"
                    aria-label="Phone Call"
                    className="rounded-full p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Phone className="size-4 sm:size-4.5 fill-blue-600/10 dark:fill-blue-400/20" />
                  </button>
                  <button
                    type="button"
                    aria-label="Video Call"
                    className="rounded-full p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Video className="size-4.5 sm:size-5 fill-blue-600/10 dark:fill-blue-400/20" />
                  </button>
                </div>
              </div>

              {/* Chat Message Scrollable Body */}
              <div className="space-y-3 sm:space-y-3.5 bg-gradient-to-b from-slate-50/90 to-white dark:from-slate-900/90 dark:to-slate-950 px-3 sm:px-3.5 py-3 sm:py-4 text-xs">
                {/* Timestamp Pill */}
                <div className="flex justify-center">
                  <span className="rounded-full bg-slate-200/70 dark:bg-slate-800 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {hero.mock.time || "10:24 AM"}
                  </span>
                </div>

                {/* 1. Customer Message Bubble (Inbound) */}
                <div className="max-w-[90%] sm:max-w-[88%] rounded-2xl rounded-tl-sm border border-slate-200/80 dark:border-slate-800 bg-slate-100/95 dark:bg-slate-800/90 p-2.5 sm:p-3.5 text-slate-800 dark:text-slate-100 shadow-xs">
                  <p className="whitespace-pre-line text-[11px] sm:text-[11.5px] leading-relaxed font-bangla font-medium">
                    {hero.mock.customerMessage ||
                      "ভাই, ওইটা লাল টি-শার্টটা আছে? XL সাইজ নিবো ভাই।\nঠিকানা: মিরপুর, ঢাকা।\nফোন: 01812XXXXXX"}
                  </p>
                </div>

                {/* Bot Label Tag */}
                <div className="flex items-center gap-1.5 pl-1 text-[10.5px] sm:text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex size-4 sm:size-4.5 items-center justify-center rounded-full bg-blue-600 text-[8.5px] sm:text-[9px] font-bold text-white shadow-xs">
                    N
                  </span>
                  <span>{hero.mock.botName || "Nishchit AI"}</span>
                  <span className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-violet-100 dark:bg-violet-950/70 px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-medium text-violet-700 dark:text-violet-300">
                    <Sparkles className="size-2.5" /> AI
                  </span>
                </div>

                {/* 2. Messenger Generic Template / Receipt Card */}
                <div className="overflow-hidden rounded-2xl border border-emerald-500/30 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-xs">
                  {/* Card Title Banner */}
                  <div className="flex items-center gap-1.5 border-b border-emerald-500/15 bg-emerald-100/60 dark:bg-emerald-900/40 px-2.5 sm:px-3 py-1.5 sm:py-2 text-emerald-800 dark:text-emerald-300 font-bangla">
                    <span className="flex size-3.5 sm:size-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Check className="size-2.5 stroke-[3]" />
                    </span>
                    <span className="text-[10.5px] sm:text-[11.5px] font-bold">
                      {hero.mock.orderSummaryTitle || "অর্ডার ডিটেইলস (AI দ্বারা প্রস্তুত)"}
                    </span>
                  </div>

                  {/* Product Details Item */}
                  <div className="p-2 sm:p-2.5">
                    <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-emerald-600/15 bg-white/95 dark:bg-slate-900/90 p-2 sm:p-2.5 shadow-xs">
                      <div className="relative size-12 sm:size-14 shrink-0 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                        <Image
                          src={hero.mock.productImage || "/red-tshirt.jpg"}
                          alt={hero.mock.productName || "T-Shirt (Red)"}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 leading-snug">
                        <p className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-xs">
                          {hero.mock.productName || "T-Shirt (Red)"}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-300">
                          {hero.mock.productSize || "Size: XL"}
                        </p>
                        <p className="mt-0.5 font-bold text-slate-900 dark:text-emerald-400 text-[11px] sm:text-xs">
                          {hero.mock.productPrice || "Price: ৳ 550"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Messenger Quick Replies / Structured Button Card */}
                <div className="rounded-2xl border border-emerald-500/30 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/30 p-2.5 sm:p-3 shadow-xs font-bangla">
                  <p className="mb-1.5 sm:mb-2 text-center text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100">
                    {hero.mock.confirmQuestion || "অর্ডারটি কনফার্ম করতে চান?"}
                  </p>
                  <div className="space-y-1.5">
                    {/* Primary Button */}
                    <button
                      type="button"
                      className="group flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-1.5 sm:py-2 text-center text-[11px] sm:text-xs font-bold text-white shadow-md shadow-indigo-500/30 transition-transform active:scale-95 hover:opacity-95"
                    >
                      <Check className="size-3.5 stroke-[2.5]" />
                      <span>{hero.mock.confirmAction || "হ্যাঁ, কনফার্ম করুন"}</span>
                    </button>
                    {/* Secondary Button */}
                    <button
                      type="button"
                      className="w-full rounded-full border border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-800 py-1 sm:py-1.5 text-center text-[10.5px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {hero.mock.modifyAction || "না, পরিবর্তন চাই"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Messenger Bottom Input Bar */}
              <div className="flex items-center gap-2 sm:gap-2.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 sm:py-2.5 text-blue-600 dark:text-blue-400">
                <button
                  type="button"
                  aria-label="Add"
                  className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm"
                >
                  +
                </button>
                <div className="flex flex-1 items-center justify-between rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 sm:px-3 py-1 sm:py-1.5 text-slate-400">
                  <span className="text-[11px] sm:text-xs">Aa</span>
                  <span className="text-[11px] sm:text-xs font-mono">🙂</span>
                </div>
                <button
                  type="button"
                  aria-label="Like"
                  className="size-6 sm:size-7 rounded-full flex items-center justify-center hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-xs sm:text-sm"
                >
                  👍
                </button>
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="flex justify-center bg-white dark:bg-slate-950 pb-1 pt-0.5">
                <div className="h-1 w-24 sm:w-28 rounded-full bg-slate-800/80 dark:bg-slate-400/80" />
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 2. VISIBLE NEON CONNECTING ARC & DESKTOP FLOW CARDS (LG ONLY) ==================== */}
        <div className="relative z-30 hidden lg:flex lg:-ml-5 lg:w-auto lg:flex-row lg:items-center">
          {/* Prominent High-Contrast SVG Arc */}
          <div className="pointer-events-none relative h-[420px] w-28 shrink-0">
            <svg
              className="h-full w-full overflow-visible"
              viewBox="0 0 120 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="neonArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#818cf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d946ef" stopOpacity="0.95" />
                </linearGradient>

                <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Soft Ambient Glow Path behind */}
              <path
                d="M 12 40 C 72 120, 72 300, 12 380"
                stroke="url(#neonArcGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.45"
                filter="url(#intenseGlow)"
              />

              {/* Crisp Core Curved Path */}
              <path
                d="M 12 40 C 72 120, 72 300, 12 380"
                stroke="url(#neonArcGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Glowing Nodes aligned with the 5 workflow cards */}
              {[
                { cx: 14, cy: 44, index: 0 },
                { cx: 48, cy: 128, index: 1 },
                { cx: 62, cy: 210, index: 2 },
                { cx: 48, cy: 292, index: 3 },
                { cx: 14, cy: 376, index: 4 },
              ].map(({ cx, cy, index }) => {
                const isActive = activeStep === index;
                return (
                  <g key={index} className="transition-all duration-300">
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? "10" : "7"}
                      fill="#38bdf8"
                      fillOpacity={isActive ? "0.6" : "0.35"}
                      filter="drop-shadow(0 0 8px #38bdf8)"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? "6" : "4.5"}
                      fill="#0284c7"
                      stroke="#ffffff"
                      strokeWidth={isActive ? "2" : "1.5"}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? "3" : "2"}
                      fill="#ffffff"
                    />
                    <line
                      x1={cx}
                      y1={cy}
                      x2={cx + 46}
                      y2={cy}
                      stroke={isActive ? "#38bdf8" : "rgba(125, 211, 252, 0.6)"}
                      strokeWidth={isActive ? "2" : "1.5"}
                      strokeDasharray="3 3"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating Glassmorphic Status Pills on Large screens */}
          <div className="z-30 flex w-[17.5rem] flex-col gap-3.5">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`hero-flow-card group relative flex cursor-pointer items-center justify-between gap-3.5 rounded-2xl border px-4 py-3.5 backdrop-blur-xl transition-all duration-300 ${
                    isActive
                      ? "border-sky-400/90 bg-gradient-to-r from-sky-500/30 via-indigo-600/25 to-purple-600/25 shadow-[0_0_32px_rgba(56,189,248,0.45)] translate-x-1.5"
                      : "border-white/20 bg-slate-900/60 hover:border-white/40 hover:bg-slate-900/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                  }`}
                  style={{
                    animationDelay: `${idx * 150}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? "bg-gradient-to-tr from-sky-400 to-indigo-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.65)]"
                          : "bg-white/10 text-sky-300 group-hover:bg-white/15 group-hover:text-white"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>

                    <span className="text-[13.5px] font-semibold tracking-tight text-white/95">
                      {step.label}
                    </span>
                  </div>

                  <div className="flex items-center">
                    {isActive ? (
                      <span className="size-2.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8] animate-pulse" />
                    ) : (
                      <ChevronRight className="size-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/80" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

