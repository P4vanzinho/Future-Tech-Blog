import { Separator } from "@/components/common/Separator";
import { LastFeaturedPostSection } from "@/components/home/FeaturedPostSection";
import { FeaturedPostsListSection } from "@/components/home/PostsList";
import { IntroSection } from "@/components/home/HeroSection";
import { WelcomeToOurNewHubSection } from "@/components/home/WelcomeToOurNewHub";
import { ArticlesPreviewByCategorySection } from "@/components/home/ArticlesPreviewByCategorySection";

export default function Home() {
  return (
    <main className="px-4 md:px-5 lg:px-20 2xl:px-40">
      <div>
        <Separator />
        <IntroSection />
        <LastFeaturedPostSection />
        <Separator />
        <FeaturedPostsListSection />
        <Separator />
        <WelcomeToOurNewHubSection />
        <Separator />
        <ArticlesPreviewByCategorySection />
      </div>
    </main>
  );
}
