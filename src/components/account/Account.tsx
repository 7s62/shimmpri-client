import {CHAINS_DATA} from "../../data/chains";
import {useMetaMask} from "../../hooks/useMetamask";
import {txTruncateEthAddress} from "../../utils/address";

export const Account = () => {
  const {wallet} = useMetaMask();
  const getCurrentChain = () => {
    let chain = null;
    chain = CHAINS_DATA.find((e) => {
      return e.chainId === Number(wallet.chainId);
    });
    return chain;
  };

  return (
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
    <div>
      {wallet.accounts.length > 0 && (
        <div className="skyline--input-box-shadow p-2 text-[12px] bg-blue-200 border border-none rounded-xl text-gray-900 max-w-[150px] shadow-xl shadow-pink-500">
          <div className="flex justify-center items-center space-x-2">
            <img
              className="w-[25px] h-[25px]"
              src={getCurrentChain()?.icon}
              alt=""
            />
            <div>{txTruncateEthAddress(wallet.accounts[0])}</div>
          </div>
        </div>
      )}
    </div>
  );
};
