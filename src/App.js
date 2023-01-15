import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
// import "./App.css";
import "./style.css";
import WalletConnect from "./component/WalletConnect";
import { wagmiClient } from "./helper";
import Home from "./views/Home";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Home />
      </WagmiConfig>
    </div>
  );
}

export default App;
