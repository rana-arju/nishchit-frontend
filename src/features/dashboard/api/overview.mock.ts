import type { DashboardOverview } from "@/features/dashboard/schemas/overview";

function isoDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const mockDashboardOverview: DashboardOverview = {
  stats: {
    todayOrders: 128,
    todayOrdersChangePct: 12.4,
    pendingConfirmation: 34,
    pendingConfirmationChangePct: -6.2,
    highRiskOrders: 9,
    highRiskOrdersChangePct: 18.0,
    returnRatePct: 4.6,
    returnRateChangePct: -1.1,
  },
  dailyOrders: Array.from({ length: 14 }).map((_, index) => ({
    date: isoDaysAgo(13 - index),
    orders: Math.round(60 + Math.random() * 80),
  })),
  recentActivity: [
    {
      id: "1",
      type: "order",
      title: "নতুন অর্ডার নিশ্চিত হয়েছে",
      description: "রাহিম উদ্দিন — ২টি পণ্য, ঢাকা",
      timestamp: isoDaysAgo(0),
    },
    {
      id: "2",
      type: "risk",
      title: "উচ্চ ঝুঁকিপূর্ণ অর্ডার শনাক্ত হয়েছে",
      description: "করিম মিয়া — বারবার ফেরত দেওয়ার ইতিহাস",
      timestamp: isoDaysAgo(0),
    },
    {
      id: "3",
      type: "message",
      title: "নতুন মেসেজ এসেছে",
      description: "সুমাইয়া আক্তার — পণ্যের দাম জানতে চেয়েছেন",
      timestamp: isoDaysAgo(1),
    },
    {
      id: "4",
      type: "return",
      title: "অর্ডার ফেরত দেওয়া হয়েছে",
      description: "জাহিদ হাসান — সাইজ সমস্যা",
      timestamp: isoDaysAgo(1),
    },
    {
      id: "5",
      type: "order",
      title: "নতুন অর্ডার নিশ্চিত হয়েছে",
      description: "নাসরিন বেগম — ১টি পণ্য, চট্টগ্রাম",
      timestamp: isoDaysAgo(2),
    },
  ],
};
