import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useWallet } from "../Utils/context";

const Login = (props) => {
  const { wallet, generateWallet } = useWallet();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>DIGI-PAY</Text>
      </View>
      <Text style={styles.title}>Login To Continue</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter your mnemonic phrase"
        multiline={true}
        value={wallet ? wallet.mnemonic.phrase : ""}
        editable={false}
        // onChangeText={(text) => console.log(text)}
      />

      <Pressable
        style={styles.button}
        onPress={() =>
          wallet ? props.navigation.navigate("Home") : generateWallet()
        }
      >
        <Text style={styles.buttonText}>
          {wallet ? "Continue" : "Generate Mnemonics"}
        </Text>
      </Pressable>

      <Text
        style={styles.importText}
        onPress={() => props.navigation.navigate("Signup")}
      >
        Want to import Mnemonics{" "}
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
    color: "#5cb85c",
    textAlign:"left",
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
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    height: 100,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#5cb85c", // Change the button color
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold", // Make the text bold
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

export default Login;
