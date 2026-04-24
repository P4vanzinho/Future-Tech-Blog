import Image from "next/image";

interface ArticleHeroProps {
  image: string;
  imageAlt: string;
  title: string;
}

export function ArticleHero({ image, imageAlt, title }: ArticleHeroProps) {
  return (
    <section className="relative w-full">
      <Image
        src={image}
        alt={imageAlt}
        width={1000}
        height={1000}
        className="h-[17.5625rem] w-full object-cover md:h-[21rem] lg:h-[37.5rem]"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20, 20, 20, 0) -19.6%, rgba(20, 20, 20, 0.88) 62.86%)",
        }}
      />
      <div className="pointer-events-none absolute right-0 bottom-5 left-0 px-6 text-center lg:bottom-8 lg:px-[5rem]">
        <h1 className="text-[1.75rem] leading-[150%] font-semibold tracking-[-0.03em] text-white lg:text-[4rem]">
          {title}
        </h1>
      </div>
    </section>
  );
}
