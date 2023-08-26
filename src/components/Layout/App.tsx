import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "react-redux";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { store } from "../../app/store";
import "../../styles/main.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PopupProvider from "../Popup/PopupProvider";
import Router from "../Router/Router";
import Toast from "../Toast/Toast";

const App: React.FC = () => {
  const { chains, publicClient } = configureChains(
    [
      {
        id: 1072,
        name: "ShimmerEVM Testnet",
        network: "shimmer",
        nativeCurrency: {
          decimals: 18,
          name: "Shimmer",
          symbol: "SMR",
        },
        rpcUrls: {
          public: { http: ["https://json-rpc.evm.testnet.shimmer.network"] },
          default: { http: ["https://json-rpc.evm.testnet.shimmer.network"] },
        },
        blockExplorers: {
          default: { name: "Shimmer", url: "https://explorer.evm.testnet.shimmer.network/tx" },
        },
        testnet: true,
      },
    ],
    [
      alchemyProvider({
        apiKey: import.meta.env.VITE_ALCHEMY_KEY!,
      }),
      publicProvider(),
    ],
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID!,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <div className="main-body bg-[#110929] w-full leading-6">
            <Header />
            <PopupProvider>
              <Toast />
              <Router />
            </PopupProvider>
            <Footer />
          </div>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export default App;
