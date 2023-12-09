// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import ABI from "../Abi/abi.json";

export const config = {
  5: {
    digilocker: "0x799FEb50c1b789caE80Be1A010e1F4D19B749414",
    rpc: "https://goerli.infura.io/v3/91531d5460e34331a77e37156c61e223",
    chainName: "Goerli",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://goerli.infura.io/v3/91531d5460e34331a77e37156c61e223"
    ),
    contract: new ethers.Contract(
      "0x799FEb50c1b789caE80Be1A010e1F4D19B749414",
      ABI,
      new ethers.JsonRpcProvider(
        "https://goerli.infura.io/v3/91531d5460e34331a77e37156c61e223"
      )
    ),
    mainChainId: "1",
    api: "https://api-goerli.etherscan.io/api",
    apiKey: "FF9TZXKT2JWZ68M2EJH1FGCX13IB7ZKPUZ",
  },
  80001: {
    digilocker: "0x30511622FED0572d3Ab7afa4d11d7641a9180F00",
    rpc: "https://polygon-mumbai-bor.publicnode.com/",
    chainName: "Polygon Mumbai",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://polygon-mumbai-bor.publicnode.com/"
    ),
    contract: new ethers.Contract(
      "0x30511622FED0572d3Ab7afa4d11d7641a9180F00",
      ABI,
      new ethers.JsonRpcProvider("https://polygon-mumbai-bor.publicnode.com/")
    ),
    mainChainId: "137",
    api: "https://api-testnet.polygonscan.com/api",
    apiKey: "EGX85FSTAE2G688ZNECI6NIC7PWA2GVHW6",
  },
  43113: {
    digilocker: "0x150ecE8554356D4Ed639C60b7E8101c6716889a0",
    rpc: "https://rpc.ankr.com/avalanche_fuji",
    chainName: "Avalanche Fuji",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji"),
    contract: new ethers.Contract(
      "0x150ecE8554356D4Ed639C60b7E8101c6716889a0",
      ABI,
      new ethers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji")
    ),
    mainChainId: "43114",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
};

export const tokens = {
  5: [
    {
      name: "USDT",
      decimal: 6,
      symbol: "USDT",
      address: "0x91873D09eB8739eAB65105b613a2AEac1Af1E2CD",
      chainId: "5",
    },
    {
      name: "Indian Rupee",
      decimal: 6,
      symbol: "RUPEE",
      address: "0xd9625d22eb6371F9120817B46E278e9803c7d42B",
      chainId: "5",
    },
  ],
  80001: [
    {
      name: "USDT",
      decimal: 6,
      symbol: "USDT",
      address: "0x51A549C274A13efdAC1e84DD99B05BFAB4198192",
      chainId: "5",
    },
    {
      name: "Indian Rupee",
      decimal: 6,
      symbol: "RUPEE",
      address: "0x2690b208c8fD241ac255EeeEf3408BFcFFe44050",
      chainId: "5",
    },
  ],
  43113: [
    {
      name: "USDT",
      decimal: 6,
      symbol: "USDT",
      address: "0xfa1BF2653c7be57fc75094f16e3446E1Da9607Cf",
      chainId: "5",
    },
    {
      name: "Indian Rupee",
      decimal: 6,
      symbol: "RUPEE",
      address: "0x4824Dfd8EA11046AF61530Ebaea0fd26e36cf991",
      chainId: "5",
    },
  ],
};
