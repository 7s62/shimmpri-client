import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Exit } from "@styled-icons/boxicons-regular";
import { Diamond } from "@styled-icons/ionicons-outline";
import { TravelExplore } from "@styled-icons/material-outlined";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useEffectOnce, useInterval } from "usehooks-ts";
import { useAccount, useContractReads, useContractWrite, useNetwork, useWaitForTransaction } from "wagmi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Leaderboard } from "../components/Leaderboard/Leaderboard";
import { UserCard } from "../components/Leaderboard/Top";
import LoadingV2 from "../components/Loading/LoadingV2";
import Popup from "../components/Popup/Popup";
import { usePopups } from "../components/Popup/PopupProvider";
import { setToast } from "../components/Toast/toastReducer";
import config from "../config";
import { Rates } from "../data/content";
import { getRanks, selectRanks } from "../features/leaderboard/reducer";
import abi from "../services/abi.json";
import { sleep } from "../utils/sleep";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const DetailContainer: React.FC<{
  title: string;
  data: any;
  className?: string;
}> = ({ title, data, className }) => {
  return (
    <div className={`${className} flex-1 flex flex-col justify-center space-y-1 items-center py-2`}>
      <div className="w-full text-center mb-4">{title}</div>
      <p className="text-[54px] leading-[20px] font-bold">{data}</p>
    </div>
  );
};

