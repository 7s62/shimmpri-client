import * as Dialog from "@radix-ui/react-dialog";
import {useState} from "react";
import {DownArrow} from "@styled-icons/boxicons-solid";
import {truncateEthAddress} from "../../utils/address";

const RadixSelector: React.FC<{
  data: Array<any>;
  current: string;
  onSelect: any;
  type: string;
}> = ({data, current, onSelect, type}) => {
  const [open, setOpen] = useState(false);

  const onShowListCoin = () => {
    let temp = null;
    if (data.length > 0) {
      temp = data.map((e, i) => {
        return (
          <div
            key={i}
            className={
              e.address === current || e.rpc === current
                ? "flex items-center justify-between px-2 py-2 cursor-pointer border border-none rounded-2xl bg-gray-200"
                : "flex items-center justify-between px-2 py-2 cursor-pointer border border-none rounded-2xl hover:bg-gray-200"
            }
            onClick={() => {
              setOpen(!open);
              onSelect(type === "COIN" ? e.address : e.rpc);
            }}
          >
            <div className="flex flex-1 items-center space-x-2">
              <img
                className="w-[30px] h-[30px]"
                src={e.icon}
                alt={i.toString()}
              />
              <div>{type === "COIN" ? e.symbol : e.name}</div>
            </div>
            {type === "COIN" ? (
              <div className="flex-1">0.00</div>
            ) : (
              <div className="flex-1 text-center text-[14px] text-gray-500">
                {truncateEthAddress(e.rpc)}
              </div>
            )}
          </div>
        );
      });
    }
    return temp;
  };

  const getSelectedCoin = () => {
    let coin = null;
    if (current) {
      let temp = data.find((e) => {
        return e.address === current;
      });
      coin = temp;
    }
    return coin;
  };

  const getSelectedChain = () => {
    let chain = null;
    if (current) {
      let temp = data.find((e) => {
        return e.rpc === current;
      });
      chain = temp;
    }
    return chain;
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className=" flex justify-between items-center min-w-[140px] px-3 py-1 border rounded-2xl bg-white shadow-md">
          <div className="flex-1 flex justify-center items-center space-x-1">
            <img
              className="w-[20px] h-[20px]"
              src={
                type === "COIN"
                  ? getSelectedCoin().icon
                  : getSelectedChain().icon
              }
              alt="img"
            />
            <div>
              {type === "COIN"
                ? getSelectedCoin().symbol
                : getSelectedChain().name}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <DownArrow size={16} color="black" />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Select {type === "COIN" ? "coin" : "chain"}
          </Dialog.Title>
          <div className="my-4 flex flex-col space-y-2">{onShowListCoin()}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RadixSelector;
