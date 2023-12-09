import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Pressable,
  Image,
  StyleSheet,
  Button,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { apiFetcher } from "../Utils/fetch";

const Confirmation = ({ route }) => {
  const { tx_hash } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  //     const fetchData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //     setLoading(false);
  //     };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  const [transactionReceipt, setTransactionReceipt] = useState();

  function get_transaction_receipt(tx_hash) {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      const intervalId = setInterval(async () => {
        const res = await apiFetcher(
          "dontcare",
          { tx_hash },
          "get_transaction"
        );
        if (res.response && res.status === 200) {
          clearInterval(intervalId);
          setTransactionReceipt(res.response.transaction.result);
          setLoading(false);
          resolve(res.response.receipt);
        }
      }, 1000);
    });
  }

  useEffect(() => {
    {
      (async () => {
        await get_transaction_receipt(tx_hash);
      })();
    }
  }, []);

  
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{loading && "Processing..."}</Text>
      {loading ? (
        <ActivityIndicator style={styles.loader} size={100} color="#5cb85c" />
      ) : transactionReceipt && transactionReceipt.Result ? (
        <Image
          source={require("../assets/success.gif")}
          style={styles.userLogo}
        />
      ) : (
        <Image
          source={require("../assets/failed.gif")}
          style={styles.userLogo}
        />
      )}
      {!loading && transactionReceipt && transactionReceipt.Result && (
        <Text style={styles.message}>
          will be redirected to Home in 15 secs
        </Text>
      )}

      <Text
        style={styles.importText}
        onPress={() => navigation.navigate("Home")}
      >
        Go Back to home page{" "}
        <AntDesign name="export" size={20} color="white" />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    color: "white",
    paddingTop: 100,
  },
  loader: {
    margin: 30,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "80%", // Adjust the width as needed
  },
  button: {
    alignItems: "center",
    width: "100%",
    borderRadius: 24,
    elevation: 3,
    // Use the same color as in the Login page
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  userLogo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  importText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
  },
});

export default Confirmation;
