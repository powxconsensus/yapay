import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { config } from "../Utils/constants";
import { useWallet } from "../Utils/context";
import ERC20ABI from "../Abi/erc20.json";
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import AllowanceModal from "../components/AllowanceModal";
import { apiFetcher } from "../Utils/fetch";

const Detail = ({ route }) => {
  const { selectedChainId, token, balances } = route.params;
  const { wallet, generateWallet, getTokenBalance } = useWallet();
  const [isModalVisible, setModalVisible] = useState(false);
  const [recentTx, setRecentTx] = useState();
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const amount = 1;

  


  // const handleWithdraw = () => {
  //   // Handle the withdraw action here, for example, navigate to a withdraw screen
  //   navigation.navigate("WithdrawScreen", { selectedChainId, token });
  // };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#434343",
          padding: 15,
          borderRadius: 16,
        }}
      >
        <Text style={styles.title}>Token Detail</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Token ID:</Text>
          <Text style={styles.value}>{selectedChainId}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{token.name}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{balances[token.name]}</Text>
        </View>
      </View>

      {/* Withdraw button */}
      <TouchableOpacity
        style={styles.withdrawButton}
        onPress={async () => {
          console.log("wall", i, token, wallet.address);
          const signer = wallet.connect(config[selectedChainId].provider);
          const tokenInstance = new ethers.Contract(
            token.address,
            ERC20ABI,
            config[selectedChainId].provider
          );
          const allowance = await tokenInstance.allowance(
            wallet.address,
            config[selectedChainId].digilocker
          );
          console.log("allowance", allowance);
          if (ethers.toBigInt(allowance) < ethers.toBigInt(amount)) {
            // openModal();
            const ex = await tokenInstance
              .connect(signer)
              .increaseAllowance(config[selectedChainId].digilocker, amount);
            console.log("ex", ex);
          }
          const i = await config[selectedChainId].contract
            .connect(signer)
            .lock([token.address], [amount], wallet.address);
          console.log("after", i);
        }}
      >
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
      <Button title="Open Modal" onPress={openModal} />
      <AllowanceModal isVisible={isModalVisible} closeModal={closeModal} />

      <View style={styles.innerContainer}>
        <Text style={[styles.headerText, { fontSize: 20 }]}>
          Recent Transactions:
        </Text>
        {/* {recentTx &&
          recentTx.map((token, index) => (
            <View key={index} style={styles.tokenItem}>
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Ionicons name="wallet" size={30} color="#5cb85c" />
                <Text style={styles.tokenName}>{token.name}</Text>
              </View>
              <Text style={styles.tokenSymbol}>33</Text>
            </View>
          ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 40,
    backgroundColor: "#010001",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  value: {
    fontSize: 18,
    color: "white",
  },
  withdrawButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#5cb85c", // Use the same color as in the Login page
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: "#434343",
    width: "96%",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  tokenItem: {
    backgroundColor: "#434343",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    minHeight: 80,
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
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});

export default Detail;
