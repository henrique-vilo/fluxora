"use client";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { Logos18 } from "./logos18";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ParallaxHeroImagesDemo() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <ParallaxHeroImages images={images} />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          Organize Your Assets. Your Work. Your Stock.
        </h1>
        <p className="max-w-md text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:text-neutral-400 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          Control every Product, every Sell, every Lead, it all always. Simply Everything
        </p>
          <Link className="bg-accent text-xl font-bold min-w-1/2 y-auto p-8" href="/demo">Get Demo</Link>
        <Logos18/>
      </div>
    </div>
  );
}

const images = [
  "https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp",
  "https://assets.aceternity.com/components/3d-globe.webp",
  "https://assets.aceternity.com/components/keyboard-2.webp",
  "https://assets.aceternity.com/components/hero-1.webp",
  "https://assets.aceternity.com/components/hero-2.webp",
  "https://assets.aceternity.com/components/hero-3.webp",
];
