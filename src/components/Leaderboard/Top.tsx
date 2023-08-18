import { Rank } from "../../features/leaderboard/types";
import { truncateEthAddress } from "../../utils/address";

export const UserCard: React.FC<{ rank: number; rankData: Rank; className?: string }> = ({
  rank,
  rankData = {
    point: 0,
    count: 0,
    address: "",
  },
  className,
}) => {
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
    return "/yellow-bg.png";
  };
  return (
    <div
      className={`${className} cursor-pointer max-w-2xl mx-2 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 shadow-xl rounded-lg text-gray-900 bg-gray-200`}
    >
      <div className="rounded-t-lg h-24 overflow-hidden relative">
        <img className="object-cover object-top w-full" src={getBg()} alt="Mountain" />
        <p className="text-[30px] top-2 left-2 absolute italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 w-[100px] h-[100px]">
          #{rank}
        </p>
      </div>

      <img className="object-cover object-center relative -mt-6 mx-auto w-[60px] h-[40px]" src={getRankImg()} alt="Woman looking front" />
      <div className="text-center mt-2">
        <h2 className="font-semibold text-[12px]">{truncateEthAddress(rankData.address)}</h2>
        <p className="text-black font-bold">{rankData.point} points</p>
      </div>
      <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
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
