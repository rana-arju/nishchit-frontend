const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  OAUTH_CANCELLED: "সাইন-ইন বাতিল করা হয়েছে।",
  OAUTH_STATE_MISMATCH: "সাইন-ইন সেশনের মেয়াদ শেষ হয়ে গেছে। আবার চেষ্টা করুন।",
  WRONG_LOGIN_METHOD: "এই ইমেইল অন্য পদ্ধতিতে নিবন্ধিত। সঠিক পদ্ধতিতে লগইন করুন।",
  EMAIL_REGISTERED_VIA_OTHER_METHOD: "এই ইমেইল অন্য পদ্ধতিতে আগেই নিবন্ধিত।",
  GOOGLE_LOGIN_NOT_CONFIGURED: "Google সাইন-ইন এখনো চালু করা হয়নি।",
  FACEBOOK_LOGIN_NOT_CONFIGURED: "Facebook সাইন-ইন এখনো চালু করা হয়নি।",
  OAUTH_EMAIL_NOT_PROVIDED: "আপনার অ্যাকাউন্ট থেকে ইমেইল পাওয়া যায়নি। অন্য উপায়ে চেষ্টা করুন।",
  OAUTH_EXCHANGE_FAILED: "সাইন-ইন সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।",
};

export function describeOauthError(errorCode: string): string {
  return OAUTH_ERROR_MESSAGES[errorCode] ?? "সাইন-ইন করা যায়নি। আবার চেষ্টা করুন।";
}
