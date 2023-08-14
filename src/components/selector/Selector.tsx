// Copyright (c) Skyline. All rights reserved.

import {useRef, useState} from "react";
import {SelectCoinDropdownOption} from "../../assets/icons/drop-down";

export type CoinType = {
  address: string;
  symbol: string;
  name: string;
  icon: string;
};

const CoinSelectorDropdown: React.FC<{
  data: Array<any>;
  onSelectCoin: any;
  currentCoin: string;
}> = ({data, onSelectCoin, currentCoin}) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  const getCurrentCoin = () => {
    let current: CoinType | null = null;

    if (data.length > 0 && currentCoin) {
      current = data.find((item: CoinType) => item.address === currentCoin);
    }

    if (current) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div>{current.symbol}</div>
        </div>
      );
    }

    return null;
  };

  const onShowOption = () => {
    if (data.length > 0) {
      return data.map((item: CoinType, index) => {
        return (
          <button
            className={`flex items-center justify-center px-2 py-1 space-x-1`}
            key={index}
            value={item.address}
            type="button"
            onClick={() => onSelectCoinRs(item.address)}
          >
            <div className="text-left w-2/3">{item.symbol}</div>
          </button>
        );
      });
    }

    return null;
  };

  const onSelectCoinRs = (resource: string) => {
    onSelectCoin(resource);
    setIsActive(false);
  };

  return (
    <div className={`relative inline-block text-left`} ref={ref}>
      <div>
        <button
          type="button"
          className={`max-w-[200px] text-[14px] inline-flex w-full justify-center items-center rounded-3xl border px-4 py-2 shadow-sm`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {getCurrentCoin()}

          <SelectCoinDropdownOption />
        </button>
      </div>
      <div
        className={`${
          !isActive ? "hidden" : ""
        } absolute bg-white z-50 mt-1 w-[250px] origin-top-right border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1 grid grid-cols-3 auto-cols-max h-[100px] overflow-auto text-[12px]">
          {onShowOption()}
        </div>
      </div>
    </div>
  );
};

export default CoinSelectorDropdown;
