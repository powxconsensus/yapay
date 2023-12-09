import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../Utils/context";
import { useNavigation } from "@react-navigation/native";


const MyChainTokens = () => {
  const { wallet, clearWallet, tokens, tokenBalance } = useWallet();
  const navigation = useNavigation();

  return (
    <View>
      <Text style={{ color: "green", margin: 16, fontSize: 18 }}>
        Digi Chain Token :
      </Text>
      <View style={styles.innerContainer}>
        {Object.keys(tokenBalance.balance).map((key, index) => {
          let digiToken = tokens.filter((obj) => obj.id === key)[0];
          return (
            <TouchableOpacity
              key={index}
              style={styles.tokenItem}
              onPress={() =>
                navigation.navigate("DigiDetail", {
                  selectedChainId: 11,
                  token: digiToken,
                  balances: tokenBalance.balance,
                })
              }
            >
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Ionicons name="wallet" size={26} color="#5cb85c" />
                <Text style={styles.tokenName}>{digiToken.name}</Text>
              </View>
              <Text style={styles.tokenSymbol}>
                {tokenBalance.balance[key]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MyChainTokens;
