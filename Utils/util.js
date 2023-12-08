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

// export const fixedDecimalPlace = (value, decimalPlace) => {
//     return (parseFloat(value.toString()));
// };