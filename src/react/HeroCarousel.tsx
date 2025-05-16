import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { withBase } from "../utils/withBase";

type LineProps = {
  active: boolean;
  filled: boolean;
};

function Line({ active, filled }: LineProps) {
  return (
    <div className={`w-1/4 h-4 bg-white/15 rounded-full`}>
      <div
        className={classNames("w-0 h-4 bg-[#D9D9D9] rounded-full", {
          "hero-carousel-line-active": active,
          "w-full": filled,
        })}
      />
    </div>
  );
}

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex % 3) + 1);
  };

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(handleNext, 5000);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [handleNext]);

  return (
    <div className="desktop:absolute xldesktop:-translate-x-80 relative top-0 right-0 flex justify-end desktop:w-2/5 w-full items-center flex-col gap-40 h-full">
      <img
        fetchPriority="high"
        src={withBase(`/images/hero-${currentIndex}.webp`)}
        alt="Hero carousel"
        className=" w-full h-full object-cover desktop:rounded-l-32 xldesktop:rounded-r-32 desktop:rounded-r-0 rounded-t-32 rounded-b-0"
      />
      <div className="flex gap-24 w-full z-10 absolute bottom-40 left-0  justify-center">
        {[1, 2, 3].map((item) => (
          <Line
            active={currentIndex === item}
            key={item}
            filled={currentIndex > item}
          />
        ))}
      </div>
    </div>
  );
}
