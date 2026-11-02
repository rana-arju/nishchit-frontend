export const marketingContent = {
  brand: "Nishchit",
  navigation: {
    primaryLabel: "প্রধান নেভিগেশন",
    footerLabel: "ফুটার নেভিগেশন",
    links: [
      { label: "কীভাবে কাজ করে", href: "/#how-it-works" },
      { label: "ফিচার", href: "/#features" },
      { label: "প্রশ্নোত্তর", href: "/#faq" },
      { label: "আমাদের সম্পর্কে", href: "/about" },
      { label: "যোগাযোগ", href: "/contact" },
    ],
    login: "লগইন",
    start: "শুরু করুন",
  },
  hero: {
    badge: "AI Order Assistant for Facebook Sellers",
    eyebrow: "AI Order Assistant for Facebook Sellers",
    titleStart: "Turn Messenger Chats into Confirmed Orders —",
    titleHighlight: "Automatically",
    title: "Turn Messenger Chats into Confirmed Orders — Automatically",
    description:
      "AI understands customer messages, validates orders, reduces fake/return risks, and books delivery in one flow.",
    primaryAction: "Start Free Trial",
    secondaryAction: "See How It Works",
    proofPoints: ["No coding needed", "Set up in minutes", "Built for Bangladeshi sellers"],
    mock: {
      brandName: "Your Brand",
      activeStatus: "Active now",
      time: "10:24 AM",
      customerMessage:
        "ভাই, ওইটা লাল টি-শার্টটা আছে? XL সাইজ নিবো ভাই।\nঠিকানা: মিরপুর, ঢাকা।\nফোন: 01812XXXXXX",
      botName: "Nishchit AI",
      orderSummaryTitle: "অর্ডার ডিটেইলস (AI দ্বারা প্রস্তুত)",
      productName: "T-Shirt (Red)",
      productSize: "Size: XL",
      productPrice: "Price: ৳ 550",
      productImage: "/red-tshirt.jpg",
      confirmQuestion: "অর্ডারটি কনফার্ম করতে চান?",
      confirmAction: "হ্যাঁ, কনফার্ম করুন",
      modifyAction: "না, পরিবর্তন চাই",
    },
  },
  partners: {
    title: "Trusted by growing F-commerce sellers",
    items: [
      { name: "SteadFast Courier", type: "steadfast" },
      { name: "Pathao Courier", type: "pathao" },
      { name: "RedX Delivery", type: "redx" },
      { name: "Meta Business Partners", type: "meta" },
    ],
  },
  problem: {
    eyebrow: "কাজটা সহজ হোক",
    title: "অর্ডার সামলাতে আর এলোমেলো নয়",
    description: "প্রতিদিনের পরিচিত ঝামেলাগুলো কমিয়ে বিক্রিতে মন দিন।",
    items: [
      {
        title: "অর্ডার হাতে লেখা",
        description: "চ্যাট থেকে তথ্য কপি করার ঝামেলা থাকে।",
        solvedBy: "AI Inbox অটো করে দেয়",
      },
      {
        title: "ভুয়া ও ফেরত অর্ডার",
        description: "নিশ্চিত না হয়ে পাঠালে খরচ বাড়ে।",
        solvedBy: "Risk Detection আগেই ধরে",
      },
      {
        title: "কুরিয়ার বুকিং-এ সময় নষ্ট",
        description: "একই তথ্য বারবার লিখতে হয়।",
        solvedBy: "এক ক্লিকে কুরিয়ার বুকিং",
      },
    ],
  },
  howItWorks: {
    eyebrow: "HOW IT WORKS",
    title: "From message to delivery in 4 simple steps",
    steps: [
      {
        number: "1",
        title: "1. Get Order",
        description: "Customer messages on Messenger",
        key: "order",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300",
      },
      {
        number: "2",
        title: "2. AI Understands",
        description: "Extracts product, size, address and more",
        key: "ai",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300",
      },
      {
        number: "3",
        title: "3. Confirm & Check",
        description: "Validates the order and checks risk",
        key: "confirm",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300",
      },
      {
        number: "4",
        title: "4. Book & Track",
        description: "Books courier and tracks delivery",
        key: "track",
        color: "text-pink-600 bg-pink-50 dark:bg-pink-950/60 dark:text-pink-300",
      },
    ],
    showcase: {
      headline: "Save time, reduce returns and grow faster",
      benefits: [
        "Up to 60% less manual work",
        "Lower return & fake order rate",
        "Faster order processing",
        "Better customer experience",
        "Built for the Bangladesh market",
      ],
      dashboard: {
        totalOrders: "1,248",
        totalOrdersChange: "+ 12%",
        confirmed: "1,102",
        confirmedChange: "+ 14%",
        atRisk: "73",
        atRiskChange: "- 31%",
        returnRate: "5.8%",
        returnRateChange: "- 2.1%",
      },
      stats: [
        {
          value: "10,000+",
          label: "Sellers onboarded",
          icon: "users",
        },
        {
          value: "2M+",
          label: "Orders processed",
          icon: "box",
        },
        {
          value: "35%",
          label: "Lower return rate (avg.)",
          icon: "trend",
        },
        {
          value: "5x",
          label: "Faster order handling",
          icon: "clock",
        },
      ],
    },
  },
  features: {
    eyebrow: "FEATURES",
    title: "Everything you need from chat to delivery",
    items: [
      {
        key: "inbox",
        title: "AI Inbox",
        description: "Understands Bangla, Banglish & English messages and extracts order details.",
        gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
        badgeColor:
          "text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60",
      },
      {
        key: "risk",
        title: "Risk Detection",
        description: "Finds fake or high-return orders early with smart risk score.",
        gradient: "from-blue-500/10 via-sky-500/5 to-transparent",
        badgeColor:
          "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60",
      },
      {
        key: "courier",
        title: "One-Click Courier Booking",
        description: "Book with Steadfast, Pathao or RedX and track deliveries automatically.",
        gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
        badgeColor:
          "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60",
      },
      {
        key: "dashboard",
        title: "Seller Dashboard",
        description: "Orders, customer history, return rate and cost per order — all in one place.",
        gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
        badgeColor:
          "text-pink-600 bg-pink-50 dark:bg-pink-950/50 dark:text-pink-300 border-pink-200/60 dark:border-pink-800/60",
      },
    ],
  },
  faq: {
    eyebrow: "প্রশ্নোত্তর",
    title: "সাধারণ কিছু প্রশ্ন",
    items: [
      {
        question: "Nishchit কীভাবে অর্ডার নেয়?",
        answer: "Messenger-এর কথোপকথন থেকে দরকারি তথ্য গুছিয়ে একটি অর্ডার সারাংশ তৈরি করে।",
      },
      {
        question: "Banglish মেসেজ বুঝতে পারে?",
        answer: "হ্যাঁ, বাংলা, ইংরেজি ও পরিচিত Banglish লেখার ধরন বুঝে তথ্য সাজাতে পারে।",
      },
      {
        question: "প্রয়োজনে আমি কি চ্যাট নিতে পারব?",
        answer: "হ্যাঁ, যেকোনো সময় কথোপকথন সেলারের কাছে হ্যান্ডঅফ করা যাবে।",
      },
      {
        question: "কোন কুরিয়ারের সঙ্গে কাজ করবে?",
        answer: "কুরিয়ার সংযোগের তালিকা ধাপে ধাপে যোগ হবে। নির্দিষ্ট নাম পরে জানানো হবে।",
      },
    ],
  },
  finalCta: {
    title: "অর্ডার নেওয়া হোক আরও নিশ্চিত",
    description: "চ্যাটের ভিড় কমিয়ে প্রতিটি অর্ডার গুছিয়ে নিন।",
    action: "ড্যাশবোর্ড দেখুন",
  },
  footer: {
    description: "বাংলাদেশি ফেসবুক সেলারদের অর্ডার গুছিয়ে রাখার সহজ সহায়তা।",
    productTitle: "প্রোডাক্ট",
    accountTitle: "অ্যাকাউন্ট",
    copyright: "© ২০২৬ Nishchit। সর্বস্বত্ব সংরক্ষিত।",
  },
  about: {
    eyebrow: "আমাদের সম্পর্কে",
    title: "অর্ডার ব্যবস্থাপনা সহজ করাই আমাদের লক্ষ্য",
    description:
      "Nishchit বাংলাদেশি ফেসবুক সেলারদের জন্য তৈরি একটি AI অর্ডার এজেন্ট — যা চ্যাট থেকে অর্ডার বুঝে, যাচাই করে এবং ডেলিভারির জন্য প্রস্তুত করে।",
    mission: {
      eyebrow: "লক্ষ্য",
      title: "বিক্রেতার সময় যাক বিক্রি বাড়ানোয়, টাইপ করায় নয়",
      description:
        "প্রতিদিন শত শত চ্যাট থেকে অর্ডার তথ্য হাতে টুকে রাখা, ভুয়া অর্ডার চেনা আর কুরিয়ার বুকিং — এই কাজগুলো একজন বিক্রেতার সবচেয়ে বেশি সময় নেয়। Nishchit এই পুরো কাজটা এক জায়গায় নিয়ে আসে, যাতে বিক্রেতা মন দিতে পারেন আসল কাজে — বিক্রি বাড়ানোয়।",
    },
    values: [
      {
        key: "inbox",
        title: "সহজ ও দ্রুত",
        description: "চ্যাট থেকে কুরিয়ার বুকিং পর্যন্ত পুরো প্রক্রিয়া এক জায়গায় সারা যায়।",
      },
      {
        key: "risk",
        title: "ঝুঁকিমুক্ত বিক্রি",
        description: "ভুয়া ও ফেরত হওয়ার ঝুঁকি থাকা অর্ডার আগেই শনাক্ত হয়ে যায়।",
      },
      {
        key: "courier",
        title: "বাংলাদেশের জন্য তৈরি",
        description:
          "বাংলা, বাংলিশ ও ইংরেজি বার্তা বোঝে এবং স্থানীয় কুরিয়ার পার্টনারদের সাথে কাজ করে।",
      },
    ],
  },
  contact: {
    eyebrow: "যোগাযোগ",
    title: "আমাদের সাথে যোগাযোগ করুন",
    description: "প্রশ্ন আছে বা ডেমো দেখতে চান? ফর্মটি পূরণ করুন, আমরা যত দ্রুত সম্ভব সাড়া দেব।",
    info: [
      {
        title: "দ্রুত সাড়া",
        description: "আমরা চেষ্টা করি প্রতিটি বার্তার উত্তর যত দ্রুত সম্ভব দেওয়ার।",
      },
      {
        title: "ডেমো দেখুন",
        description: "প্রোডাক্ট নিয়ে প্রশ্ন থাকলে লিখুন, আমরা ডেমো দেখানোর ব্যবস্থা করব।",
      },
      {
        title: "সাধারণ প্রশ্ন",
        description: "অনেক উত্তর হয়তো ইতিমধ্যে আমাদের প্রশ্নোত্তর অংশে আছে।",
        href: "/#faq",
      },
    ],
    form: {
      nameLabel: "নাম",
      namePlaceholder: "আপনার নাম",
      emailLabel: "ইমেইল",
      emailPlaceholder: "you@example.com",
      messageLabel: "বার্তা",
      messagePlaceholder: "আপনার প্রশ্ন বা প্রয়োজনের বিস্তারিত লিখুন",
      submit: "বার্তা পাঠান",
      submitting: "পাঠানো হচ্ছে...",
      success: "ধন্যবাদ! আপনার বার্তা পেয়েছি, শীঘ্রই যোগাযোগ করব।",
      errors: {
        name: "অনুগ্রহ করে নাম লিখুন",
        email: "সঠিক একটি ইমেইল ঠিকানা দিন",
        message: "অন্তত ১০ অক্ষরের বার্তা লিখুন",
      },
    },
  },
} as const;
