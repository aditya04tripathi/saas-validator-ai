"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/modules/shared/components/ui/button";
import { HERO_SECTION } from "@/modules/shared/constants";

export default function HeroSection() {
  return (
    <main>
      <div
        aria-hidden
        className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <section className="bg-muted/50 dark:bg-background overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28">
          <div className="relative z-10 mx-auto text-center">
            <h1 className="text-balance">{HERO_SECTION.heading}</h1>
            <p className="text-muted-foreground mx-auto my-6 sm:my-8 text-base sm:text-lg md:text-xl">
              {HERO_SECTION.subheading}
            </p>

            <Button asChild size="lg" className="mt-6 sm:mt-8">
              <Link href={HERO_SECTION.cta.primary.href}>
                <span className="btn-label">
                  {HERO_SECTION.cta.primary.text}
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="perspective-distant pl-4 sm:pl-8 lg:pl-44">
            <div className="lg:h-176 rotate-x-20 mask-b-from-55% mask-b-to-100% mask-r-from-75% skew-x-12 pl-2 sm:pl-6 pt-4 sm:pt-6">
              <Image
                className="rounded-lg sm:rounded-xl border shadow-xl dark:hidden"
                src="/mail2.png"
                alt="App Preview"
                width={2700}
                height={1440}
                priority
              />
              <Image
                className="rounded-lg sm:rounded-xl hidden border shadow-xl dark:block"
                src="/mail2.png"
                alt="App Preview"
                width={2700}
                height={1440}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
