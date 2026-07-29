import { Suspense } from "react";
import { Separator } from "@/components/common/Separator";
import { IntroSection } from "@/components/home/HeroSection";
import { WelcomeToOurNewHubSection } from "@/components/home/WelcomeToOurNewHub";
import { HomeFeaturedAndListSection } from "@/components/home/HomeFeaturedAndListSection";
import { HomeFeaturedAndListSkeleton } from "@/components/home/HomeFeaturedAndListSkeleton";
import { HomeCategoryPreviewSection } from "@/components/home/HomeCategoryPreviewSection";
import { HomeCategoryPreviewSkeleton } from "@/components/home/HomeCategoryPreviewSkeleton";
import { HomeStateProvider } from "@/components/home/HomeStateProvider";

export default function Home() {
  return (
    <HomeStateProvider>
      <main className="px-4 md:px-5 lg:px-20 2xl:px-40">
        <Separator />
        <IntroSection />
        <Suspense fallback={<HomeFeaturedAndListSkeleton />}>
          <HomeFeaturedAndListSection />
        </Suspense>
        <Separator />
        <WelcomeToOurNewHubSection />
        <Separator />
        <Suspense fallback={<HomeCategoryPreviewSkeleton />}>
          <HomeCategoryPreviewSection />
        </Suspense>
      </main>
    </HomeStateProvider>
  );
}
