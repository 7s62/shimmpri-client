import abi from "../services/abi.json";

const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS! as `0x${string}`;
const explorerURL = import.meta.env.VITE_EXPLORER_URL! as string;

const config = {
  contractAddress,
  contract: {
    address: contractAddress,
    abi: abi as any,
  },
  explorerURL,
};

export default config;
