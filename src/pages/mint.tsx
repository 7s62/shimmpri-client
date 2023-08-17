import { balueSMC } from "../services/smc";
import { truncateEthAddress, txTruncateEthAddress } from "../utils/address";
import abi from "../services/abi.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { usePopups } from "../components/popup/PopupProvider";
import Popup from "../components/popup/Popup";
import Loading from "../components/loading/Loading";
import { Component, useEffect, useState } from "react";
import LoadingV2 from "../components/loading/LoadingV2";
import { setToast } from "../components/toast/toastReducer";
import { useAppDispatch } from "../redux/store";
import { Exit } from "@styled-icons/boxicons-regular";
import { TravelExplore } from "@styled-icons/material-outlined";
import openInNewTab from "../utils/direct";
const DetailContainer: React.FC<{
  title: string;
  data: string;
  className?: string;
}> = ({ title, data, className }) => {
  return (
    <div
      className={`${className} flex-1 flex flex-col justify-center items-center`}
    >
      <div className="">{title}</div>
      <p>{data}</p>
    </div>
  );
};

const LeaderBoardUserItem: React.FC<{}> = () => {
  return (
    <div className="flex flex-start">
      <div className="flex justify-center items-center space-x-2">
        <img
          className="max-w-[40px] max-h-[40px]  boder-none rounded-xl"
          src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/90234375_831684853993938_3886786635118936064_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7a1959&_nc_ohc=AWy0Fglj4aQAX-u3dLV&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDZGFraiPAk3cx0kbuMCGuu7Wpk5uAXdswyJEidMqhz9g&oe=6501E675"
          alt="nft"
        />
        <div className="font-normal text-[12px] flex flex-col">
          <p className="text-gray-300">
            {txTruncateEthAddress("0xd01d903011fd0dfd473220994c6fca9755848c22")}
          </p>
          <p className="font-semibold text-white">#1</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const LeaderBoardItem: React.FC<{}> = () => {
  return (
    <tr className="bg-[#251163] w-full border border-none rounded-xl text-gray-300">
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <LeaderBoardUserItem />
      </td>
      <td className="px-4 py-3 text-center">30</td>
      <td className="px-4 py-3 text-center">19</td>
      <td className="px-4 py-3 text-center">3</td>
    </tr>
  );
};

const Table: React.FC<{}> = () => {
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
            <th scope="col" className="px-6 py-3 text-center">
              Mint Streak
            </th>
          </tr>
        </thead>
        <tbody>
          <LeaderBoardItem />
          <LeaderBoardItem />
          <LeaderBoardItem />
          <LeaderBoardItem />
          <LeaderBoardItem />
          <LeaderBoardItem />
          <LeaderBoardItem />
        </tbody>
      </table>
    </div>
  );
};

const UserCard: React.FC<{ rank: number }> = ({ rank }) => {
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
    <div className="max-w-2xl mx-2 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-24 overflow-hidden relative">
        <img
          className="object-cover object-top w-full"
          src={getBg()}
          alt="Mountain"
        />
        <p className="text-[42px] top-2 left-2 absolute italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 w-[100px] h-[100px]">
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
          {truncateEthAddress("0xfa2f024ca4c002b4859868524ebb28c686da2894")}
        </h2>
        <p className="text-black font-bold">120 points</p>
      </div>
      <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
          <div>Streak</div>
          <div>2</div>
        </li>
        <li className="flex flex-col items-center justify-between">
          <div>Minted</div>
          <div>10k</div>
        </li>
        <li className="flex flex-col items-center justify-around">
          <div>Point</div>
          <div>15</div>
        </li>
      </ul>
    </div>
  );
};

const MintNFT: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { addPopup, removeAll } = usePopups();
  const [nftID, setNFTID] = useState("99999999");
  const dispatch = useAppDispatch();
  const { address, isConnecting, isDisconnected } = useAccount();

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

  const {} = useContractRead({
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as any,
    abi: abi,
    functionName: "tokenURI",
    args: [nftID],
    onSuccess: (data: any) => {
      console.log("7s2004:data", data);
      fetch(data)
        .then(async (res: any) => {
          const nftDetail = await res.json();
          console.log("7s200", nftDetail.attributes);
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
                        className="w-[200px] h-[200px]"
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
          return;
        })
        .catch((err) => {
          console.log("7s200:err", err);
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
        });
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

  const onHandleMintNFT = () => {
    setLoading(true);
    write();
  };

  return (
    <div className=" text-white py-24 px-6">
      <div className="max-w-[1300px] space-x-2 mx-auto flex flex-col justify-between items-center  md:flex md:flex-row ">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-[80px] leading-[80px] font-extrabold">
            <p>Create your</p>
            <p className="inline-block">Own</p>
            <span className="text-tao">NFT Dream</span>
            <p>Gallery</p>
          </h1>
          <div className="flex justify-center items-center space-x-6 py-6">
            <p className="text-[28px] leading-[21px] font-extrabold text-tao">
              Skyline
            </p>
            <p className="text-[16px] leading-[26px]">
              <p>
                The Larges NFT Collection. Automatic and truly unique digital
              </p>
              <p>
                creation. Signed and issued by the creator, made possible by
              </p>
              <p> blockchain technologi</p>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <img
              className="max-w-[388px] max-h-[463px]  boder-none rounded-xl"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/90234375_831684853993938_3886786635118936064_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7a1959&_nc_ohc=AWy0Fglj4aQAX-u3dLV&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDZGFraiPAk3cx0kbuMCGuu7Wpk5uAXdswyJEidMqhz9g&oe=6501E675"
              alt="nft"
            />
            <div className="flex flex-col space-y-3 py-2">
              <div className="flex justify-center items-center space-x-4">
                <DetailContainer title="Session" data="1" />
                <DetailContainer title="Remaining" data="240" />
                <DetailContainer title="Total" data="300" />
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  className={`bg-btnprimary w-full text-[20px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl flex justify-center items-center disabled:bg-gray-200 disabled:text-gray-900`}
                  onClick={() => onHandleMintNFT()}
                  disabled={address ? false : true}
                >
                  <LoadingV2 size={28} isLoading={loading} />
                  {loading === false && address && " Mint Now"}
                  {!address && "Connect wallet to mint NFT"}
                </button>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <p>End time remaining: </p>
                <p className="font-bold">{new Date().toISOString()}</p>
              </div>
            </div>
          </div>
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
          <div className="max-w-[800px] mx-auto flex flex-col space-x-2 justify-center items-center md:flex md:flex-row ">
            <div className="hidden md:block">
              <UserCard rank={2} />
            </div>
            <div>
              <UserCard rank={1} />
            </div>
            <div className="block md:hidden">
              <UserCard rank={2} />
            </div>
            <div>
              <UserCard rank={3} />
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="text-center text-[24px] leading-[24px] font-bold pb-4">
            Ranking
          </h2>
          <Table />
        </div>
      </div>
    </div>
  );
};
export default MintNFT;
