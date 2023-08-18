import React from "react";
import SkylineLogo from "../../assets/icons/skyline";
import { FOOTER_MENU } from "../../data/footer";

const Footer: React.FC = () => {
  return (
    <footer className="py-[32px] text-white shadow-lg">
      <div className="max-w-[1200px] mx-auto flex justify-center space-x-10 items-center gap-y-4">
        <a href="/">
          <SkylineLogo />
        </a>
        <div className="flex space-x-6">
          {FOOTER_MENU.map((item, index) => {
            return (
              <div className="flex-1 text-[16px] font-normal" key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
