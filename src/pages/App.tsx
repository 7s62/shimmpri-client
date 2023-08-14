import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Router from "../components/router/Router";
import {MetaMaskContextProvider} from "../hooks/useMetamask";

import "../styles/main.scss";

const App: React.FC = () => {
  return (
    <MetaMaskContextProvider>
      <div className="main-body bg-[url('../assets/images/cool-background.png')] bg-cover w-full leading-6">
        <Header />
        <Router />
        <Footer />
      </div>
    </MetaMaskContextProvider>
  );
};
export default App;
