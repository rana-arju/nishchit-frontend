import { MessageSquareText, ShieldCheck, TrendingUp, Truck } from "lucide-react";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";

const featureIcons = {
  inbox: MessageSquareText,
  risk: ShieldCheck,
  courier: Truck,
  dashboard: TrendingUp,
};

function BrandList() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 md:gap-20 md:pr-20">
      {/* 1. SteadFast Courier - Authentic Kite Symbol + Modern Typography */}
      <div className="group flex items-center gap-3 transition-transform hover:scale-105">
        <div className="relative flex size-8.5 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-slate-800">
          <svg viewBox="0 0 28 28" className="size-5 fill-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L24 12L14 22L4 12L14 2Z" fill="#0284C7" fillOpacity="0.25" />
            <path
              d="M14 4L22 12L14 20L6 12L14 4Z"
              stroke="#38BDF8"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M14 4V20M6 12H22" stroke="#38BDF8" strokeWidth="1.8" />
            <path
              d="M14 20L11 25M14 20L17 25"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="leading-none">
          <span className="font-sans text-[15px] font-black tracking-tight text-slate-900 dark:text-white">
            SteadFast
          </span>
          <span className="block pt-0.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Courier
          </span>
        </div>
      </div>

      {/* 2. Pathao Courier - Authentic Brand Typography with Swoosh */}
      <div className="group flex items-center gap-2 transition-transform hover:scale-105">
        <div className="flex items-center gap-2">
          <svg className="size-6 text-[#e11938]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.5 13.5L12 4l8.5 9.5-3.5 1-5-5-5 5z" fill="#e11938" />
            <path d="M6 16.5L12 10l6 6.5-2.5 1-3.5-3.5-3.5 3.5z" fill="#e11938" opacity="0.8" />
          </svg>
          <div className="leading-none">
            <span className="font-sans text-xl font-black tracking-tighter text-[#e11938] italic">
              pathao
            </span>
            <span className="block pt-0.5 text-[10.5px] font-bold tracking-widest text-[#e11938] italic">
              courier
            </span>
          </div>
        </div>
      </div>

      {/* 3. RedX Delivery - Authentic REDX Brand Mark */}
      <div className="group flex items-center gap-2 transition-transform hover:scale-105">
        <div className="flex items-center gap-2">
          <div className="leading-none">
            <div className="flex items-center">
              <span className="font-sans text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                RED
              </span>
              <span className="font-sans text-2xl font-black text-[#EA1D2C] italic">X</span>
            </div>
            <span className="block text-[10px] font-bold tracking-wider text-slate-600 italic dark:text-slate-400">
              Delivery
            </span>
          </div>
        </div>
      </div>

      {/* 4. Meta Business Partners - Official Meta Infinity Symbol */}
      <div className="group flex items-center gap-2.5 transition-transform hover:scale-105">
        <svg
          className="h-6 w-8.5 shrink-0"
          viewBox="0 0 256 183"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Meta Logo"
        >
          <path
            fill="#0081FB"
            d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 32.325-45.31 32.325-15.045 0-29.356-6.522-42.348-18.067-11.233-10.024-21.737-25.048-31.516-40.032l-13.916-21.378c-8.916-13.69-18.681-28.841-29.091-38.653-7.551-7.14-14.24-9.875-20.24-9.875-7.464 0-14.12 3.12-18.094 9.593-3.791 6.136-5.438 14.542-5.438 25.442 0 17.065 4.316 35.859 10.198 51.583 6.096 16.291 13.797 29.803 21.611 38.077 7.962 8.43 15.688 12.35 22.95 12.35 6.421 0 12.316-2.671 17.533-7.95 5.485-5.55 10.274-13.847 14.615-23.955l14.288 6.196c-5.753 13.257-12.281 23.47-19.467 30.742-8.082 8.18-17.653 12.336-28.423 12.336-12.011 0-23.75-5.914-32.55-15.228-10.428-11.036-19.49-27.487-26.79-47.01-7.565-20.219-11.967-42.854-11.967-62.868 0-16.09 2.459-28.784 7.309-36.634 5.372-8.694 13.627-13.141 24.529-13.141 11.83 0 24.237 5.46 37.07 17.566 10.518 9.943 21.05 25.105 30.932 40.291l13.659 21.036c10.463 16.088 20.841 32.05 31.066 42.164 10.271 10.161 20.301 15.313 29.824 15.313 19.349 0 27.279-15.006 30.567-20.697 3.525-6.11 5.922-15.011 5.922-30.82 0-24.89-6.398-50.04-19.559-69.418-10.742-15.772-24.636-23.738-41.258-23.738-15.706 0-30.339 7.42-43.431 18.795-11.233 9.99-21.724 25.01-31.503 39.993"
          />
        </svg>
        <div className="leading-tight">
          <span className="font-sans text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
            Meta
          </span>
          <span className="block text-[9.5px] font-semibold text-slate-500 dark:text-slate-400">
            Business Partners
          </span>
        </div>
      </div>
    </div>
  );
}

export function PartnerLogos() {
  const { partners } = marketingContent;

  return (
    <div className="border-border/60 w-full overflow-hidden border-b bg-slate-50/90 py-5 backdrop-blur-md dark:bg-slate-900/40">
      <div className="flex w-full flex-col lg:flex-row lg:items-center">
        {/* Left Trust Statement Badge */}
        <div className="z-20 shrink-0 border-slate-200 bg-slate-50/90 px-6 py-2 lg:border-r dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-center text-xs font-semibold tracking-tight whitespace-nowrap text-slate-800 sm:text-sm lg:text-left dark:text-slate-200">
            {partners.title}
          </p>
        </div>

        {/* Full-width continuous Auto-Slide Marquee Container */}
        <div className="relative flex-1 overflow-hidden">
          {/* Subtle gradient edge fades */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent sm:w-20 dark:from-slate-900/90" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent sm:w-20 dark:from-slate-900/90" />

          {/* Infinite Marquee Track */}
          <div className="animate-marquee flex items-center py-2">
            <BrandList />
            <BrandList />
            <BrandList />
            <BrandList />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const { features } = marketingContent;

  return (
    <section
      id="features"
      className="scroll-mt-16 bg-white transition-colors duration-300 dark:bg-slate-950"
    >
      {/* 1. Partner Logos Section directly below Hero */}
      <PartnerLogos />

      {/* 2. Main Features Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-xs font-bold tracking-widest text-purple-600 uppercase dark:text-purple-400">
            {features.eyebrow}
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
            {features.title}
          </h2>
        </Reveal>

        {/* 4 Responsive Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item, idx) => {
            const Icon = featureIcons[item.key as keyof typeof featureIcons] || MessageSquareText;

            return (
              <Reveal key={item.title}>
                <div
                  className={`group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white bg-gradient-to-b p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-slate-700 ${item.gradient || "from-slate-50 to-white"}`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div>
                    {/* Floating Color Badge Icon */}
                    <div
                      className={`mb-6 inline-flex size-12 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-300 group-hover:scale-110 ${item.badgeColor}`}
                    >
                      <Icon className="size-6 stroke-[2.2]" />
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom subtle ambient accent line on hover */}
                  <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-purple-500 to-sky-400 transition-all duration-300 group-hover:w-16" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
