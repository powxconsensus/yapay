// import { PushAPI } from "@pushprotocol/restapi";
// import { ENV } from "@pushprotocol/restapi/src/lib/constants";
// // import * as dotenv from 'dotenv'
// // Import the crypto getRandomValues shim (**BEFORE** the shims)
// import "react-native-get-random-values";

// // Import the the ethers shims (**BEFORE** ethers)
// import "@ethersproject/shims";

// // Import the ethers library
// import { ethers } from "ethers";
// import { useWallet } from "../Utils/context";


// export const Push = async ()=>{
//     const {wallet} = useWallet();
//     console.log(wallet)
//     const env = ENV.STAGING
//     const channelSigner = new ethers.Wallet(wallet.);
//     const channelUser = await PushAPI.initialize(channelSigner,{env})

//     console.log("fetching channel Info...");
//     const channelInfo = await channelUser.channel.info()
//     console.log("channel name ", channelInfo.name )

//     console.log("fetching channel Subscriber...");
//     const subscribers = await channelUser.channel.subscribers();
//     console.log("subscribe" , subscribers);
    
//     console.log("Sending notification...")
//     await channelUser.channel.send([
//       "0xBde4aF797e5Ed659D057295A7F95cdc0A82aBCA9"],{notification:{
//         title : 'My notification Title',
//         body: 'My notification body',
//       }
//     });

//     console.log('Notification Sent')

// }