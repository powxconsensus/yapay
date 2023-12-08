import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useWallet } from "../Utils/context";

const Landing = (props) => {
  const { wallet, clearWallet } = useWallet();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 100,
      }}
    >
      <Text style={{ color: "#5cb85c", fontSize: 40 }}>DIGI-PAY</Text>
      <Ionicons name="timer" size={80} color="#5cb85c" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Pressable
          style={styles.button}
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text style={styles.text}>Create new Wallet</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "black" }]}
          onPress={() => props.navigation.navigate("Signup")}
        >
          <Text style={[styles.text, { color: "white" }]}>
            I already have a wallet
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#5cb85c",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default Landing;
