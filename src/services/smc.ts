import * as ethers from "ethers";
import abi from "./abi.json";
const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_RPC_HTTPS!
);

console.log(
  "7s1:",
  process.env.REACT_APP_RPC_HTTPS!,
  process.env.REACT_APP_NFT_CONTRACT_ADDRESS!
);
export const balueSMC = new ethers.Contract(
  process.env.REACT_APP_NFT_CONTRACT_ADDRESS!,
  abi,
  provider
);
