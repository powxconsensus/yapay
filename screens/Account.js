import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useWallet } from "../Utils/context";

export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }

  const truncatedString = str.substring(0, 7) + "..." + str.slice(-7);
  return truncatedString;
};

const Account = (props) => {
    const { wallet, fetchTokenBalance } = useWallet();
    
  return (
    <View style={styles.container}>
      {/* User Logo */}
      <View style={styles.userLogoContainer}>
        <Image
          source={require("../assets/logo-icon.png")}
          style={styles.userLogo}
        />
      </View>

      {/* User Address */}
      <View style={styles.userAddressContainer}>
        <Text style={styles.userAddressText}>
          {truncateString(wallet.address, 16)}
        </Text>
      </View>

      {/* Buttons at the Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Landing")}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010001",
  },
  userLogoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userAddressContainer: {
    marginBottom: 40,
  },
  userAddressText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  button: {
    backgroundColor: "#5cb85c",
    padding: 15,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Account;
