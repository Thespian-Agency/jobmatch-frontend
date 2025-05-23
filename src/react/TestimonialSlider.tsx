import type { CollectionEntry } from "astro:content";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { withBase } from "../utils/withBase";

type Props = {
  testimonials: CollectionEntry<"homepage">["data"]["testimonials"];
};

const TestimonialSlider = ({ testimonials }: Props) => {
  SwiperCore.use([Pagination]);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const paginationRef = useRef(null);

  const handleClickLeft = () => {
    swiper?.slidePrev();
  };

  const handleClickRight = () => {
    swiper?.slideNext();
  };

  return (
    <div className="reviews-carousel relative w-screen overflow-x-hidden">
      <div className="flex gap-24 justify-between items-start desktop:items-center pb-80 desktop:flex-row flex-col">
        <p className="heading-2xl font-light text-description-grey">
          {testimonials.title}
        </p>
        <div className="xldesktop:hidden  flex gap-24 justify-end w-full desktop:w-auto">
          <div
            onClick={handleClickLeft}
            className="flex size-64 items-center cursor-pointer justify-center rounded-full bg-[#F3F3F3]"
          >
            <img src={withBase("/icons/arrow_left.svg")} alt="" />
          </div>
          <div
            onClick={handleClickRight}
            className="flex size-64 items-center cursor-pointer justify-center rounded-full bg-primary"
          >
            <img src={withBase("/icons/arrow_right.svg")} alt="" />
          </div>
        </div>
      </div>
      <Swiper
        pagination={{
          type: "bullets",
          el: paginationRef.current,
          clickable: true,
          dynamicBullets: true,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        loop={true}
        spaceBetween={56}
        // autoHeight
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        breakpoints={{
          992: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 2,
          },
          1400: {
            slidesPerView: 3,
          },
        }}
      >
        {testimonials.items.map((item, i) => (
          <SwiperSlide
            key={"feature-" + i}
            className="select-none cursor-grab review p-32 gap-56 !flex !h-auto justify-between flex-col rounded-32 bg-[#F7F7F7]"
          >
            <div className="flex flex-col gap-32">
              <p
                className="heading-s font-regular text-title-grey"
                dangerouslySetInnerHTML={item.title}
              />
              <p className="body-m font-light text-description-grey">
                {item.description}
              </p>
            </div>
            <div className={`author gap-12 flex items-center justify-start`}>
              <img
                className="size-64 rounded-full"
                src={withBase(`/images/testimonial-${i + 1}.webp`)}
                alt=""
              />
              <div className="flex flex-col">
                <h4 className="body-l font-medium text-title-grey">
                  {item.author.name}
                </h4>
                <p className="body-m font-light text-description-grey">
                  {item.author.position}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
