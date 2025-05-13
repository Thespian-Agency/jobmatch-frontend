import { useEffect, useState } from "react";
import { withBase } from "../utils/withBase";

export default function ProfileIconsGraphic() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col gap-24 relative" id="profile-icons-container">
      <img
        src={withBase("/images/profile-1.webp")}
        alt="Profile icon 1"
        className="object-cover bg-gray-50 border-[#E7E8F3] border-2 rounded-16 aspect-square shadow-md z-10 "
        width={142}
        height={142}
      />
      <img
        id="left-profile-icon"
        src={withBase("/images/profile-2.webp")}
        alt="Profile icon 2"
        className={`object-cover border-[#E7E8F3] border-2 rounded-16 aspect-square shadow-md absolute top-0 left-0 z-0 transition-all duration-1000 ease-in-out ${
          isVisible ? "left-[100px] top-[10px] rotate-12" : ""
        }`}
        data-animate="left"
        width={142}
        height={142}
      />
      <img
        id="right-profile-icon"
        src={withBase("/images/profile-3.webp")}
        alt="Profile icon 3"
        className={`object-cover border-[#E7E8F3] border-2 rounded-16 aspect-square shadow-md absolute top-0 left-0 z-0 transition-all   ease-in-out duration-1000 ${
          isVisible ? "left-[-100px] top-[10px] -rotate-12" : ""
        }`}
        data-animate="right"
        width={142}
        height={142}
      />
    </div>
  );
}
