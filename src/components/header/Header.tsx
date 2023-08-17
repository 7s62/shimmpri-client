import {useState} from "react";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import SkylineLogo from "../../assets/icons/skyline";
import {useMetaMask} from "../../hooks/useMetamask";

import {ConnectButton} from "@rainbow-me/rainbowkit";

const Header: React.FC<{}> = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const {wallet, hasProvider, isConnecting, connectMetaMask} = useMetaMask();

  const onHanldeOpenMobileMenu = () => {
    setIsActiveMobileMenu(!isActiveMobileMenu);
  };

  return (
    <div className="!text-white !z-2">
      <nav
        className="mx-auto !max-w-[1200px] flex max-w-7xl items-center justify-between p-6 lg:px-8 w-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a className="cursor-pointer !z-2">
            <SkylineLogo />
          </a>
        </div>
        <div className="z-3 flex md:hidden">
          <button
            type="button"
            className="z-[2] w-[24px] h-[24px]"
            onClick={() => onHanldeOpenMobileMenu()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="justify"
            >
              <path
                fill="white"
                d="M21 13H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zm0 5H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zm0-10H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 text-white text-[20px] font-bold">
          <a href="#" className="text-sm font-semibold leading-6">
            Mint NFT
          </a>
          <a href="#" className="text-sm font-semibold leading-6">
            Comunity
          </a>
          <a href="#" className="text-sm font-semibold leading-6">
            Contacts
          </a>
        </div>
        {/* Wallet */}
        <div className="hidden md:flex md:justify-end lg:flex lg:flex-1 lg:justify-end">
          <ConnectButton />
        </div>
        <div
          className={isActiveMobileMenu === false ? "hidden" : "md:hidden"}
          // role="dialog"
          aria-modal="true"
        >
          {/* <div className="fixed inset-0 !z-10"></div> */}
          <div className="fixed inset-y-0 right-0 !z-10 w-full overflow-y-auto bg-white px-6 py-6 !text-black ">
            {/* sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 */}
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="w-[24px] h-[24px]"
                onClick={() => onHanldeOpenMobileMenu()}
              >
                <CloseOutline color="black" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                  >
                    Bridge
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                  >
                    Swap
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                  >
                    Contact
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
