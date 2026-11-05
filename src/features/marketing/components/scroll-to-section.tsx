"use client";

import { useEffect } from "react";
import { SCROLL_TARGET_KEY } from "@/features/marketing/components/anchor-link";

export function ScrollToSection() {
  useEffect(() => {
    const targetId = sessionStorage.getItem(SCROLL_TARGET_KEY);
    if (!targetId) return;
    sessionStorage.removeItem(SCROLL_TARGET_KEY);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return null;
}
