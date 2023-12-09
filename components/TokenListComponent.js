import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../Utils/context";
import { Buffer } from "buffer/";
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { config, tokens } from "../Utils/constants";
import { ethers } from "ethers";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


const TokenListComponent = () => {
  const [selectedChainId, setSelectedChainId] = useState(
    Object.keys(tokens)[0]
  ); // Default to the first chainId
  const selectedTokens = tokens[selectedChainId] || [];
  const { wallet, fetchTokenBalance } = useWallet();
  const [balances, setBalances] = useState({});
  const [estTimeData,setEstTimeData] = useState();

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

    }

    setBalances(updatedBalances);
  };

  useEffect(() => {
    updateBalances();
  }, [selectedChainId]);

  const navigation = useNavigation();
  const Auth = Buffer.from(
    "91531d5460e34331a77e37156c61e223" +
      ":" +
      "2194cb49ca0244d1af4245430c9f36f0"
  ).toString("base64");

  // The chain ID of the supported network
  const[loader,setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await axios.get(
          `https://gas.api.infura.io/networks/${config[selectedChainId].mainChainId}/suggestedGasFees`,
          {
            headers: {
              Authorization: `Basic ${Auth}`,
            },
          }
        );
        setLoading(false);
        setEstTimeData(data.data);
      } catch (error) {
        console.log("Server responded with:", error);
      }
    })();
  }, [selectedChainId]);

  

  const [selectedTab, setSelectedTab] = useState("low");

  const renderGasInfo = (gasType,estTimeData) => {
    const gasData = estTimeData && estTimeData[gasType];
    let networkStatusMessage = "⚪ Unknown";
    let feeTrendMessage = "💹 Fees are stable.";

    // Check network congestion and set network status message
    if (estTimeData.networkCongestion < 0.5) {
      networkStatusMessage = "⚫ Low (Stable)";
    } else {
      networkStatusMessage = "🔴 High (Congested)";
      // You may provide additional information or instructions to users about high congestion.
      // For example, you could display a message like "Transaction processing may be delayed due to high network congestion."
    }

    // Check base fee trend and set fee trend message
    if (estTimeData.priorityFeeTrend === "down") {
      feeTrendMessage = "💹 Fees are decreasing.";
    } else {
      feeTrendMessage = "💹 Fees are increasing.";
    }

    if (!gasData) {
      // Handle the case when gasData is undefined
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            No data available for {gasType}.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.tabContent}>
        <Text style={styles.tabLabel}>
          ~ {Number(gasData.minWaitTimeEstimate) / 1000} s -{" "}
          {Number(gasData.maxWaitTimeEstimate) / 1000} s ~
          {"                             "}
          {gasData.suggestedMaxFeePerGas}
        </Text>
        <Text style={styles.tabLabel}>
          {feeTrendMessage}{"               "} {networkStatusMessage}
        </Text>
      </View>
    );
  };


  

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "low" && styles.selectedTab]}
            onPress={() => setSelectedTab("low")}
          >
            <Text style={styles.tabText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "medium" && styles.selectedTab]}
            onPress={() => setSelectedTab("medium")}
          >
            <Text style={styles.tabText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "high" && styles.selectedTab]}
            onPress={() => setSelectedTab("high")}
          >
            <Text style={styles.tabText}>High</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Picker
              selectedValue={selectedChainId}
              onValueChange={(itemValue) => setSelectedChainId(itemValue)}
              style={styles.picker}
            >
              {Object.keys(tokens).map((chainId) => (
                <Picker.Item
                  key={chainId}
                  label={config[chainId].chainName}
                  value={chainId}
                />
              ))}
            </Picker>
          </View>
        </View>
        {!loader && estTimeData && renderGasInfo(selectedTab, estTimeData)}
      </View>
      <View style={styles.innerContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingVertical: 1,
    paddingHorizontal: 16,
    backgroundColor: "#010001",
    height: 140,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 16,
    height: 40,
  },
  pickerContainer: {
    height: 30, // Set the height to 30
    width: 200,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#434343",
  },
  selectedTab: {
    backgroundColor: "#5cb85c",
  },
  tabText: {
    color: "white",
    fontSize: 16,
  },
  tabContent: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#434343",
    marginBottom: 10,
  },
  tabLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: "#5cb85c",
    textAlign: "center",
  },
  noDataContainer: {
    paddingTop: 10,
    borderRadius: 8,
    backgroundColor: "#FFDADA",
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 14,
    color: "#FF0000",
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
    flex:1,
    marginLeft: 20,
    backgroundColor: "#434343",
    borderRadius: 10,
    width: 140,
    color:"white"
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
  infoBox: {
    backgroundColor: "#434343",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 80,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    color: "white",
    width: 100,
  },
  infoValue: {
    fontSize: 18,
    color: "white",
  },
});

export default TokenListComponent;
