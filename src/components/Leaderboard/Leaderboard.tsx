import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-gridy-sprites";
import { useAppSelector } from "../../app/hooks";
import { selectRanks } from "../../features/leaderboard/reducer";
import { Rank } from "../../features/leaderboard/types";
import { txTruncateEthAddress } from "../../utils/address";

const LeaderboardUser: React.FC<{ rankData: Rank; rank: number }> = ({ rankData, rank }) => {
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
          <p className="text-gray-300">{txTruncateEthAddress(rankData.address)}</p>
          <p className="font-semibold text-white">#{rank + 1}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const LeaderboardItem: React.FC<{ rankData: Rank; rank: number }> = ({ rankData, rank }) => {
  return (
    <tr className="bg-[#251163] w-full border border-none rounded-xl text-gray-300">
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <LeaderboardUser rankData={rankData} rank={rank} />
      </td>
      <td className="px-4 py-3 text-center">{rankData.count}</td>
      <td className="px-4 py-3 text-center">{rankData.point}</td>
    </tr>
  );
};

export const Leaderboard: React.FC = () => {
  const rankRx = useAppSelector(selectRanks);

  // const onShowRank = () => {
  //   let temp = null;
  //   if (rankRx.ranks.length > 0 && !rankRx.isLoading) {
  //     temp = rankRx.ranks.map((e, i) => {
  //       return <LeaderboardItem key={e.address} rankData={e} rank={i} />;
  //     });
  //   }
  //   return temp;
  // };

  return (
    <div className="relative overflow-x-auto max-w-[900px] mx-auto border border-none rounded-xl">
      <table className="w-full text-sm !text-white">
        <thead className="text-xs !text-white uppercase bg-btnprimary">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Collector
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              NFTs Minted Count
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Total Points
            </th>
          </tr>
        </thead>
        {/* <tbody>{rankRx.isLoading ? null : onShowRank()}</tbody> */}
        <tbody>
          {rankRx.ranks.map((e, i) => {
            return <LeaderboardItem key={e.address} rankData={e} rank={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
