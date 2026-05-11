import { Separator } from "@/components/common/Separator";

export function HomeCategoryPreviewSkeleton() {
  return (
    <section className="bg-dark-10 -mx-4 px-4 md:-mx-5 lg:-mx-20 lg:px-20 2xl:-mx-40 2xl:px-40">
      <div className="py-5 lg:py-10 2xl:py-[3.125rem]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-[0.875rem]">
            <div className="bg-dark-15 h-10 w-[9.375rem] animate-pulse rounded-lg" />
            <div className="bg-dark-15 h-10 w-[9.375rem] animate-pulse rounded-lg" />
            <div className="bg-dark-15 h-10 w-[9.375rem] animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-6 py-10">
        <div className="bg-dark-15 h-[10rem] w-full animate-pulse rounded-lg" />
        <div className="bg-dark-15 h-[10rem] w-full animate-pulse rounded-lg" />
      </div>
    </section>
  );
}
