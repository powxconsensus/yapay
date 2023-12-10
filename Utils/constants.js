// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import ABI from "../Abi/abi.json";

export const config = {
  5: {
    digilocker: "0x7763A4A1b529f0236cA7c4eb6643c13D4e9dfC4F",
    rpc: "https://goerli.infura.io/v3/91531d5460e34331a77e37156c61e223",
    chainName: "Goerli",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://goerli.infura.io/v3/91531d5460e34331a77e37156c61e223"
    ),
    contract: new ethers.Contract(
      "0x7763A4A1b529f0236cA7c4eb6643c13D4e9dfC4F",
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
    digilocker: "0xd6B8A33E38207A08c190938DD68247391a8B22Ea",
    rpc: "https://polygon-mumbai.g.alchemy.com/v2/J_V0Ht1HpzXSdM24cwiSdiTW8klIfJVh",
    chainName: "Polygon Mumbai",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/J_V0Ht1HpzXSdM24cwiSdiTW8klIfJVh/"
    ),
    contract: new ethers.Contract(
      "0xd6B8A33E38207A08c190938DD68247391a8B22Ea",
      ABI,
      new ethers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/J_V0Ht1HpzXSdM24cwiSdiTW8klIfJVh"
      )
    ),
    mainChainId: "137",
    api: "https://api-testnet.polygonscan.com/api",
    apiKey: "EGX85FSTAE2G688ZNECI6NIC7PWA2GVHW6",
  },
  43113: {
    digilocker: "0x0859760938958ce48335B1F8B5b854fcDB62Cf80",
    rpc: "https://rpc.ankr.com/avalanche_fuji",
    chainName: "Avalanche Fuji",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji"),
    contract: new ethers.Contract(
      "0x0859760938958ce48335B1F8B5b854fcDB62Cf80",
      ABI,
      new ethers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji")
    ),
    mainChainId: "43114",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  421613: {
    digilocker: "0x4321f7aB26E61996Cb51607C6cF53B426fa3eeAf",
    rpc: "https://goerli-rollup.arbitrum.io/rpc",
    chainName: "Arbitrum GOERLI",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://goerli-rollup.arbitrum.io/rpc"
    ),
    contract: new ethers.Contract(
      "0x4321f7aB26E61996Cb51607C6cF53B426fa3eeAf",
      ABI,
      new ethers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji")
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  59140: {
    digilocker: "0x974e321fF6Ad6305CcAde04b014C79Cd281DaB78",
    rpc: "https://rpc.goerli.linea.build",
    chainName: "lineaTestnet",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider("https://rpc.goerli.linea.build"),
    contract: new ethers.Contract(
      "0x974e321fF6Ad6305CcAde04b014C79Cd281DaB78",
      ABI,
      new ethers.JsonRpcProvider("https://rpc.goerli.linea.build")
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  534353: {
    digilocker: "0xa7a380808982D0d8BBd6106A0181eBd01FdA6e74",
    rpc: "https://scroll-testnet.blockpi.network/v1/rpc/public",
    chainName: "scrollTestnet",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://scroll-testnet.blockpi.network/v1/rpc/public"
    ),
    contract: new ethers.Contract(
      "0xa7a380808982D0d8BBd6106A0181eBd01FdA6e74",
      ABI,
      new ethers.JsonRpcProvider(
        "https://scroll-testnet.blockpi.network/v1/rpc/public"
      )
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  5001: {
    digilocker: "0x4321f7aB26E61996Cb51607C6cF53B426fa3eeAf",
    rpc: "https://rpc.testnet.mantle.xyz/",
    chainName: "mantleTestnet",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider("https://rpc.testnet.mantle.xyz/"),
    contract: new ethers.Contract(
      "0x4321f7aB26E61996Cb51607C6cF53B426fa3eeAf",
      ABI,
      new ethers.JsonRpcProvider("https://rpc.testnet.mantle.xyz/")
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  84531: {
    digilocker: "0x4356592b6CB360c25EfC2f6AFC2bB55266A1ab7E",
    rpc: "https://base-goerli.public.blastapi.io",
    chainName: "base",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider(
      "https://base-goerli.public.blastapi.io"
    ),
    contract: new ethers.Contract(
      "0x4356592b6CB360c25EfC2f6AFC2bB55266A1ab7E",
      ABI,
      new ethers.JsonRpcProvider("https://base-goerli.public.blastapi.io")
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  195: {
    digilocker: "0x4356592b6CB360c25EfC2f6AFC2bB55266A1ab7E",
    rpc: "https://testrpc.x1.tech/",
    chainName: "X1",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider("https://testrpc.x1.tech/"),
    contract: new ethers.Contract(
      "0x4356592b6CB360c25EfC2f6AFC2bB55266A1ab7E",
      ABI,
      new ethers.JsonRpcProvider("https://testrpc.x1.tech/")
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
  1442: {
    digilocker: "0x4356592b6CB360c25EfC2f6AFC2bB55266A1ab7E",
    rpc: "https://rpc.public.zkevm-test.net",
    chainName: "Polygon ZkEVM",
    LogoURI: "dsfsdfsa.svg",
    provider: new ethers.JsonRpcProvider("https://rpc.public.zkevm-test.net"),
    contract: new ethers.Contract(
      "0x4356592b6CB360c25EfC2f6AFC2bB55266A1ab7E",
      ABI,
      new ethers.JsonRpcProvider("https://rpc.public.zkevm-test.net")
    ),
    mainChainId: "",
    api: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/ap",
    apiKey: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",
  },
};

export const tokens = {
  5: [
    {
      decimal: 6,
      symbol: "USDT",
      name: "Tether US Dollar",
      address: "0x18C3408E9c7E17FBc8A31405e4aD813B6973b591",
    },
    {
      decimal: 18,
      symbol: "WAVAX",
      name: "Wrapped AVAX",
      address: "0x7056C113D3beab791d78E5e36c0bD4053475eb57",
    },
    {
      decimal: 18,
      symbol: "WMATIC",
      name: "Wrapped MATIC",
      address: "0x654dB769f66fD3EA88935189FC8fF46c49837c7e",
    },
    {
      decimal: 18,
      symbol: "GETH",
      name: "Goerli ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  43113: [
    {
      decimal: 6,
      symbol: "USDT",
      name: "Tether US Dollar",
      address: "0xb36dcDE8EB81A340EB99d42fe3e3C94C99d96302",
    },
    {
      decimal: 18,
      symbol: "WETH",
      name: "Wrapped ETH",
      address: "0x38E8dB3150Cf8B07c2765B733E6378CFCaB35ccA",
    },
    {
      decimal: 18,
      symbol: "WMATIC",
      name: "Wrapped MATIC",
      address: "0x4B00eD353Bf63E757eab2e2E59AC95758e447433",
    },
    {
      decimal: 18,
      symbol: "AVAX",
      name: "AVAX",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  80001: [
    {
      decimal: 6,
      symbol: "USDT",
      name: "Tether US Dollar",
      address: "0x42316C6D6dCE553Fb2C0A40A1323D9794fffCd57npx",
    },
    {
      decimal: 18,
      symbol: "WAVAX",
      name: "Wrapped AVAX",
      address: "0x1062aCAd4BF3DA08aEDB6D7AE417edBBde1C03A1",
    },
    {
      decimal: 18,
      symbol: "MATIC",
      name: "MATIC",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
    {
      decimal: 18,
      symbol: "WETH",
      name: "Wrapped ETH",
      address: "0x443000659bf6150C9F8f47671725ED84776B8314",
    },
  ],
  421613: [
    {
      decimal: 18,
      symbol: "AGOR",
      name: "AGOR",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  5001: [
    {
      decimal: 18,
      symbol: "MNT",
      name: "MNT",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  59140: [
    {
      decimal: 18,
      symbol: "ETH",
      name: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  534353: [
    {
      decimal: 18,
      symbol: "ETH",
      name: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  84531: [
    {
      decimal: 18,
      symbol: "ETH",
      name: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
  195: [
    {
      decimal: 18,
      symbol: "ETH",
      name: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  ],
};
