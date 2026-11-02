import type { Conversation } from "@/features/inbox/schemas/conversation";

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    customerName: "রাহিম উদ্দিন",
    channel: "messenger",
    status: "pending",
    stage: "contacted",
    tags: ["ভিআইপি"],
    notes: [
      {
        id: "n1",
        text: "ডেলিভারি নিয়ে বারবার জিজ্ঞাসা করছেন, অগ্রাধিকার দিন।",
        createdAt: minutesAgo(20),
      },
    ],
    unreadCount: 2,
    lastMessagePreview: "ভাই, ডেলিভারি কবে দিবেন?",
    lastMessageAt: minutesAgo(6),
    aiDraftReady: true,
    aiDraft:
      "আপনার অর্ডারটি আগামীকাল বিকেলের মধ্যে পৌঁছে যাবে। ট্র্যাকিং নম্বর SMS এ পাঠিয়ে দিচ্ছি।",
    messages: [
      { id: "m1", sender: "customer", text: "আসসালামু আলাইকুম", timestamp: minutesAgo(40) },
      {
        id: "m2",
        sender: "customer",
        text: "আমার অর্ডার নং #1042 কবে পাঠাবেন?",
        timestamp: minutesAgo(38),
      },
      {
        id: "m3",
        sender: "agent",
        text: "ওয়ালাইকুম আসসালাম, একটু দেখে জানাচ্ছি।",
        timestamp: minutesAgo(20),
      },
      { id: "m4", sender: "customer", text: "ভাই, ডেলিভারি কবে দিবেন?", timestamp: minutesAgo(6) },
    ],
  },
  {
    id: "c2",
    customerName: "সুমাইয়া আক্তার",
    channel: "messenger",
    status: "open",
    stage: "qualified",
    tags: ["দাম জিজ্ঞাসা"],
    notes: [],
    unreadCount: 0,
    lastMessagePreview: "ধন্যবাদ, নিশ্চিত করলাম।",
    lastMessageAt: minutesAgo(25),
    aiDraftReady: false,
    messages: [
      { id: "m1", sender: "customer", text: "এই পণ্যটির দাম কত?", timestamp: minutesAgo(90) },
      {
        id: "m2",
        sender: "ai",
        text: "পণ্যটির দাম ৳৮৫০, ফ্রি ডেলিভারি সহ।",
        timestamp: minutesAgo(88),
      },
      { id: "m3", sender: "customer", text: "ধন্যবাদ, নিশ্চিত করলাম।", timestamp: minutesAgo(25) },
    ],
  },
  {
    id: "c3",
    customerName: "করিম মিয়া",
    channel: "messenger",
    status: "pending",
    stage: "new",
    tags: [],
    notes: [],
    unreadCount: 1,
    lastMessagePreview: "কালার পরিবর্তন করা যাবে?",
    lastMessageAt: minutesAgo(50),
    aiDraftReady: true,
    aiDraft: "জি, কালার পরিবর্তন করা যাবে। কোন কালারটি চান একটু জানাবেন।",
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "কালার পরিবর্তন করা যাবে?",
        timestamp: minutesAgo(50),
      },
    ],
  },
  {
    id: "c4",
    customerName: "নাসরিন বেগম",
    channel: "messenger",
    status: "resolved",
    stage: "qualified",
    tags: ["সন্তুষ্ট কাস্টমার"],
    notes: [],
    unreadCount: 0,
    lastMessagePreview: "পণ্য হাতে পেয়েছি, সব ঠিক আছে।",
    lastMessageAt: minutesAgo(180),
    aiDraftReady: false,
    messages: [
      {
        id: "m1",
        sender: "agent",
        text: "আপনার অর্ডার পাঠানো হয়েছে।",
        timestamp: minutesAgo(400),
      },
      {
        id: "m2",
        sender: "customer",
        text: "পণ্য হাতে পেয়েছি, সব ঠিক আছে।",
        timestamp: minutesAgo(180),
      },
    ],
  },
  {
    id: "c5",
    customerName: "জাহিদ হাসান",
    channel: "messenger",
    status: "open",
    stage: "contacted",
    tags: ["রিটার্ন", "ফলো-আপ"],
    notes: [
      {
        id: "n1",
        text: "এক্সচেঞ্জ অফার দেওয়া হয়েছে, কুরিয়ার পিকআপের অপেক্ষায়।",
        createdAt: minutesAgo(3),
      },
    ],
    unreadCount: 3,
    lastMessagePreview: "সাইজ বড় হয়ে গেছে, ফেরত দিতে চাই।",
    lastMessageAt: minutesAgo(3),
    aiDraftReady: true,
    aiDraft:
      "দুঃখিত অসুবিধার জন্য। আপনি চাইলে বিনামূল্যে এক্সচেঞ্জ করতে পারবেন, কুরিয়ার থেকে পিকআপ হয়ে যাবে।",
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "সাইজ বড় হয়ে গেছে, ফেরত দিতে চাই।",
        timestamp: minutesAgo(3),
      },
    ],
  },
];