const HomeDetailContainer: React.FC<{
  title: string;
  data: any;
  className?: string;
}> = ({ title, data, className }) => {
  return (
    <div className={`${className} flex-1 flex flex-col justify-center space-y-1 items-center py-2`}>
      <div className="w-full text-center">{title}</div>
      <p className="text-[16px] leading-[20px] font-bold">{data}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const { addPopup, removeAll } = usePopups();
  const dispatch = useAppDispatch();

  const rankRx = useAppSelector(selectRanks);

  const [minting, setMinting] = useState(false);
  const [tokenURI, setTokenURI] = useState("");

  useEffectOnce(() => {
    dispatch(getRanks());
  });

  useInterval(() => {
    dispatch(getRanks());
  }, 1500);

  const {
    data: contract,
    isError: contractError,
    isLoading: contractLoading,
    isFetched: contractFetched,
  } = useContractReads({
    watch: true,
    contracts: [
      {
        ...config.contract,
        functionName: "startTime",
      },
      {
        ...config.contract,
        functionName: "currentDay",
      },
      {
        ...config.contract,
        functionName: "mintToday",
      },
      {
        ...config.contract,
        functionName: "baseTokenURI",
      },
      {
        ...config.contract,
        functionName: "baseExtension",
      },
      {
        ...config.contract,
        functionName: "totalSupply",
      },
    ],
  });

  const {
    data: mintData,
    write,
    status: mintStatus,
    isLoading: mintLoading,
  } = useContractWrite({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    functionName: "safeMint",
    onError(error) {
      setMinting(false);

      dispatch(
        setToast({
          show: true,
          title: "",
          message: error.message.split("\n")?.[0] || error.message,
          type: "error",
        }),
      );
    },
  });

  const mint = () => {
    setMinting(true);
    write();
  };

  const {
    data: txData,
    isError: txError,
    isLoading: txLoading,
    isFetched,
  } = useWaitForTransaction({
    confirmations: 3,
    hash: mintData?.hash,
  });

  const startTime = (Number(contract?.[0].result) || 9999999999) as number;
  const currentDay = (Number(contract?.[1].result) || 0) as number;
  const mintPerDay = (Number(contract?.[2].result) || 0) as number;
  const baseTokenURI = (contract?.[3].result || "") as string;
  const baseExtension = (contract?.[4].result || "") as string;
  const totalSupply = (Number(contract?.[5].result) || 0) as number;

  // console.log("contract", contract, startTime, currentDay, mintPerDay, baseTokenURI, baseExtension);

  const mintSuccess = mintStatus === "success" && !!txData;
  const loading = minting || mintLoading || txLoading;
  const valid = !loading && address && !chain?.unsupported;
  const hasError = contractError || txError;

  // console.log("mint status", minting);

  useEffect(() => {
    if (mintSuccess && isFetched) {
      const nftId = parseInt(txData.logs[0].topics[3] as any, 16);
      setTokenURI(`${baseTokenURI}${nftId}${baseExtension}`);
    }
  }, [mintSuccess, isFetched, txData, baseTokenURI, baseExtension]);
  useEffect(() => {
    if (tokenURI) {
      dispatch(
        setToast({
          show: true,
          title: "",
          message: `Submit transaction success!`,
          type: "success",
        }),
      );

      const fetchMetadata = () => {
        fetch(tokenURI)
          .then(async (res: any) => {
            const metadata = await res.json();

            addPopup({
              Component: () => {
                return (
                  <Popup className="bg-white">
                    <h2 className="text-center font-bold text-[24px] leading-[28px] ">Congratulation!</h2>
                    <div className="px-3 mb-2 mt-8 border-b-[1px] border-gray-300">
                      <div className="flex flex-col justify-center items-center space-y-2">
                        <img className="w-[400px] h-[400px] border border-none rounded-2xl" src={metadata.image} alt="nftimg" />
                        <div className="text-[18px] font-semibold">{metadata.name}</div>
                      </div>
                      <div className="flex justify-center items-center space-x-2 !text-gray-900 mx-16 my-4 p-2">
                        <DetailContainer className="font-bold" title="Level" data={metadata.attributes[0].value} />
                        <DetailContainer className="font-bold" title="Point" data={metadata.attributes[1].value} />
                        <DetailContainer className="font-bold" title="Day" data={metadata.attributes[2].value} />
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center !text-white">
                      <button
                        onClick={() => {
                          window.open(`${config.explorerURL}/${mintData?.hash}`, "_blank", "noopener,noreferrer");
                        }}
                        className="flex-1 bg-tao max-w-[220px] text-[16px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex space-x-2 justify-center items-center"
                      >
                        <p>View on explorer</p>
                        <TravelExplore size={20} />
                      </button>
                      <button
                        onClick={() => removeAll()}
                        className="flex-1 bg-tao max-w-[200px] text-[16px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex space-x-2 justify-center items-center"
                      >
                        <p>Back to mint</p>
                        <Exit size={20} />
                      </button>
                    </div>
                  </Popup>
                );
              },
              removeCallback: () => {
                setMinting(false);
                setTokenURI("");
              },
            });

            setMinting(false);

            return;
          })
          .catch(() => {
            sleep(2000).then(() => {
              fetchMetadata();
            });
          });
      };

      fetchMetadata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addPopup, dispatch, removeAll, tokenURI]);

  useEffect(() => {}, [hasError]);

  const rootStartTime = dayjs(startTime * 1000);
  const startDayTime = dayjs(rootStartTime).add(currentDay, "day");
  const nextEndTime = dayjs(startDayTime).add(1, "day");
  const notStartYet = dayjs().isBefore(rootStartTime);
  const stillRemaining = mintPerDay < 300;

  return (
    <div className=" text-white py-24 px-6">
      <div className=" max-w-[1300px] mx-auto flex flex-col justify-between items-center  md:flex md:flex-row space-x-12">
        <div className="px-6 lg:px-0 my-8 flex-1 flex flex-col justify-center">
          <h1 className="text-[50px] leading-[50px] font-extrabold">
            <p className="text-left">Shimmpri - Present your Value</p>
            <p className="">
              in <span className="text-tao">Shimmer</span> <span>this summer</span>
            </p>
          </h1>
          <div className="flex flex-col space-y-2 lg:flex lg:flex-row justify-center items-center space-x-6 py-6">
            <div className="text-[16px] leading-[26px]">
              <p className="pb-4 mt-12">We believe that each NFT artwork represents the creativity and soul of the creator, and this deserves to be clearly expressed.</p>
              <p>
                The POINT of each NFT will be displayed in the order the users mint them, and there will be a leaderboard for POINT's owners, and we will have rewards for the top 5
                users with the highest points.
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {stillRemaining && (
              <div className="flex justify-between items-center max-w-[450px] bg-gray-200 text-black py-2 px-4 border border-none rounded-xl">
                <div className="font-bold">Ended time remaining ({`${mintPerDay}/300`})</div>
                <p className="font-bold">
                  <LoadingV2 isLoading={contractLoading || !contractFetched}>{nextEndTime.fromNow(true)} left</LoadingV2>
                </p>
              </div>
            )}

            {!stillRemaining && (
              <div className="flex justify-between items-center max-w-[350px] bg-tao py-2 px-4 border border-none rounded-xl">
                <div className="flex justify-center items-center space-x-1">
                  <Diamond size={24} />
                  <span>300</span>
                  <span className="font-bold"> NFTs </span> <span>upcoming</span>
                </div>
                <p className="font-extrabold">
                  <LoadingV2 isLoading={contractLoading || !contractFetched}>{nextEndTime.fromNow()}</LoadingV2>
                </p>
              </div>
            )}

            {notStartYet && (
              <div className="flex justify-between items-center max-w-[350px] bg-tao py-2 px-4 border border-none rounded-xl">
                <div className="flex justify-center items-center space-x-1">
                  <Diamond size={24} />
                  <span>300</span>
                  <span className="font-bold"> NFTs </span> <span>upcoming</span>
                </div>
                <p className="font-extrabold">
                  <LoadingV2 isLoading={contractLoading || !contractFetched}>{nextEndTime.fromNow()}</LoadingV2>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex max-w-[400px] justify-center items-center">
          <div>
            <img className="max-w-[100%] max-h-[463px] boder-none rounded-xl" src="/home.png" alt="nft" />
            <div className="flex flex-col space-y-3 py-2">
              <div className="flex justify-center items-center space-x-4">
                <HomeDetailContainer title="Day" data={<LoadingV2 isLoading={contractLoading || !contractFetched}>{(Number(currentDay) + 1).toString()}</LoadingV2>} />
                <HomeDetailContainer title="Mint Fee" data={"FREE"} />
                <HomeDetailContainer title="Today Supply" data={<LoadingV2 isLoading={contractLoading || !contractFetched}>{`${mintPerDay}/300`}</LoadingV2>} />
              </div>
              <div className="w-full flex justify-center items-center">
                <ConnectButton.Custom>
                  {({ account, chain, openConnectModal, openChainModal, authenticationStatus, mounted }) => {
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                    return (
                      <button
                        className={`bg-btnprimary w-full text-[20px] leading-[32px] px-6 py-2 border border-none rounded-3xl flex justify-center items-center disabled:bg-gray-200 disabled:text-gray-900`}
                        disabled={minting}
                        onClick={() => {
                          if (!connected) {
                            openConnectModal();
                          }

                          if (chain?.unsupported) {
                            openChainModal();
                          }

                          valid && mint();
                        }}
                      >
                        <LoadingV2 size={30} isLoading={loading} />
                        {!isConnected && "Connect wallet to mint"}
                        {valid && "Mint now"}
                        {minting && "Minting"}
                        {chain?.unsupported && "Switch Network"}
                      </button>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[512px] flex flex-col justify-center items-center mx-auto p-6 mt-6 space-y-4 bg-[#251163] border border-none rounded-xl">
        <div className="text-[28px] leading-[28px] font-bold">
          <div className="flex justify-center items-center space-x-2">
            <h2>Total Supply</h2>
          </div>
        </div>
        <div className="text-[20px] leading-[20px] font-bold">{totalSupply} / 1400</div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-16">
        <h2 className="text-[32px] leading-[32px] font-bold my-4 lg:px-20">The limitations of Shimmpri NFT and Minting Process</h2>
        <div className="text-[18px] leading-[20px] py-4">
          In this campaign, we will <span className="text-tao font-bold">limit</span> the <span className="text-tao font-bold">quantity of NFT</span> because the NFT value is based
          on its rarity. The <span className="text-tao font-bold">higher the score</span> , the <span className="text-tao font-bold">rarer the NFT.</span>
        </div>
        <div className="text-[18px] pb-4">
          The event will run for <span className="text-tao font-bold">2 weeks.</span> During this timeframe, we will conduct 14 rounds. Based on an emphasis on the worth of NFT
          ownership. We have set a cap of <span className="text-tao font-bold">100 NFTs</span> that can be <span className="text-tao font-bold">minted in each round</span> to
          accommodate the fastest players. This approach ensures uniqueness and scarcity in each successfully minted artwork{" "}
          <span className="text-tao font-bold">(as represented in the minted NFT's Points)</span>, as well as fostering competition and enthusiasm throughout the participation
          process.
        </div>

        <div className="relative overflow-x-auto max-w-[512px] mx-auto border border-none rounded-xl mt-4">
          <table className="w-full text-sm !text-white">
            <thead className="text-xs !text-white uppercase bg-btnprimary">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Point Range
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Maximum amount
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Possibility
                </th>
              </tr>
            </thead>
            <tbody>
              {Rates.map((e, i) => {
                return (
                  <tr key={i} className="bg-[#251163] w-full border border-none rounded-xl text-gray-300">
                    <td className="px-4 py-3 text-center">{5 - i}</td>

                    <td className="px-4 py-3 text-center">{e.point}</td>
                    <td className="px-4 py-3 text-center">{e.maximumAmount}</td>
                    <td className="px-4 py-3 text-center">{e.possiblity}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 my-8">
        <h2 className="text-[32px] leading-[32px] font-bold my-4 lg:px-20 text-center mb-16">Leaderboard</h2>
        <div className="pb-8">
          <h2 className="text-center text-[24px] leading-[24px] font-bold">Top 3 Ranking</h2>

          <div className="max-w-[800px] mx-auto flex flex-col space-x-2 justify-center items-center md:flex md:flex-row ">
            <div className="hidden md:block">
              <UserCard className="md:max-w-[250px] lg:max-w-[250px]" rank={2} rankData={rankRx.ranks[1]} />
            </div>
            <div>
              <UserCard className="md:max-w-[280px] lg:max-w-[280px] md:mb-12 lg:mb-12" rank={1} rankData={rankRx.ranks[0]} />
            </div>
            <div className="block md:hidden">
              <UserCard rank={2} rankData={rankRx.ranks[1]} />
            </div>
            <div>
              <UserCard className="md:max-w-[250px] lg:max-w-[250px]" rank={3} rankData={rankRx.ranks[2]} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center text-[24px] leading-[24px] font-bold pb-4">Ranking</h2>
          <Leaderboard />
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="bg-[url('/banner.png')] bg-cover bg-center h-[290px] flex flex-col justify-center items-center space-y-6 border border-none rounded-3xl">
          <h2 className="text-[36px] leading-[36px] font-bold">Join Our Community</h2>
          <a className="px-6 py-4 bg-white text-blue-500 text-[24px] leading-[24px] border border-none rounded-3xl" href="/">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
