import { useContext, useEffect } from "react"
import { ConnectionContext } from "../utils/Context";
import { nftContractCall } from "../utils/BlockchainCall";
import { constants } from "../utils/Constants";

export const CollectionPage = () => {


    const connectionContext = useContext(ConnectionContext);

    useEffect(()=> {
        console.warn(connectionContext)
        if(connectionContext && connectionContext[0] && connectionContext[0].isConnected) {
            console.warn("efzjifgbh")
            loadBloackchainData();
        }
    }, [connectionContext])

    const loadBloackchainData = async () => {
        const collection = await nftContractCall("balanceOf", [connectionContext[0].userAddress])

        const result = await fetch(`https://api-sepolia.scrollscan.com/api/token/generic-tokentxns2?m=normal&contractAddress=${constants.nftContractAddress}&a=${connectionContext[0].userAddress}&sid=c5e5f69a83aee8beadc72dfa4e20f97f&p=1`)
        console.warn(result)
    }


    return <div className="collection-card">
        content
    </div>
}