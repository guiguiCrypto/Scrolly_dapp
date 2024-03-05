import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MintPage from "./components/MintPage";
import { CollectionPage } from "./components/CollectionPage";
import { ethers } from "ethers";
import { ConnectionContext } from "./utils/Context";

function App() {


  const [connectionContext, setConnectionContext] = useState(undefined);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
        console.log(newNetwork);
      });

      isConnected();
    }
  }, []);

  async function isConnected() {
    const accounts = await ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
      setConnectionContext({isConnected : true, userAddress: accounts[0]})
       console.log(`You're connected to: ${accounts[0]}`);
    } else {
       console.log("Metamask is not connected");
    }
 }

  return (
    <div id="cloud-intro">
      <ConnectionContext.Provider value={[connectionContext, setConnectionContext]}>
        <Router>
        <header>
          <Header></Header>
        </header>
          <Routes>
            <Route path="/" element={<MintPage />}></Route>
            <Route path="/mint" element={<MintPage />}></Route>
            <Route path="/collection" element={<CollectionPage />}></Route>
          </Routes>
        </Router>
      </ConnectionContext.Provider>
    </div>
  );
}

export default App;
