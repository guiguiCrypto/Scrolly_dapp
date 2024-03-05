import { useEffect, useMemo, useState, useContext } from "react";
import logo from "../assets/logo.png";
import { nftContractCall, nftContractCallDefaultProvider} from "../utils/BlockchainCall";
import { ethers } from 'ethers';
import { constants } from '../utils/Constants';
import { ConnectionContext } from "../utils/Context";

const maxMint = 10;
const mintPrice = 7500000;

const MintPage = () => {

  const [balance, setBalance] = useState();
  const [count, setCount] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [mintedCount, setMintedCount] = useState(undefined)
  const [totalSupply, setTotalSupply] = useState(undefined)

  const connectionContext = useContext(ConnectionContext);

  useEffect(()=> {
    if(connectionContext && connectionContext.value && connectionContext.value.isConnected) {
      loadOnchainDatas();
    } else {
      loadOnchainDatasWithDefaultRpc();
    }
  }, [connectionContext, isConnected])

  const loadOnchainDatas = async () => {
    const totalMinted = await nftContractCall()
    setMintedCount(BigInt(totalMinted).toString())
  }

  const loadOnchainDatasWithDefaultRpc = async () => {
    const totalMinted = await nftContractCallDefaultProvider("totalMinted")
    setMintedCount(BigInt(totalMinted).toString())
  }

  const totalPrice = useMemo(()=> {
    return count * mintPrice; 
  }, [count])

  const increment = () => {
    if(count < maxMint) {
      setCount(count+1)
    }
  }
  const decrement = () => {
    if(count > 1) {
      setCount(count-1)
    }
  }

  const mint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const nftContract = new ethers.Contract(constants.nftContractAddress, constants.nftAbi, signer);


          await nftContract.publicMint(count);
          
          console.log(`waiting for tx : mint with args : ${count}`);

      } else {
          console.log("Ethereum object does not exist");
      }

  } catch (err) {
      console.error(err.message)
  }
  }

  return (
    <div className="mint-card">
      <div>
        <span id="remaining">Remaining: {mintedCount} / 333</span>
        <span id="balance">Scrolly Balance</span>
      </div>

      <div className="mint-section">
        <img src={logo}></img>
        <span>minting in progress</span>

        <ScrollBar></ScrollBar>
        <div className="quantity">
          <button onClick={decrement} style={{float: "left"}}><span>-</span></button>
          <span className="mintCount">{count}</span>
          <button onClick={increment}><span>+</span></button>
        </div>
        <span className="price">{totalPrice} $scrolly</span>
        <button onClick={mint}><span>Mint</span></button>
      </div>
    </div>
  );
};

const ScrollBar = () => {
  return <div className="loadingBar">
    <div style={{width: "76%"}}>

    </div>
  </div>
};

export default MintPage;
