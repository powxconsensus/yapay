import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import { apiFetcher } from "./fetch";
import { config } from "./constants";

// Create a context to hold the wallet state
const WalletContext = createContext();

// Custom hook to use the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};

// Wallet provider component
export const WalletProvider = ({ children }) => {
  const [mnemonic, setMnemonic] = useState("");

  const [wallets, setWallets] = useState();
  const [tokens, setTokens] = useState([
    {
      balance_mp: {},
      chain_token_mapping: {
        80001: "0x5Ff0fB7Cd6E5d81C718a78A92E0832F9379ef95C",
      },
      decimal: 18,
      id: "vu9Aul8uU2QxvCKlM0CEDac4TsRzQMTShMRHUAml",
      name: "YAKEEN",
      price: 1111.233,
      symbol:
        "https://s.gravatar.com/avatar/aaf672e9b1f054c64276b961c26b1693?s=480&r=pg&d=https%3A%2F%2Fstorage.googleapis.com%2Fexpo-website-default-avatars%2Fl-2x.png&d=https://storage.googleapis.com/expo-website-default-avatars-2023/l.png",
    },
  ]);
  const [tokenBalance, setTokenBalance] = useState({
    balance: { as8d9asd9: 1,sadasd: 3 },
    id: "0",
  });

  let wallet;

  const generateWallet = async () => {
    const rwallet = ethers.Wallet.createRandom();
    const generatedMnemonic = rwallet.mnemonic.phrase;
    wallet = ethers.Wallet.fromPhrase(generatedMnemonic);
    console.log("context-pvtkey:", wallet);
    setMnemonic(generatedMnemonic);
    setWallets(wallet);
    await AsyncStorage.setItem("mnemonics", generatedMnemonic);
  };

  const getTokensList = async () => {
    try {
      let res;
      res = await apiFetcher("dontcare", { from: 0, to: 1000 }, "get_tokens");
      setTokens(res.response.tokens);
      return res.response.tokens;
    } catch (error) {
      console.log("error e -", error);
    }
  };

  const getTokenBalance = async (tokens,addresses) => {
    try {
      let res;
      console.log("object",{
        tokens,
        addresses,
      });
      res = await apiFetcher(
        "dontcare",
        {
          tokens,
          addresses,
        },
        "get_balances"
      );
      setTokenBalance(res.response);
      return res;
    } catch (error) {
      console.log("error e -", error);
    }
  };


   const abicoded = new ethers.AbiCoder();
   const encodedData = abicoded.encode(
     ["string", "string", "string", "string", "string", "string"],
     [
       "guest1",
       "1234123456780987",
       "powxconsenus.digipay",
       "+919452183284",
       "address",
       "india",
     ]
   );


   const fetchTokenBalance = async (token,wallet,chainId)=>{
    const provider = new ethers.JsonRpcProvider(config[chainId].rpc);
    const instance = new ethers.Contract(
      token,
      [
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          type: "function",
        },
      ],
      provider
    );
    return await instance.balanceOf(wallet);
   }

   

  

  const clearWallet = () => {
    setWallets(null);
  };


  // Pass the wallet state and functions to the context
  const contextValue = {
    wallet: wallets,
    generateWallet,
    clearWallet,
    tokens,
    tokenBalance,
    getTokenBalance,
    fetchTokenBalance,
    setWallets,
    getTokensList,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
