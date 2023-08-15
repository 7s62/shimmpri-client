import {useState} from "react";
import {CloseOutline} from "@styled-icons/evaicons-outline";
import SkylineLogo from "../../assets/icons/skyline";
import {useMetaMask} from "../../hooks/useMetamask";
import Button from "../button/Button";
import {Account} from "../account/Account";

const Header: React.FC<{}> = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const {wallet, hasProvider, isConnecting, connectMetaMask} = useMetaMask();

  const onHanldeOpenMobileMenu = () => {
    setIsActiveMobileMenu(!isActiveMobileMenu);
  };

  const onHandleConnectWallet = () => {
    console.log("7s2005:hasProvider", hasProvider, isConnecting, wallet);
    connectMetaMask();
  };
  //dice theory police clog soldier obey such say gentle skull fantasy illness

  const onHandleInstallWallet = () => {
    window.open("https://metamask.io", "_blank", "noopener,noreferrer");
  };
  console.log("7s200:provider:", hasProvider, isConnecting);
  return (
    <div className="!text-white">
      <nav
        className="mx-auto max-w-[1200px] flex max-w-7xl items-center justify-between p-6 lg:px-8 w-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a className="">
            <SkylineLogo />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="w-[24px] h-[24px]"
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
            Mint
          </a>
          <a href="#" className="text-sm font-semibold leading-6">
            Comunity
          </a>
          <a href="#" className="text-sm font-semibold leading-6">
            Contacts
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {hasProvider ? (
            isConnecting ? (
              <Button
                className="!text-[14px] bg-purple-500"
                onClick={() => onHandleConnectWallet()}
              >
                Conntect wallet
              </Button>
            ) : (
              <Account />
            )
          ) : (
            <Button
              className="!text-[14px] bg-purple-500"
              onClick={() => onHandleInstallWallet()}
            >
              Install MetaMask
            </Button>
          )}
        </div>
        <div
          className={isActiveMobileMenu === false ? "hidden" : "md:hidden"}
          // role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 !text-black ">
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
