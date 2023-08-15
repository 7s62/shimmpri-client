import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Router from "../components/router/Router";
import {MetaMaskContextProvider} from "../hooks/useMetamask";

import "../styles/main.scss";

const App: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-absolute-color"></div>
      <MetaMaskContextProvider>
        <div className="main-body bg-[#110929] w-full leading-6">
          <Header />
          <Router />
          <Footer />
        </div>
      </MetaMaskContextProvider>
    </div>
  );
};
export default App;
