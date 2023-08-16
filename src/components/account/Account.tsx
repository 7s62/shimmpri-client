import {useState} from "react";
import {CHAINS_DATA} from "../../data/chains";
import {useMetaMask} from "../../hooks/useMetamask";
import {txTruncateEthAddress} from "../../utils/address";
import {DownArrow, UpArrow} from "@styled-icons/boxicons-solid";
import {Copy} from "@styled-icons/boxicons-regular";

export const Account = () => {
  const [isActive, setIsActive] = useState(false);
  const {wallet, disconnectMetaMask} = useMetaMask();
  const getCurrentChain = () => {
    let chain = null;
    chain = CHAINS_DATA.find((e) => {
      return e.chainId === Number(wallet.chainId);
    });
    return chain;
  };
  const onDisconnectWallet = () => {
    disconnectMetaMask();
  };

  console.log("7s200:wallet", getCurrentChain(), wallet);

  return (
    <div className="relative">
      <div
        className="z-50 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        {wallet.accounts.length > 0 && (
          <div className=" p-2 text-[12px] bg-tao text-white border border-none rounded-xl max-w-[200px]">
            <div className="flex justify-center items-center space-x-2">
              <img
                className="w-[25px] h-[25px]"
                src={getCurrentChain()?.icon}
                alt=""
              />
              <div className="font-bold">
                {txTruncateEthAddress(wallet.accounts[0])}
              </div>
              {isActive ? <UpArrow size={14} /> : <DownArrow size={14} />}
            </div>
          </div>
        )}
      </div>

      <div
        className={`absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
          !isActive && "hidden"
        }`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
          <div className="px-4 flex justify-center items-center">
            <div className="flex-1">
              <div className="font-semibold text-[12px]">
                {txTruncateEthAddress(wallet.accounts[0])}
              </div>
              <div className="flex space-x-1">
                <p className="font-bold">{wallet.balance}</p>
                <p>{getCurrentChain()?.nativeCurrency.symbol}</p>
              </div>
            </div>
            <Copy
              className="cursor-pointer"
              size={16}
              onClick={() => {
                navigator.clipboard.writeText(wallet.accounts[0]);
              }}
            />
          </div>
        </ul>
        <div className="py-1">
          <div
            onClick={() => onDisconnectWallet()}
            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Disconnect
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   {wallet.accounts.length > 0 && (
    //     <>
    //       <div>Wallet Accounts: {wallet.accounts[0]}</div>
    //       <div>Wallet Balance: {wallet.balance}</div>
    //       <div>Hex ChainId: {wallet.chainId}</div>
    //       <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
    //     </>
    //   )}
    // </div>

    //
  );
};
