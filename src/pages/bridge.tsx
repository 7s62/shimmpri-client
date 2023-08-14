import {useEffect, useState} from "react";
import {COINS_DATA} from "../data/coins";
import RadixSelector from "../components/selector/RadixSelector";
import Input from "../components/input/Input";
import {CHAINS_DATA} from "../data/chains";
import {ArrowDownward} from "@styled-icons/evaicons-solid";
import Button from "../components/button/Button";
import {useMetaMask} from "../hooks/useMetamask";
import Web3 from "web3";

const Bridge: React.FC<{}> = () => {
  const [currentCoin, setCurrentCoin] = useState(COINS_DATA[0].address);
  const [chainA, setChainA] = useState(CHAINS_DATA[0].rpc);
  const [chainB, setChainB] = useState(CHAINS_DATA[1].rpc);

  const {wallet, hasProvider, isConnecting, connectMetaMask} = useMetaMask();

  const onHandleSelectCoin = (data: string) => {
    setCurrentCoin(data);
  };

  const onHandleSelectChainA = (rpc: string) => {
    if (rpc === chainB) {
      setChainB(chainA);
      setChainA(rpc);
    } else {
      setChainA(rpc);
    }
  };

  const onHandleSelectChainB = (rpc: string) => {
    if (rpc === chainA) {
      setChainA(chainB);
      setChainB(rpc);
    } else {
      setChainB(rpc);
    }
  };

  useEffect(() => {
    const chain = CHAINS_DATA.find((e) => {
      return chainA === e.rpc;
    });
    if (!chain) {
      return;
    }
    const changeNetwork = async () => {
      console.log(
        "7s1",
        (window as any).ethereum.networkVersion,
        Number(chain.chainId),
        hasProvider
      );
      if (
        (window as any).ethereum.networkVersion !== Number(chain.chainId) &&
        hasProvider
      ) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: Web3.utils.toHex(chain.chainId)}],
          });
        } catch (err: any) {
          if (err.code === 4902) {
            await (window as any).ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: chain.name,
                  chainId: Web3.utils.toHex(chain.chainId),
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: [chain.rpc],
                },
              ],
            });
          }
        }
      }
    };
    changeNetwork();
  }, [chainA]);

  return (
    <div className="py-8 h-screen">
      <h1 className="text-center bg-clip-text  bg-gradient-to-r from-[#0267ff] to-[#49b188] text-transparent font-bold text-[40px] leading-[50px]">
        Bridge between or send within CVC to <br />
        Etherium, Arbitrum and Polygon!
      </h1>
      <div className="py-8 flex justify-center items-center text-[#666077]">
        <div className="min-w-[420px] max-w-[600px] max-h-[900px] bg-blue-100 border border-none rounded-xl shadow-xl shadow-pink-500 py-6">
          {/* Select coin */}
          <div className="flex items-center justify-center space-x-2 my-4">
            <div className="font-semibold">Select coin bridge</div>
            <RadixSelector
              type="COIN"
              data={COINS_DATA}
              current={currentCoin}
              onSelect={onHandleSelectCoin}
            />
          </div>
          {/* From */}
          <div className="flex items-center justify-center space-x-2 my-4">
            <div className="skyline--input-box-shadow w-full mx-4 px-4 py-4 border border-none rounded-2xl">
              <p className="font-semibold">From</p>
              <div className="flex justify-center ">
                <Input
                  className="!ring-0 font-bold text-[26px] text-gray-700"
                  name={"from"}
                  placeholder="0.00"
                />
                <RadixSelector
                  type="CHAIN"
                  data={CHAINS_DATA}
                  current={chainA}
                  onSelect={onHandleSelectChainA}
                />
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div className="w-full flex justify-center items-center">
            <div className="hover:bg-blue-200 cursor-pointer border border-none rounded-3xl p-2">
              <ArrowDownward size={32} color="black" />
            </div>
          </div>
          {/* To */}
          <div className="flex items-center justify-center space-x-2 my-4">
            <div className="skyline--input-box-shadow w-full mx-4 px-4 py-4 border border-none rounded-2xl">
              <p className="font-semibold">To (estimated)</p>
              <div className="flex justify-center ">
                <Input
                  className="!ring-0 font-bold text-[26px] text-gray-700"
                  name={"to"}
                  placeholder="0.00"
                />
                <RadixSelector
                  type="CHAIN"
                  data={CHAINS_DATA}
                  current={chainB}
                  onSelect={onHandleSelectChainB}
                />
              </div>
            </div>
          </div>
          {/* Transaction details */}
          <div className="flex flex-col space-y-2 my-8 mx-8">
            <div className="w-full flex justify-between items-center text-[16px]">
              <div>Bridge fee:</div>
              <div>0.0001 ETH</div>
            </div>
            <div className="w-full flex justify-between items-center text-[20px]">
              <div className="font-bold">Estimated Received:</div>
              <div className="font-semibold">0.0001 ETH</div>
            </div>
          </div>
          {/* Button */}
          <div className="flex items-center justify-center space-x-2 my-4 px-4">
            <Button className="flex-1" size="large">
              Approve
            </Button>
            <Button className="flex-1" size="large">
              Bridge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bridge;
