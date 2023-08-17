import {balueSMC} from "../services/smc";
import {truncateEthAddress, txTruncateEthAddress} from "../utils/address";
import abi from "../services/abi.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {usePopups} from "../components/popup/PopupProvider";
import Popup from "../components/popup/Popup";
import Loading from "../components/loading/Loading";
import {Component, useEffect, useState} from "react";
import LoadingV2 from "../components/loading/LoadingV2";
import {setToast} from "../components/toast/toastReducer";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {Exit} from "@styled-icons/boxicons-regular";
import {TravelExplore} from "@styled-icons/material-outlined";
import openInNewTab from "../utils/direct";
import {getRanks, selectRanks} from "../redux/rank/rank.reducer";
import {Rank, RankReducer} from "../redux/rank/types";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {sleep} from "../utils/sleep";
import {createAvatar} from "@dicebear/avatars";
import * as style from "@dicebear/avatars-gridy-sprites";
import {BodyText} from "@styled-icons/bootstrap";
import {Diamond} from "@styled-icons/ionicons-outline";
dayjs.extend(relativeTime);

const DetailContainer: React.FC<{
  title: string;
  data: any;
  className?: string;
}> = ({title, data, className}) => {
  return (
    <div
      className={`${className} flex-1 flex flex-col justify-center space-y-1 items-center py-2`}
    >
      <div className="w-full text-center">{title}</div>
      <p className="text-[16px] leading-[20px] font-bold">{data}</p>
    </div>
  );
};

const LeaderBoardUserItem: React.FC<{rankData: Rank; rank: number}> = ({
  rankData,
  rank,
}) => {
  return (
    <div className="flex flex-start">
      <div className="flex justify-center items-center space-x-2">
        <div
          dangerouslySetInnerHTML={{
            __html: createAvatar(style, {
              seed: rankData.address,
              w: 40,
              h: 40,
            }),
          }}
        />
        <div className="font-normal text-[12px] flex flex-col">
          <p className="text-gray-300">
            {txTruncateEthAddress(rankData.address)}
          </p>
          <p className="font-semibold text-white">#{rank + 1}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const LeaderBoardItem: React.FC<{rankData: Rank; rank: number}> = ({
  rankData,
  rank,
}) => {
  return (
    <tr className="bg-[#251163] w-full border border-none rounded-xl text-gray-300">
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <LeaderBoardUserItem rankData={rankData} rank={rank} />
      </td>
      <td className="px-4 py-3 text-center">{rankData.count}</td>
      <td className="px-4 py-3 text-center">{rankData.point}</td>
      {/* <td className="px-4 py-3 text-center">3</td> */}
    </tr>
  );
};

const Table: React.FC<{rankRx: RankReducer}> = ({rankRx}) => {
  const onShowRank = () => {
    let temp = null;
    if (rankRx.ranks.length > 0 && !rankRx.isLoading) {
      temp = rankRx.ranks.map((e, i) => {
        return <LeaderBoardItem key={e.address} rankData={e} rank={i} />;
      });
    }
    return temp;
  };
  return (
    <div className="relative overflow-x-auto max-w-[900px] mx-auto border border-none rounded-xl">
      <table className="w-full text-sm !text-white">
        <thead className="text-xs !text-white uppercase bg-btnprimary">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Collector
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Total mint
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Total Point
            </th>
            {/* <th scope="col" className="px-6 py-3 text-center">
              Mint Streak
            </th> */}
          </tr>
        </thead>
        <tbody>
          {rankRx.isLoading ? (
            <LoadingV2 isLoading={rankRx.isLoading} />
          ) : (
            onShowRank()
          )}
        </tbody>
      </table>
    </div>
  );
};

