import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
} from "react-native";
import { useWallet } from "../Utils/context";
import { AntDesign } from "@expo/vector-icons";
import { getSignerFromPrivateKeyOrMnemonic } from "../Utils/util";

const Signup = (props) => {
  const [password, setPassword] = useState("");
  const { setWallets } = useWallet();

  const handlePress = () => {
    // Handle signup logic here
    const signerWallet = getSignerFromPrivateKeyOrMnemonic(password);
    console.log("signerWallets", signerWallet);
    setWallets(signerWallet);
    props.navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-icon.png")} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.headerText}>DIGI-PAY</Text>
      </View>
      <Text style={styles.title}>SignUp To Continue</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter Mnemonics or Public key"
        autoCapitalize="none"
        placeholderTextColor="#B6B6B4"
        onChangeText={(text) => setPassword(text)}
        value={password}
        multiline={true}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>

      <Text
        style={styles.importText}
        onPress={() => props.navigation.navigate("Login")}
      >
        Already have an account?{" "}
        <AntDesign name="export" size={20} color="white" />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  headerText: {
    color: "#bbd4ce",
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
  },

  textInput: {
    borderColor: "#bbd4ce",
    color: "white",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    height: 80,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#5cb85c", // Use the same color as in the Login page
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
  loginText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Signup;
