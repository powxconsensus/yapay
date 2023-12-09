import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useWallet } from "../Utils/context";
import { apiFetcher } from "../Utils/fetch";
import { tokens } from "../Utils/constants";

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import { truncateString } from "../screens/Account";
import { convertTimestampToDateTime } from "../Utils/util";

const HomeComponent = (props) => {
  const { wallet, fetchTokenBalance, getTokensList, getTokenBalance } =
    useWallet();

  const [selectedChainId, setSelectedChainId] = useState(
    Object.keys(tokens)[0]
  ); // Default to the first chainId
  const selectedTokens = tokens[selectedChainId] || [];

  const [accountDetail, setAccountDetail] = useState({
    account: {
      aadhar_no: "",
      accepts: {},
      address: "0x14791697260e4c9a71f18484c9f997b308e59325",
      country: "",
      is_kyc_done: false,
      kyc_completed_at: 0,
      mobile: "",
      name: "",
      proposal_nonce: 1,
      transactions: [
        "0xdd7509dae1d6ff35adf684ec4aef37fd6cc99035233cc28c918bf9d69dff8488",
      ],
      tx_nonce: 1,
      upi_id: "",
    },
    id: "0",
  });

  const getAccountDetail = async () => {
    try {
      let res;
      res = await apiFetcher(
        "dontcare",
        {
          address: wallet.address,
        },
        "get_account"
      );
      setAccountDetail(res.response);
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
  const [txHash, setTxHash] = useState();

  const [transactionReceipt, setTransactionReceipt] = useState(null);
  const [recentTx, setRecentTx] = useState();

  const getRecentTxOnChain = async () => {
    try {
      let res;
      res = await apiFetcher(
        "dontcare",
        {
          address: "0x14791697260E4c9A71f18484C9f997B308e59325",
        },
        "get_transactions"
      );
      setRecentTx(res.response.transactions);
      return res.response;
    } catch (error) {
      console.log("error e -", error);
    }
  };

  useEffect(() => {
    getRecentTxOnChain();
  }, []);

  function get_transaction_receipt(tx_hash) {
    return new Promise(async (resolve, reject) => {
      const intervalId = setInterval(async () => {
        const res = await apiFetcher(
          "dontcare",
          { tx_hash: tx_hash },
          "get_transaction"
        );
        if (res.response && res.status === 200) {
          clearInterval(intervalId);
          setTransactionReceipt(res.response);
          resolve(res.response.receipt);
        }
      }, 1000);
    });
  }

  const getKYCDone = async () => {
    try {
      let res;
      res = await apiFetcher(
        "dontcare",
        {
          transaction: {
            data: encodedData,
            hash: "",
            chain_id: "11",
            created_at: 0,
            tx_type: "UserKYC",
            from: wallet.address,
            nonce: "1",
            signature: {
              r: "2222",
              s: "11",
              v: 1,
            },
          },
        },
        "broadcast_transaction"
      );
      setTxHash(res.response.data.tx_hash);
      await get_transaction_receipt(res.response.data.tx_hash);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
      await getAccountDetail();
    } catch (error) {
      console.log("error e -", error);
    }
  };
  useEffect(() => {
    (async () => {
      await getAccountDetail();
      const tokens = await getTokensList();
      const addresses = [];
      await getTokenBalance(
        tokens.map((obj) => obj.id),
        tokens.map((obj) => wallet.address)
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="timer" size={80} color="#5cb85c" />
      </View>
      <View style={styles.buttonContainer}>
        {accountDetail.account.is_kyc_done ? (
          <>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: pressed ? "#5cb85c" : "#5cb85c",
                  borderColor: "#5cb85c",
                },
              ]}
              onPress={() => props.navigation.navigate("Scanner")}
            >
              <Text style={styles.buttonText}>Send</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: pressed ? "#5cb85c" : "#5cb85c",
                  borderColor: "#5cb85c",
                },
              ]}
              onPress={() =>
                props.navigation.navigate("Qrcode", { accountDetail })
              }
            >
              <Text style={styles.buttonText}>Receive</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? "#5cb85c" : "#5cb85c",
                borderColor: "#5cb85c",
              },
            ]}
            onPress={getKYCDone}
          >
            <Text style={styles.buttonText}>Get KYC Done</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.innerContainer}>
        <Text style={[styles.headerText, { fontSize: 20, paddingBottom: 20 }]}>
          Recent Transactions:
        </Text>
        {/* <ScrollView>
          {recentTx &&
            recentTx.map((token, index) => (
              <View key={index} style={styles.tokenItem}>
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <Ionicons name="wallet" size={30} color="#5cb85c" />
                  <Text style={styles.tokenName}>{token.block_number}</Text>
                  <Text style={styles.tokenName}>
                    {truncateString(token.hash, 4)}
                  </Text>
                  <Text style={styles.tokenName}>
                    {(new Date(token.timestamp * 1000)).toLocaleString()}
                  </Text>
                  <Text style={styles.tokenName}>
                    {token.result.Result ? "Success" : "Failed"}
                  </Text>
                </View>
                <Text style={styles.tokenSymbol}>
                  {typeof token.tx_type == "object"
                    ? Object.keys(token.tx_type)[0]
                    : token.tx_type}
                </Text>
              </View>
            ))}
        </ScrollView> */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {recentTx &&
            recentTx.map((token, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardHeader}>
                  {/* Logo on the extreme left */}
                  <Ionicons name="wallet" size={30} color="#5cb85c" />

                  {/* Left side content */}
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{token.block_number}</Text>
                    <Text style={styles.headerText}>
                      {truncateString(token.hash, 4)}
                    </Text>
                  </View>

                  <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerText, { paddingLeft: 80 }]}>
                      {token.result.Result ? "Success" : "Failed"}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardHeader}>
                  <Text style={styles.headerText}>
                    {convertTimestampToDateTime(token.timestamp)}
                  </Text>
                  <Text style={styles.tokenSymbol}>
                    {typeof token.tx_type == "object"
                      ? Object.keys(token.tx_type)[0]
                      : token.tx_type}
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#010001",
    paddingTop: 60,
  },
  containerr: {
    padding: 0,
  },
  iconContainer: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#434343",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
  innerContainer: {
    flex: 1,
    width: "96%",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    // marginTop: 30,
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
  // tokenSymbol: {
  //   fontSize: 16,
  //   color: "white",
  // },
  // headerText: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   color: "white",
  //   marginBottom: 20,
  // },
  card: {
    backgroundColor: "#434343",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    marginBottom: 10,
    color: "white",
    width: "100%"
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftColumn: {
    marginRight: 10,
  },
  rightColumn: {
    flex: 1, // Allow right column to take remaining space
    marginLeft: 10,
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 16,
    color: "white",
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5cb85c",
  },
});

export default HomeComponent;