const UserCard: React.FC<{
  rank: number;
  rankData: Rank;
  className?: string;
}> = ({rank, rankData, className}) => {
  const getRankImg = () => {
    if (rank === 1) {
      return "/yellow.png";
    }
    if (rank === 2) {
      return "/red.png";
    }
    return "/green.png";
  };
  const getBg = () => {
    if (rank === 1) {
      return "/yellow-bg.png";
    }
    if (rank === 2) {
      return "/red-bg.png";
    }
    return "/green-bg.png";
  };
  return (
    <div
      className={`${className} max-w-2xl mx-2 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white shadow-xl rounded-lg text-gray-900`}
    >
      <div className="rounded-t-lg h-24 overflow-hidden relative">
        <img
          className="object-cover object-top w-full"
          src={getBg()}
          alt="Mountain"
        />
        <p className="text-[30px] top-2 left-2 absolute italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 w-[100px] h-[100px]">
          #{rank}
        </p>
      </div>

      <img
        className="object-cover object-center relative -mt-6 mx-auto w-[60px] h-[40px]"
        src={getRankImg()}
        alt="Woman looking front"
      />
      <div className="text-center mt-2">
        <h2 className="font-semibold text-[12px]">
          {truncateEthAddress(rankData.address)}
        </h2>
        <p className="text-black font-bold">{rankData.point} points</p>
      </div>
      <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
          <div>Streak</div>
          <div className="font-bold">2</div>
        </li>
        <li className="flex flex-col items-center justify-between">
          <div>Minted</div>
          <div className="font-bold">{rankData.count}</div>
        </li>
        <li className="flex flex-col items-center justify-around">
          <div>Point</div>
          <div className="font-bold">{rankData.point}</div>
        </li>
      </ul>
    </div>
  );
};

