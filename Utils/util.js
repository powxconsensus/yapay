// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";

export function getSignerFromPrivateKeyOrMnemonic(str) {
  const privateKeyRegex = /^[0-9a-fA-F]{64}$/;
  const mnemonicRegex = /^([a-z]+\s){11}[a-z]+$/;
  if (privateKeyRegex.test(str)) {
    return new ethers.Wallet(str);
  } else if (mnemonicRegex.test(str)) {
    return ethers.Wallet.fromMnemonic(str);
  } else {
    throw new Error("Invalid input: not a private key or mnemonic");
  }
}


export function convertNumber(number){{
     let num = number.toString();
     let index = num.indexOf(".");
     num = num.replace(".", "");
     num = num + "0".repeat(9 - (index + 1));
     return num;
}}

export function fixedDecimalPlace(number, decimal) {
  return parseFloat(number / (10 ^ decimal));
}

export function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const options = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    
  };

  return date.toLocaleString("en-US", options);
}


