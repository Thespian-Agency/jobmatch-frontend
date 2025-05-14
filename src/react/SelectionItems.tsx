import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import { useState } from "react";
import { withBase } from "../utils/withBase";

type Items = CollectionEntry<"homepage">["data"]["advantages"]["items"];

interface Props {
  items: Items;
}

export default function SelectionItems({ items }: Props) {
  const [dynamicHeight, setDynamicHeight] = useState<number>(500);

  const [selectedItem, setSelectedItem] = useState<number>(0);
  return (
    <div
      ref={(el) => {
        if (el) {
          setDynamicHeight(el.clientHeight);
        }
      }}
      className="w-full flex items-start desktop:flex-row flex-col gap-40"
    >
      <div className="flex flex-col gap-12 w-full desktop:w-1/2 desktop:pr-44">
        {items.map((item, index) => (
          <div
            onClick={() => setSelectedItem(index)}
            key={index}
            className={classNames(
              "bg-[#F7F7F7] cursor-pointer rounded-24 py-20 px-24 overflow-hidden transition-all duration-400 h-full ease-in-out hover:bg-[#F7F7F7]",
              {
                "max-h-[calc(56px+var(--spacing-20)+var(--spacing-20))] opacity-55 bg-transparent":
                  selectedItem !== index,
                "max-h-[200px] delay-95": selectedItem === index,
              }
            )}
          >
            <div className="flex items-center gap-10">
              <img
                src={withBase(`/icons/selection-${index + 1}.png`)}
                alt={item.title}
                width={56}
                height={56}
              />
              <h3 className="body-xl font-medium text-title-grey">
                {item.title}
              </h3>
            </div>
            <p
              className={classNames(
                "pl-64 body-sm font-light text-description-grey transition-all duration-500 ease-in-out",
                {
                  "opacity-0": selectedItem !== index,
                  "opacity-100": selectedItem === index,
                }
              )}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <img
        src={withBase(`/images/selection-${selectedItem + 1}.webp`)}
        alt={items[selectedItem].title}
        loading="lazy"
        width={500}
        style={{ height: dynamicHeight }}
        height={dynamicHeight}
        className="desktop:absolute xldesktop:-translate-x-80 relative desktop:w-2/5 w-full right-0 object-cover desktop:rounded-l-32 xldesktop:rounded-r-32 desktop:rounded-r-0 rounded-t-32 rounded-b-0  flex items-center justify-center "
      />
    </div>
  );
}
