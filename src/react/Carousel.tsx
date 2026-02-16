import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { CollectionEntry } from "astro:content";

interface CarouselProps {
  slides: CollectionEntry<"homepage">["data"]["logocarousel"];
  height?: number;
  spaceBetween?: number;
  slidesPerView?: number;
  autoplayDuration?: number;
  navigation?: boolean;
  showPagination?: boolean;
  loop?: boolean;
}

export default function Carousel({
  slides,
  height = 250,
  spaceBetween = 50,
  slidesPerView = 3,
  autoplayDuration = 3000,
  navigation = false,
  showPagination = false,
  loop = true,
}: CarouselProps) {
  const canLoop = loop && slides.items.length > slidesPerView;
  const spv = Math.max(1, slidesPerView);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      navigation={navigation}
      autoplay={{ delay: autoplayDuration }}
      pagination={showPagination ? { clickable: true } : false}
      loop={canLoop}
      className="w-full"
      breakpoints={{
        678: { slidesPerView: Math.max(1, spv - 2) },
        992: { slidesPerView: Math.max(1, spv - 1) },
        1400: { slidesPerView: slidesPerView },
      }}
    >
      {slides.items.map((slide, index) => (
        <SwiperSlide key={index}>
          {slide.link ? (
            <a href={slide.link} target="_blank" rel="noopener noreferrer">
              <SlideContent slide={slide} height={height} isLink={true} />
            </a>
          ) : (
            <SlideContent slide={slide} height={height} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

interface SlideContentProps {
  slide: CarouselProps["slides"]["items"][number];
  height: number;
  isLink?: boolean;
}

function SlideContent({ slide, height, isLink }: SlideContentProps) {
  return (
    <div
      className={`h-[${height}px] px-24 w-full transition-transform duration-300
        ${isLink ? "hover:scale-105 cursor-pointer" : ""} `}
    >
      {slide.image && (
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full object-contain rounded flex-shrink-0 select-none"
          style={{ height: height - 100 }}
        />
      )}
    </div>
  );
}
