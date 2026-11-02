export type CourierId = "steadfast" | "pathao" | "redx";

export type CourierDefinition = {
  id: CourierId;
  name: string;
  description: string;
  iconClassName: string;
};

export const COURIERS: CourierDefinition[] = [
  {
    id: "steadfast",
    name: "SteadFast Courier",
    description: "সারাদেশে দ্রুত ডেলিভারি ও রিয়েল-টাইম ট্র্যাকিং।",
    iconClassName: "bg-[#2563eb]/10 text-[#2563eb]",
  },
  {
    id: "pathao",
    name: "Pathao Courier",
    description: "ঢাকার ভেতরে একই দিনে ডেলিভারির সুবিধা।",
    iconClassName: "bg-[#e6007e]/10 text-[#e6007e]",
  },
  {
    id: "redx",
    name: "RedX Delivery",
    description: "দেশজুড়ে বিস্তৃত হাব নেটওয়ার্ক সহ নির্ভরযোগ্য ডেলিভারি।",
    iconClassName: "bg-[#e11d2e]/10 text-[#e11d2e]",
  },
];
