import { Separator } from "@/components/common/Separator";
import { FeaturedPostSection } from "@/components/home/FeaturedPostSection";
import { PostsList } from "@/components/home/PostsList";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="px-4 md:px-5 lg:px-20 2xl:px-40">
      <section>
        <Separator />
        <HeroSection />
        <FeaturedPostSection />
        <Separator />
        <PostsList />
        <Separator />
      </section>
    </main>
  );
}
