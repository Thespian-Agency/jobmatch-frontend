import { useState } from "react";
import Button from "../react/Button";
import { withBase } from "../utils/withBase";
import classNames from "classnames";

type Props = {
  links: Record<string, string>;
  buttons: Record<string, string>;
};

export default function Header({ links, buttons }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>, href: string) => {
    e.preventDefault();
    if (href === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(`#${href}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsMenuOpen(false);
  };
  return (
    <>
      <header className=" select-none flex h-72  px-16 py-16 tablet:px-56 tablet:py-16 justify-between items-center sticky top-0 backdrop-blur-xl z-50">
        <div className="left-part flex gap-32 items-center">
          <div className="tablet:px-24 py-2">
            <img
              className="cursor-pointer"
              src={withBase("/logo.png")}
              alt="logo"
              onClick={(e) => handleClick(e, "home")}
              width={181}
              height={36}
            />
          </div>
          <nav className="hidden desktop:block">
            <ul className="flex gap-24">
              {[
                "services",
                "interpretation",
                "advantages",
                "testimonials",
                "process",
                "faq",
              ].map((link) => (
                <li key={link}>
                  <span
                    className="body-m cursor-pointer font-regular text-fg-grey-tertiary hover:text-fg-grey-primary"
                    data-id={link}
                    onClick={(e) => handleClick(e, link)}
                  >
                    {links[link]}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden xldesktop:flex right-part gap-12">
          <Button variant="primary" subjectOption="Dogovoriti demo">
            {buttons["schedule_demo"]}
          </Button>
          <Button variant="secondary" subjectOption="Poslati upit">
            {buttons["contact_us"]}
          </Button>
        </div>
        <div className="flex xldesktop:hidden right-part gap-12">
          <img
            src={withBase(isMenuOpen ? "/icons/x.svg" : "/icons/menu.png")}
            alt="menu"
            className="size-48"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </header>
      {isMenuOpen && (
        <div className="xldesktop:hidden fixed top-0 justify-between pb-40  left-0 w-full h-full gap-96 flex flex-col bg-white/50 z-50 backdrop-blur-xl">
          <div className="top-part flex flex-col gap-96 ">
            <div className="flex h-72  px-16 tablet:px-56 py-16  justify-between items-center">
              <div className="flex tablet:px-24 py-2">
                <a data-id="home" className="cursor-pointer">
                  <img
                    src={withBase("/logo.png")}
                    alt="logo"
                    onClick={(e) => handleClick(e, "home")}
                    width={181}
                    height={36}
                  />
                </a>
              </div>
              <div className="flex justify-end">
                <img
                  src={withBase("/icons/x.svg")}
                  alt="menu"
                  className="size-48"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>
            </div>
            <nav className="flex flex-col gap-24 px-56">
              <ul className="flex flex-col gap-24 px-24">
                {[
                  "services",
                  "interpretation",
                  "advantages",
                  "testimonials",
                  "process",
                  "faq",
                ].map((link) => (
                  <li key={link}>
                    <span
                      className="body-m cursor-pointer font-regular text-fg-grey-tertiary"
                      data-id={link}
                      onClick={(e) => handleClick(e, link)}
                    >
                      {links[link]}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="bottom-part flex flex-col gap-24 px-56">
            <div className="flex flex-col gap-24">
              <Button
                subjectOption="Dogovoriti demo"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                size="L"
                variant="primary"
              >
                {buttons["schedule_demo"]}
              </Button>
              <Button
                subjectOption="Poslati upit"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                size="L"
                variant="secondary"
              >
                {buttons["contact_us"]}
              </Button>
            </div>
            <div className="flex gap-16 items-center w-full justify-center">
              <p className="body-m text-body-grey font-regular">Powered by</p>
              <a href="https://thespian.eu/" target="_blank">
                <img
                  src={withBase("/graphics/thespian.png")}
                  alt="Powered by"
                  className="w-112 h-24"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
