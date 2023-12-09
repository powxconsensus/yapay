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
import  axios  from "axios";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import AllowanceModal from "../components/AllowanceModal";
import { apiFetcher } from "../Utils/fetch";
import { convertTimestampToDateTime, convertfloat, get_evm_transaction_receipt } from "../Utils/util";
import TransferModel from "../components/TransferModel";
import { truncateString } from "./Account";

const Detail = ({ route }) => {
  const { selectedChainId, token, balances } = route.params;
  const { wallet, generateWallet, getTokenBalance } = useWallet();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTransferModalVisible, setTransferModalVisible] = useState(false);
  const [recentTx, setRecentTx] = useState();
  const [amount, setAmount] = useState("1");
  const [reqallowance, setReqAllowance] = useState(BigInt(0));
  const [allow, setAllow] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

   const openTransferModel = () => {
     setTransferModalVisible(true);
   };
  const closeTransferModal = () => {
    setTransferModalVisible(false);
  };
  //   const amount = 1;
  const {tokens} = useWallet();
  const handleTransfer = async () => {
    // console.log("wall", i, token, wallet.address);
     const signer = wallet.connect(config[selectedChainId].provider);
    const i = await config[selectedChainId].contract
      .connect(signer)
      .lock([token.address], [amount], wallet.address);
      console.log("i",i.hash);
    const receipt = await get_evm_transaction_receipt(
      config[selectedChainId].provider,i.hash);
    console.warn(receipt.hash);
  };

  const speedAllowance =async () =>{
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
    
    const ex = await tokenInstance
      .connect(signer)
      .increaseAllowance(config[selectedChainId].digilocker, convertfloat(amount,token.decimal));

      await get_evm_transaction_receipt(
      config[selectedChainId].provider,
      ex.hash
    );
    setReqAllowance(
      reqallowance.add(
        BigInt(convertfloat(amount, token.decimal))
      )
    );
  }

  const getChainTransaction = async () => {
    setIsLoading(true);
    try {
      let res;
      res = await axios.get(
        `${config[selectedChainId].api}?module=account&action=tokentx&address=${wallet.address}&contractaddress=${token.address}&apikey=${config[selectedChainId].apikey}`
      );
      setRecentTx(res.data.result);
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log("error e -", error);
    }
  };

  const getAllowance = async () => {
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
    setReqAllowance(allowance);
  };
  useEffect(() => {
    getChainTransaction();
    getAllowance();
  }, []);


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
          <Text style={styles.value}>{truncateString(token.address, 4)}</Text>
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
          <Text style={styles.value}>{balances[token.name]}</Text>
        </View>
      </View>

      {/* Withdraw button */}

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
          onChangeText={(text) => setAmount(Number(text))}
          value={amount}
        />
        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={
            ethers.toBigInt(reqallowance) < ethers.toBigInt(amount)
              ? openModal
              : openTransferModel
          }
        >
          <Text style={styles.buttonText}>
            {ethers.toBigInt(reqallowance) < ethers.toBigInt(amount)
              ? "allowance"
              : "Transfer"}
          </Text>
        </TouchableOpacity>
      </View>

      <AllowanceModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        setAllow={setAllow}
        speedAllowance={speedAllowance}
      />
      <TransferModel
        isVisible={isTransferModalVisible}
        closeModal={closeTransferModal}
        handleTransfer={handleTransfer}
      />

      <View style={styles.innerContainer}>
        <Text style={[styles.headerText, { fontSize: 20 }]}>
          Recent Transactions:
        </Text>
        <ScrollView style={{ height: "auto", width: "100%", color: "white" }}>
          {isLoading ? (
            <ActivityIndicator
              style={styles.loader}
              size={80}
              color="#5cb85c"
            />
          ) : (
            recentTx &&
            recentTx.map((token, index) => (
              <View key={index} style={styles.tokenItem}>
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <Ionicons name="wallet" size={20} color="#5cb85c" />
                  <Text style={styles.tokenName}>
                    {convertTimestampToDateTime(token.timeStamp)}
                  </Text>
                </View>
                <Text style={styles.value}>{truncateString(token.hash,2)}</Text>
              </View>
            ))
          )}
        </ScrollView>
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
  textArea: {
    width: "50%",
    textAlign: "center",
    fontSize: 24,
    color: "white",
    marginTop:30,
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

export default Detail;
