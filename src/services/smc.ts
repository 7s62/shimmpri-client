import * as ethers from "ethers";
import abi from "./abi.json";
const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_RPC_HTTP!
);

console.log(
  "7s1:",
  import.meta.env.VITE_RPC_HTTP!,
  import.meta.env.VITE_NFT_CONTRACT_ADDRESS!
);
export const balueSMC = new ethers.Contract(
  import.meta.env.VITE_NFT_CONTRACT_ADDRESS!,
  abi,
  provider
);
