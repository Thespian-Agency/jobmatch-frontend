import { useState } from "react";
import { useEffect } from "react";
import { withBase } from "../utils/withBase";
import Button from "./Button";
import type { CollectionEntry } from "astro:content";
import classNames from "classnames";

type Props = {
  team_player: CollectionEntry<"homepage">["data"]["team_player"];
  buttons: CollectionEntry<"homepage">["data"]["buttons"];
};

export default function TeamPlayer({ team_player, buttons }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full flex items-end justify-end xldesktop:aspect-[2/1] tablet:aspect-square aspect-[1/1.8]">
      <img
        src={withBase("/images/team-player.webp")}
        alt="JobMatch team player"
        width={500}
        height={500}
        className="absolute right-0 top-0 w-full h-full rounded-32 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-32"></div>

      <img
        src={withBase("/graphics/bubble-1.png")}
        alt="JobMatch team player"
        width={300}
        height={50}
        className={classNames(
          "absolute  left-[10%] top-[10%] w-[300px] transition-all duration-1000 ease-in-out delay-400",
          {
            "opacity-100 scale-100 translate-y-0": isVisible,
            "opacity-0 scale-90 translate-y-10": !isVisible,
          }
        )}
      />
      <img
        src={withBase("/graphics/bubble-2.png")}
        alt="JobMatch team player"
        width={200}
        height={50}
        className={classNames(
          "absolute tablet:left-[60%] left-[40%] top-[30%] w-[200px]  transition-all duration-1000 ease-in-out delay-800",
          {
            "opacity-100 scale-100 translate-y-0": isVisible,
            "opacity-0 scale-90 translate-y-10": !isVisible,
          }
        )}
      />

      <div className="flex w-full justify-between items-end gap-40 relative p-56 xldesktop:flex-row flex-col">
        <div className="flex flex-col gap-24 max-w-[560px]">
          <h2 className="heading-2xl text-fg-grey-primary-white font-medium">
            {team_player.title}
          </h2>
          <p className="body-xl font-light text-fg-grey-primary-white">
            {team_player.description}
          </p>
        </div>
        <div className="flex gap-24 xldesktop:flex-row flex-col">
          <Button size="L" variant="primary" subjectOption="Ugovoriti demo">
            {buttons["try_for_free"]}
          </Button>
          <Button size="L" variant="secondary" subjectOption="Poslati upit">
            {buttons["contact_us"]}
          </Button>
        </div>
      </div>
    </div>
  );
}
