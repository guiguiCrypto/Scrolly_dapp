import { ethers } from "ethers";
import { useContext, useEffect, useMemo, useState } from "react";
import { constants } from "../utils/Constants";
import { ConnectionContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Header = () => {
  const [connectionContext, setConnectionContext] =
    useContext(ConnectionContext);

  const displayAddress = useMemo(() => {
    if (connectionContext && connectionContext.isConnected) {
      return (
        connectionContext.userAddress.substring(0, 10) +
        "..." +
        connectionContext.userAddress.substring(
          connectionContext.userAddress.length - 10,
          connectionContext.userAddress.length
        )
      );
    }
    return undefined;
  }, [connectionContext]);

  const connectBlockchain = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      setConnectionContext({ isConnected: true, userAddress: address });

      const networkId = await provider.getNetwork();

      if (networkId.chainId.toString() != constants.chainId) {
        window.alert("Please switch to chain : " + constants.chainName);
      }
    } else {
      window.alert("Please Install Metamask!!!");
    }
  };

  return (
    <div className="header">
      <ul>
        <li style={{ width: "30%" }}>
          <h1> SCROLLY THE MAP</h1>
        </li>
        <li style={{ width: "17%" }}>
          <Link to="/mint">
            <h2>NFT MINT</h2>
          </Link>
        </li>
        <li style={{ width: "17%" }}>
          <h2>
            <a href="https://scrolly.xyz/" target="blank">
              SCROLLY NAME
            </a>
          </h2>
        </li>
        <li style={{ width: "17%" }}>
          <Link to="/collection">
            <h2>MY SCROLLIES</h2>
          </Link>
        </li>
        <li style={{ width: "19%" }} className="connectNavItem">
          {connectionContext && connectionContext.isConnected ? (
            <h2>{displayAddress}</h2>
          ) : (
            <button onClick={connectBlockchain}>
              <h2>CONNECT WALLET</h2>
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
