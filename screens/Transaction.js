import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
// import AwesomeSlider from "react-native-awesome-slider";
import Slider from "react-native-slider";
import { useWallet } from "../Utils/context";
import { apiFetcher } from "../Utils/fetch";
import { truncateString } from "./Account";
import { useNavigation } from "@react-navigation/native";

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import { convertNumber, fixedDecimalPlace } from "../Utils/util";

const MyComponent = ({ data, onValueChange, tokenBalance, tokens }) => {
  data = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== "0")
  );
  const idToNameMapping = tokens.reduce((result, item) => {
    result[item.id] = item.name;
    return result;
  }, {});
  return (
    <View>
      {Object.keys(data).map((key, index) => {
        let maxValue = tokenBalance.balance[key];
        const decimalData = tokens.find((obj) => obj.id === key);
        let decimal = decimalData.decimal;

        return (
          <View
            key={key}
            style={{
              flexDirection: "column", // Change flexDirection to column
              padding: 10,
              color: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ width: 80, color: "white" }}>
                {idToNameMapping[key]}
              </Text>
              <Text style={{ marginLeft: 10, color: "white" }}>
                {fixedDecimalPlace(maxValue, decimal).toPrecision(4)}
              </Text>
            </View>

            <Slider
              style={{ marginLeft: 10, width: "100%" }} // Set width to 100% to take the whole line
              value={Number(data[key])}
              onValueChange={(newValue) => onValueChange(key, newValue)}
              minimumValue={0}
              maximumValue={Number(maxValue)}
              step={0.2}
            />
            <Text style={{ color: "#FFFFFF90" }}>
              Current Value:{" "}
              {fixedDecimalPlace(data[key], decimal).toPrecision(4)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const Transaction = ({ route }) => {
  const { wallet, clearWallet, tokens, tokenBalance } = useWallet();
  // console.log("tnce", tokenBalance);
  const [sliderValues, setSliderValues] = useState(tokenBalance.balance);
  const [sendAmount, setSendAmount] = useState(0);
  const convertDataToObject = (data) => {
    const amounts = data.data.use_amounts;
    const tokens = data.data.use_tokens;

    const result = tokens.reduce((acc, token, index) => {
      acc[token] = amounts[index];
      return acc;
    }, {});

    return result;
  };

  const handleValueChange = (key, value) => {
    if (value !== undefined) {
      setSliderValues((prevValues) => ({
        ...prevValues,
        [key]: value,
      }));
      // Additional actions...
    }
  };

  const { type, data } = route.params;
  const Qr_data = JSON.parse(data);

  const abicoded = new ethers.AbiCoder();
  const getTxData = (optimalPath) => {
    // if(optimalPath.data.use_tokens.length === 0 || tx_data.length ===0 || tx_tokens===0){
    //   console.alert("Invalid Input");
    //   return;
    // }
    const tx_data = [];
    const tx_tokens = [];
    for (let i = 0; i < optimalPath.data.use_tokens.length; i++) {
      if (optimalPath.data.use_amounts[i] !== "0") {
        const data1 = abicoded.encode(
          [
            "address",
            "uint256", //amount
          ],
          [Qr_data.address, BigInt(optimalPath.data.use_amounts[i])]
        );
        tx_data.push(data1);
        tx_tokens.push(optimalPath.data.use_tokens[i]);
      }
    }
    const rssdsee = abicoded.encode(
      [
        "address", // recipient
        "string[]", // tokens
        "string[]", // data
        "uint256", // amount
        "uint256", // slippage in 4decimal max, passed value will be divided by 10000
        "string", // refund_token
      ],
      [
        Qr_data.address,
        tx_tokens,
        tx_data,
        convertNumber(sendAmount), // in dollar [] 10^9
        "10000000000000000000000", // slippage 10^4
        tx_tokens[0],
      ]
    );

    const transactionData = {
      transaction: {
        data: rssdsee,
        hash: "",
        chain_id: "11",
        created_at: Math.floor(Date.now() / 1000),
        tx_type: "Transfer",
        from: wallet?.address,
        nonce: "1",
        signature: {
          r: "2222",
          s: "11",
          v: 1,
        },
      },
    };
    return transactionData;
  };

  const [amounts, setAmounts] = useState([]); //input for this
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [optimalPath, setOptimalPath] = useState();
  const getOptimalPath = async (selectedTokens, amounts, sendAmount) => {
    try {
      let res;

      res = await apiFetcher(
        "dontcare",
        {
          tokens: selectedTokens,
          amounts,
          amount: sendAmount.toString(),
        },
        "get_optimal_path"
      );
      setOptimalPath(res.response);
      setSliderValues(convertDataToObject(res.response));
      return res.response.tokens;
    } catch (error) {
      console.log("error e -", error);
    }
  };

  useEffect(() => {
    const amounts = [];
    const tokens = [];

    Object.keys(tokenBalance.balance).map((id, index) => {
      if (tokenBalance.balance[id] > 0) {
        tokens.push(id);
        amounts.push(tokenBalance.balance[id]);
      }
    });
    setSelectedTokens(tokens);
    setAmounts(amounts);
  }, []);

  useEffect(() => {
    if (sendAmount == 0) {
      return;
    }
    getOptimalPath(selectedTokens, amounts, sendAmount);
  }, [selectedTokens, amounts, sendAmount]);
  //   {
  //     "id":"dontcare",
  //     "params":{
  //         "tokens":["OuhZAqQP6lgJuytRN4NYzeduUIKh41yXNoyOGzSf"],
  //         "amounts":[10000000000],
  //         "amount": 11231118329432987
  //     },
  //     "method":"get_optimal_path"
  // }

  const navigation = useNavigation();

  const handleConfirm = async () => {
    try {
      let res;
      res = await apiFetcher(
        "dontcare",
        getTxData(optimalPath),
        "broadcast_transaction"
      );
      console.log("TransactionResult", res.response);
      let tx_hash = res.response.data.tx_hash;
      navigation.navigate("Confirm", {
        tx_hash,
      });
    } catch (error) {
      console.log("error e -", error);
    }
  };

  return (
    <ScrollView style={{ height:"auto",margin: 20, color: "white"}}>
      <View
        style={{
          gap: 10,
          backgroundColor: "#434343",
          alignItems: "center",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <TextInput
          style={styles.textArea}
          placeholder="00.00"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(text) => setSendAmount(Number(text))}
          value={sendAmount}
        />
        <Text style={styles.Inputext}>Enter Amount to be paid</Text>
        <Text style={styles.data}>{truncateString(wallet.address)}</Text>
      </View>

      <Text style={[styles.header, { color: "white" }]}>Token Names:</Text>
      <MyComponent
        data={sliderValues}
        onValueChange={handleValueChange}
        tokenBalance={tokenBalance}
        tokens={tokens}
      />
      <View style={{ flex: 1, justifyContent: "flex-end",marginTop:180 }}>
        <Pressable style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  Inputext: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
    color: "white",
  },
  textArea: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 40,
  },
  detailsContainer: {
    backgroundColor: "#434343",
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
  },
  typeLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#868196",
  },
  dataLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  data: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#868196",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "transparent",
    borderBottomWidth: 0,
    paddingLeft: 10,
    backgroundColor: "transparent",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#5cb85c", // Use the same color as in the Login page
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "red",
    color: "#fff",
    padding: 15,
    borderRadius: 5,
    fontSize: 18,
    paddingBottom: 100,
  },
  slider: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  tokenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tokenInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  tokenLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  tokenName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
});

export default Transaction;
