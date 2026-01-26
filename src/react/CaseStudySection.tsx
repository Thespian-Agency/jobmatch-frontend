import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { withBase } from "../utils/withBase";
import { useState } from "react";
import type { CollectionEntry } from "astro:content";
import { Autoplay } from "swiper/modules";

type Props = {
  clientStudyCase: CollectionEntry<"homepage">["data"]["clientstudycase"];
};

export default function CaseStudySection({ clientStudyCase }: Props) {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const handleClickLeft = () => {
    swiper?.slidePrev();
  };

  const handleClickRight = () => {
    swiper?.slideNext();
  };

  return (
    <div className="case-study-carousel relative w-full overflow-x-hidden">
      <div className="flex gap-24 justify-between items-start desktop:items-center pb-40 desktop:flex-row flex-col">
        <p className="heading-2xl font-light text-description-grey">
          {clientStudyCase.title}
        </p>
        <div className="xldesktop:hidden flex gap-24 justify-end w-full desktop:w-auto">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={handleClickLeft}
            className="flex size-64 items-center cursor-pointer justify-center rounded-full bg-[#F3F3F3]"
          >
            <img src={withBase("/icons/arrow_left.svg")} alt="" />
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={handleClickRight}
            className="flex size-64 items-center cursor-pointer justify-center rounded-full bg-primary"
          >
            <img src={withBase("/icons/arrow_right.svg")} alt="" />
          </button>
        </div>
      </div>
      <Swiper
        pagination={false}
        onSwiper={(swiper) => setSwiper(swiper)}
        loop={true}
        spaceBetween={28}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          675: { slidesPerView: 1 },
          992: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {clientStudyCase.items.map((item, i) => (
          <SwiperSlide
            key={item.image}
            className="select-none cursor-grab !h-auto"
          >
            <CaseStudyItem
              title={item.title}
              description={item.description}
              author={item.author}
              image={withBase(item.image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const CaseStudyItem = ({
  title,
  description,
  author,
  image,
}: {
  title: string;
  description: string;
  author: string;
  image: string;
}) => {
  return (
    <article className="w-full max-w-none mx-auto bg-[#F7F7F7] rounded-32 p-24 desktop:max-w-[400px] max-h-[800px] flex flex-col gap-16">
      <div className="w-full aspect-[1/2] overflow-hidden rounded-24 bg-[#EDEDED]">
        <img
          className="w-full h-full object-cover object-center"
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col gap-12 justify-between h-full">
        <p className="body-xl font-light text-description-grey">{title}</p>
        <blockquote className="body-xl font-light text-description-grey italic border-l-2 border-stroke-grey-primary pl-16">
          {description}
        </blockquote>
        <p className="body-s font-light text-description-grey">— {author}</p>
      </div>
    </article>
  );
};
