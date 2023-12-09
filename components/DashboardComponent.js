import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import TokenListComponent from "./TokenListComponent";
import {tokens} from "../Utils/constants"

const DashboardComponent = (props) => {


  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          gap: 40,
          paddingTop: 40,
          width: "100%",
          backgroundColor: "#010001",
        },
      ]}
    >
      <TokenListComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "50",
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
  container: {
    height: 80,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  tokenName: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DashboardComponent;
