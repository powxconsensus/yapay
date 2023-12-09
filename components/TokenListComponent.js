import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../Utils/context";
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { tokens } from "../Utils/constants";
import { ethers } from "ethers";
import { useNavigation } from "@react-navigation/native";

const TokenListComponent = () => {
  const [selectedChainId, setSelectedChainId] = useState(
    Object.keys(tokens)[0]
  ); // Default to the first chainId
  const selectedTokens = tokens[selectedChainId] || [];
  const { wallet, fetchTokenBalance } = useWallet();
  const [balances, setBalances] = useState({});

  const updateBalances = async () => {
    const updatedBalances = {};
    for (const token of tokens[selectedChainId] || []) {
      const tokenAddress = token.address;
      const balance = await fetchTokenBalance(
        tokenAddress,
        "0xBde4aF797e5Ed659D057295A7F95cdc0A82aBCA9",
        selectedChainId
      );

      const balanceBigInt = BigInt(balance);
      // Format the balance as a string with fixed decimals (e.g., 2 decimals)
      const formattedBalance = (
        balanceBigInt / BigInt(10 ** (token.decimal || 18))
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      updatedBalances[token.name] = formattedBalance;

      console.log("balance", formattedBalance, selectedChainId, tokenAddress);
    }
    
    setBalances(updatedBalances);
  };

  useEffect(() => {
    updateBalances();
  }, [selectedChainId]);

  // useEffect(()=>{

  //   (async () => {
  //     console.log(
  //       "sda",
  //       await fetchTokenBalance(
  //         "0x51A549C274A13efdAC1e84DD99B05BFAB4198192",
  //         "0x4E27128CdEF7a3CFFdF800BE3Be6EE74639CB639",
  //         "80001"
  //       )
  //     );
  //   })();
  // },[])

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select ChainId:</Text>
      <View style={styles.innerContainer}>
        <Picker
          selectedValue={selectedChainId}
          onValueChange={(itemValue) => setSelectedChainId(itemValue)}
          style={styles.picker}
        >
          {Object.keys(tokens).map((chainId) => (
            <Picker.Item key={chainId} label={chainId} value={chainId} />
          ))}
        </Picker>
        <Text style={[styles.headerText, { fontSize: 20 }]}>Token Names:</Text>
        {selectedTokens.map((token, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tokenItem}
            onPress={() =>
              navigation.navigate("Detail", {
                selectedChainId,
                token,
                balances,
              })
            }
          >
            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              <Ionicons name="wallet" size={26} color="#5cb85c" />
              <Text style={styles.tokenName}>{token.name}</Text>
            </View>
            <Text style={styles.tokenSymbol}>{balances[token.name]}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Go to Another Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: "#434343",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "50",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#5cb85c",
    marginTop: 20,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    margin: 10,
  },
  picker: {
    height: 40,
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
  },
  tokenItem: {
    backgroundColor: "#010001",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    minHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tokenName: {
    fontSize: 18,
    color: "white",
  },
  tokenSymbol: {
    fontSize: 16,
    color: "white",
  },
});

export default TokenListComponent;
