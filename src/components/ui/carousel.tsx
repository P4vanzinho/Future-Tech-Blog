"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { forwardRef } from "react";
import { atom, createStore, Provider, useAtomValue } from "jotai";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      opts,
      setApi,
      plugins,
      className,
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [carouselStore] = React.useState(() => {
      const store = createStore();
      store.set(carouselStateAtom, { api, carouselRef });
      return store;
    });

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      carouselStore.set(carouselStateAtom, { api, carouselRef });
    }, [api, carouselRef, carouselStore]);

    return (
      <Provider store={carouselStore}>
        <div
          ref={ref}
          className={className}
          data-orientation={orientation}
          {...props}
        >
          <div ref={carouselRef} className="overflow-hidden">
            {children}
          </div>
        </div>
      </Provider>
    );
  }
);
Carousel.displayName = "Carousel";

type CarouselState = {
  api: CarouselApi | undefined;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
};

const carouselStateAtom = atom<CarouselState | null>(null);

function useCarousel() {
  const carouselState = useAtomValue(carouselStateAtom);
  if (!carouselState) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return carouselState;
}

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={className}
    style={{
      marginLeft: 0,
      display: "flex",
      ...style,
    }}
    {...props}
  />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    aria-roledescription="slide"
    className={className}
    style={{ flex: "0 0 auto", minWidth: 0, ...(props.style ?? {}) }}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
};
