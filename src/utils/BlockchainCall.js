import { ethers } from 'ethers';
import { constants } from './Constants';

export const nftContractCall = async function (name, args = null){
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const nftContract = new ethers.Contract(constants.nftContractAddress, constants.nftAbi, signer);

            let result;

            if(args === null){
                result = await nftContract[name]();
            } else result = await nftContract[name](...args);
            

            console.log(`waiting for tx : ${name} with args : ${args}`);

            return result;
        } else {
            console.log("Ethereum object does not exist");
        }

    } catch (err) {
        console.error(err.message)
    }
}

export const nftContractCallDefaultProvider = async function (name, args = null){
    try {
        const { ethereum } = window;

        if (ethereum) {
            console.log("test")
            const provider = new ethers.JsonRpcProvider(constants.rpcEndpoint);
            console.log(provider)
            const nftContract = new ethers.Contract(constants.nftContractAddress, constants.nftAbi, provider);

            let result;

            if(args === null){
                result = await nftContract.getLastTokenId();
            } else result = await nftContract[name](...args);
            

            console.log(`nftContractCallDefaultProvider waiting for tx : ${name} with args : ${args}`);

            return result;
        } else {
            console.log("Ethereum object does not exist");
        }

    } catch (err) {
        console.error(err.message)
    }
}