const MintNFT: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(false);
  const {addPopup, removeAll} = usePopups();
  const [nftID, setNFTID] = useState("99999999");
  const dispatch = useAppDispatch();
  const {address, isConnecting, isDisconnected} = useAccount();
  const rankRx = useAppSelector(selectRanks);
  const [haveNFT, setHaveNFT] = useState(false);

  const {
    data: mintData,
    isLoading,
    isSuccess,
    write,
    status,
  } = useContractWrite({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    functionName: "safeMint",
  });

  const {
    data: txnData,
    isError,
    isLoading: isTxnLoading,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });
  // console.log("7s200:txnData", txnData, isTxnLoading, isError);

  function fetchNFTData(data: any) {
    fetch(data)
      .then(async (res: any) => {
        console.log("7s200:res", res);
        const nftDetail = await res.json();
        addPopup({
          Component: () => {
            return (
              <Popup className="bg-white">
                <h2 className="text-center font-bold text-[24px] leading-[28px] ">
                  Congratulation!
                </h2>
                <div className="px-3 mb-2 mt-8 border-b-[1px] border-gray-300">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <img
                      className="w-[200px] h-[200px] border border-none rounded-2xl"
                      src={nftDetail.image}
                      alt="nftimg"
                    />
                    <div className="text-[18px] font-semibold">
                      {nftDetail.name}
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-2 !text-gray-900 mx-16 my-4 p-2">
                    <DetailContainer
                      className="font-bold"
                      title="Level"
                      data={nftDetail.attributes[0].value}
                    />
                    <DetailContainer
                      className="font-bold"
                      title="Point"
                      data={nftDetail.attributes[1].value}
                    />
                    <DetailContainer
                      className="font-bold"
                      title="Day"
                      data={nftDetail.attributes[2].value}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-between items-center !text-white">
                  <button
                    onClick={() => {
                      console.log("7s200", mintData?.hash);
                      window.open(
                        `https://goerli.etherscan.io/tx/${mintData?.hash}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="flex-1 bg-tao max-w-[200px] text-[16px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex space-x-2 justify-center items-center"
                  >
                    <p>View on explore</p>
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
        });
        setHaveNFT(true);
        return;
      })
      .catch((err) => {
        sleep(5000).then(() => {
          fetchNFTData(data);
          setLoading(false);
        });
      });
  }

  const {
    data: currentDayData,
    isLoading: isLoadingCurrentDay,
    isError: isErrorCurrentDay,
  } = useContractRead({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    functionName: "currentDay",
  });

  const {
    data: startTimeData,
    isLoading: isLoadingStartTime,
    isError: isErrorStartTime,
  } = useContractRead({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    functionName: "startTime",
  });

  const {
    data: mintPerDayData,
    isLoading: isLoadingMintPerDay,
    isError: isErrorMintPerDay,
  } = useContractRead({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    args: [currentDayData],
    functionName: "mintPerDay",
  });

  const {} = useContractRead({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    functionName: "tokenURI",
    args: [nftID],
    onSuccess: (data: any) => {
      fetchNFTData(data);
    },
  });

  useEffect(() => {
    if (txnData) {
      dispatch(
        setToast({
          show: true,
          title: "",
          message: `Submit transaction success!`,
          type: "success",
        })
      );
      setNFTID(txnData.logs[0].topics[3] as any);
      setLoading(false);
      return;
    } else if (status === "error" || isError) {
      dispatch(
        setToast({
          show: true,
          title: "",
          message: `Something wrong!`,
          type: "error",
        })
      );
      setLoading(false);
      return;
    }
  }, [mintData, txnData]);

  useEffect(() => {
    dispatch(getRanks());
  }, [nftID !== "99999999"]);

  const onHandleMintNFT = () => {
    setLoading(true);
    write();
  };

  return (
    <div className=" text-white py-24 px-6">
      <div className=" max-w-[1300px] space-x-2 mx-auto flex flex-col justify-between items-center  md:flex md:flex-row space-x-12">
        <div className="px-6 lg:px-0 my-8 flex-1 flex flex-col justify-center">
          <h1 className="text-[50px] leading-[50px] font-extrabold">
            <p className="text-left">Balue - Present your Value</p>
            <p className="">
              in <span className="text-tao">Base</span> <span>this summer</span>
            </p>
          </h1>
          <div className="flex flex-col space-y-2 lg:flex lg:flex-row justify-center items-center space-x-6 py-6">
            {/* <p className="text-[28px] leading-[21px] font-extrabold text-tao">
              Balue
            </p> */}
            <div className="text-[16px] leading-[26px]">
              <p className="pb-6">
                We believe that each NFT artwork represents the creativity and
                soul of the creator, and this deserves to be clearly expressed.
              </p>
              <p>
                The POINT of each NFT will be displayed in the order the users
                mint them, and there will be a leaderboard for POINT’s owners,
                and we will have rewards for the top 5 users with the highest
                points.
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center max-w-[350px] bg-gray-200 text-black py-2 px-4 border border-none rounded-xl">
              <div className="font-bold">Ended time remaining</div>
              <p className="font-bold">
                {startTimeData && !isErrorStartTime && !isLoadingStartTime ? (
                  dayjs(Number(startTimeData) * 1000)
                    .add((Number(currentDayData) + 1) * 86400000)
                    .fromNow(true) + " left"
                ) : (
                  // <CountDown
                  //   duration={dayjs()
                  //     .millisecond(86400000)
                  //     .subtract(
                  //       dayjs(Number(startTimeData) * 1000)
                  //         .add((Number(currentDayData) + 1) * 86400000)
                  //         .millisecond(),
                  //       "millisecond"
                  //     )
                  //     .valueOf()}
                  // />
                  <LoadingV2 isLoading={isLoadingStartTime} />
                )}
              </p>
            </div>

            <div className="flex justify-between items-center max-w-[350px] bg-tao py-2 px-4 border border-none rounded-xl">
              <div className="flex justify-center items-center space-x-1">
                <Diamond size={24} />
                <span>300</span>
                <span className="font-bold"> NFTs </span> <span>upcoming</span>
              </div>
              <p className="font-extrabold">
                {startTimeData && !isErrorStartTime && !isLoadingStartTime ? (
                  dayjs(Number(startTimeData) * 1000)
                    .add((Number(currentDayData) + 1) * 86400000)
                    .fromNow()
                ) : (
                  <LoadingV2 isLoading={isLoadingStartTime} />
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex max-w-[400px] justify-center items-center">
          <div>
            <img
              className="max-w-[388px] max-h-[463px]  boder-none rounded-xl"
              src="/nft.png"
              alt="nft"
            />
            <div className="flex flex-col space-y-3 py-2">
              <div className="flex justify-center items-center space-x-4">
                <DetailContainer
                  title="Day"
                  data={
                    currentDayData &&
                    !isErrorCurrentDay &&
                    !isLoadingCurrentDay ? (
                      (Number(currentDayData) + 1).toString()
                    ) : (
                      <LoadingV2 isLoading={isLoadingCurrentDay} />
                    )
                  }
                />
                <DetailContainer title="Mint Fee" data={"FREE"} />
                <DetailContainer
                  title="Supply"
                  data={
                    mintPerDayData &&
                    !isErrorMintPerDay &&
                    !isLoadingMintPerDay ? (
                      mintPerDayData.toString() + "/300"
                    ) : (
                      <LoadingV2 isLoading={isLoadingMintPerDay} />
                    )
                  }
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  className={`bg-btnprimary w-full text-[20px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex justify-center items-center disabled:bg-gray-200 disabled:text-gray-900`}
                  onClick={() => onHandleMintNFT()}
                  disabled={address ? false : true}
                >
                  <LoadingV2 size={30} isLoading={loading} />
                  {loading === false && address && " Mint Now"}
                  {!address && "Connect wallet to mint NFT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="max-w-[1000px] mx-auto px-6 py-16">
        <h2 className="text-[32px] leading-[32px] font-bold my-4 lg:px-20">
          The limitations of Balue NFT and Minting Process
        </h2>
        <div className="text-[18px] leading-[20px] py-4">
          - In this campaign, we will{" "}
          <span className="text-tao font-bold">limit</span> the{" "}
          <span className="text-tao font-bold">quantity of NFT</span> because
          the NFT value is based on its rarity. The{" "}
          <span className="text-tao font-bold">higher the score</span> , the{" "}
          <span className="text-tao font-bold">rarer the NFT.</span>
        </div>
        <div className="text-[18px] pb-4">
          - The event will run for{" "}
          <span className="text-tao font-bold">2 weeks.</span> During this
          timeframe, we will conduct{" "}
          <span className="text-tao font-bold">3 rounds per week.</span> Based
          on an emphasis on the worth of NFT ownership. We have set a cap of{" "}
          <span className="text-tao font-bold">300 NFTs</span> that can be{" "}
          <span className="text-tao font-bold">minted in each round</span> to
          accommodate the fastest players. This approach ensures uniqueness and
          scarcity in each successfully minted artwork{" "}
          <span className="text-tao font-bold">
            (as represented in the minted NFT's Points)
          </span>
          , as well as fostering competition and enthusiasm throughout the
          participation process.
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 my-8">
        <h2 className="text-[32px] leading-[32px] font-bold my-4 lg:px-20">
          Leaderboard
        </h2>
        <div className="pb-8">
          <h2 className="text-center text-[24px] leading-[24px] font-bold">
            Top 3 Ranking
          </h2>
          {!rankRx.isLoading && rankRx.ranks.length > 0 ? (
            <div className="max-w-[800px] mx-auto flex flex-col space-x-2 justify-center items-center md:flex md:flex-row ">
              <div className="hidden md:block">
                {rankRx.ranks[1] && (
                  <UserCard
                    className="md:max-w-[250px] lg:max-w-[250px]"
                    rank={2}
                    rankData={rankRx.ranks[1]}
                  />
                )}
              </div>
              <div>
                {rankRx.ranks[0] && (
                  <UserCard
                    className="md:max-w-[280px] lg:max-w-[280px] md:mb-12 lg:mb-12"
                    rank={1}
                    rankData={rankRx.ranks[0]}
                  />
                )}
              </div>
              <div className="block md:hidden">
                {rankRx.ranks[1] && (
                  <UserCard rank={2} rankData={rankRx.ranks[1]} />
                )}
              </div>
              <div>
                {rankRx.ranks[2] && (
                  <UserCard
                    className="md:max-w-[250px] lg:max-w-[250px]"
                    rank={3}
                    rankData={rankRx.ranks[2]}
                  />
                )}
              </div>
            </div>
          ) : (
            <LoadingV2 isLoading={rankRx.isLoading} />
          )}
        </div>

        <div className="">
          <h2 className="text-center text-[24px] leading-[24px] font-bold pb-4">
            Ranking
          </h2>
          <Table rankRx={rankRx} />
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="bg-[url('/banner.png')] bg-cover bg-center h-[290px] flex flex-col justify-center items-center space-y-6 border border-none rounded-3xl">
          <h2 className="text-[36px] leading-[36px] font-bold">
            Join Our Community
          </h2>
          <button className="px-6 py-4 bg-white text-blue-500 text-[24px] leading-[24px] border border-none rounded-3xl">
            Get Started
          </button>
        </div>
        {/* <img className="mx-auto relative" src="/banner.png" alt="banner" /> */}
      </div>
    </div>
  );
};
export default MintNFT;
