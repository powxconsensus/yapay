import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { config } from "../Utils/constants";
import { useWallet } from "../Utils/context";
import ERC20ABI from "../Abi/erc20.json";
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";
import axios from "axios";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import AllowanceModal from "../components/AllowanceModal";
import { apiFetcher } from "../Utils/fetch";
import {
  convertTimestampToDateTime,
  convertfloat,
  get_evm_transaction_receipt,
} from "../Utils/util";
import TransferModel from "../components/TransferModel";
import { truncateString } from "./Account";
import WithdrawModal from "../components/WithdrawModal";

const DigiTokenDetail = ({ route }) => {
  const { selectedChainId, token, balances } = route.params;
  
  const { wallet, tokens, generateWallet, getTokenBalance } = useWallet();
  const [recentTx, setRecentTx] = useState();
  const [amount, setAmount] = useState("1");

  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);

  
  console.log("data", token, selectedChainId, amount);
   const openWithdrawModal  = () => {
     setWithdrawModalVisible(true);
   };
  const closeWithdrawModal = () => {
    setWithdrawModalVisible(false);
  };


  const handleWithdraw = () => {};

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
          <Text style={styles.label}>Token Address:</Text>
          <Text style={styles.value}>{truncateString(token.id, 4)}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{token.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Decimal:</Text>
          <Text style={styles.value}>{token.decimal}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Balance:</Text>
          <Text style={styles.value}>{balances[token.id]}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={styles.textArea}
          placeholder="00.00"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
        <TouchableOpacity style={styles.withdrawButton} onPress={openWithdrawModal}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <WithdrawModal
        isVisible={isWithdrawModalVisible}
        closeModal={closeWithdrawModal}
        handleWithdraw={handleWithdraw}
      />
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
  textArea: {
    width: "50%",
    textAlign: "center",
    fontSize: 24,
    color: "white",
    marginTop: 30,
    height: 40, // Adjust the height based on your design
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingLeft: 10,
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
    fontSize: 12,
    color: "white",
  },
  withdrawButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    paddingVertical: 14,
    paddingHorizontal: 26,
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
    width: "100%",
    borderRadius: 16,
    paddingVertical: 0,
    // paddingHorizontal: 10,
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
    fontSize: 14,
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

export default DigiTokenDetail;
