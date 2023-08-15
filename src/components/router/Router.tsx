import React, {useEffect} from "react";
import {HashRouter, Outlet, Route, Routes} from "react-router-dom";
import {LazyBridge, LazyMint} from "./elements";

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/" element={<LazyBridge />} /> */}
        <Route path="/" element={<LazyMint />} />
        {/* <Route
          path="/"
          element={
            <PopupProvider>
              <Outlet />
            </PopupProvider>
          }
        >
          <Route path="/" element={<LazyDashBoard />} />
          <Route path="/dex" element={<LazyDex />} />
          <Route path="/earn" element={<LazyStakeAndEarn />} />
          <Route path="/buy" element={<LazyBuy />} />
          <Route path="/refferals" element={<LazyRefferals />} />
          <Route path="/ecosystem" element={<LazyEcosystem />} />
        </Route> */}
      </Routes>
    </HashRouter>
  );
};

export default Router;
