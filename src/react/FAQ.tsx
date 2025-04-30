import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import { useState } from "react";

type Items = CollectionEntry<"homepage">["data"]["faq"]["items"];

type Props = {
  items: Items;
};

export default function FAQ({ items }: Props) {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelectedItem((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="flex flex-col gap-24">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={classNames(
            "flex cursor-pointer   flex-col p-24 gap-16 bg-[#F7F7F7] rounded-24 overflow-hidden transition-all duration-600 ease-in-out",
            {
              "max-h-[300px]": selectedItem === index,
              "max-h-[calc(56px+var(--p-responsive-24)+var(--p-responsive-24))]":
                selectedItem !== index,
            }
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="heading-xs text-title-grey font-medium">
              {item.title}
            </h3>
            <button className="flex items-center justify-center size-56 bg-white rounded-12">
              <img
                src="/icons/x.svg"
                alt="Chevron down"
                className={classNames(
                  "size-40 transition-all duration-600 ease-in-out",
                  {
                    "rotate-45": selectedItem !== index,
                  }
                )}
              />
            </button>
          </div>
          <p
            className={classNames(
              "body-l text-body-grey font-light max-w-[1000px]  transition-all duration-600 ease-in-out",
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
  );
}
