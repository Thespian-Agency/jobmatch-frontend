import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideData {
  title: string;
  description: string;
  bgColor?: string;
  image?: string;
}

interface CarouselProps {
  slides: SlideData[];
  height?: number;
  spaceBetween?: number;
  slidesPerView?: number;
  autoplayDuration?: number;
  navigation?: boolean;
  showPagination?: boolean;
}

export default function Carousel({
  slides,
  height = 250,
  spaceBetween = 50,
  slidesPerView = 3,
  autoplayDuration = 3000,
  navigation = false,
  showPagination = false,
}: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={navigation}
      autoplay={{ delay: autoplayDuration }}
      pagination={showPagination ? { clickable: true } : false}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className={`"h-[${height}px] px-24 w-full"`}>
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full object-cover rounded flex-shrink-0 select-none`}
                style={{ height: height - 100 }}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
