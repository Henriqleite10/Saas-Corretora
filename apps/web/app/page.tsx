"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenAtual } from "../lib/api";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(tokenAtual() ? "/painel" : "/login");
  }, [router]);
  return null;
}
