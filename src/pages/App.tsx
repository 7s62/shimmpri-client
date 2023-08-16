import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Router from "../components/router/Router";
import "@rainbow-me/rainbowkit/styles.css";

import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {goerli} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";
import "../styles/main.scss";
import PopupProvider from "../components/popup/PopupProvider";
import {Provider} from "react-redux";
import {store} from "../app/store";
import Toast from "../components/toast/Toast";

const App: React.FC = () => {
  const {chains, publicClient} = configureChains(
    [goerli],
    [
      alchemyProvider({
        apiKey: process.env.REACT_APP_ALCHEMY_KEY!,
      }),
      publicProvider(),
    ]
  );

  const {connectors} = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID!,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <div className="relative">
      <div className="bg-absolute-color"></div>
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
    </div>
  );
};
export default App;
