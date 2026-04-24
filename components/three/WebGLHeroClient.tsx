"use client";
import dynamic from "next/dynamic";

export const WebGLHero = dynamic(
  () => import("./WebGLHero").then((m) => m.WebGLHero),
  { ssr: false },
);
