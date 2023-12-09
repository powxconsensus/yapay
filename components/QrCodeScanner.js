import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QrCodeScanner = ({ route }) => {
  const { accountDetail } = route.params;

  return (
    <View style={styles.container}>
        <Text style={styles.receiveButtonText}>Receive</Text>
      <View style={styles.qrCodeContainer}>
        <Text style={styles.scanText}>Scan the code to make Payment</Text>
        <View style={styles.qrCodeBorder}>
          <QRCode value={JSON.stringify(accountDetail.account)} size={300} />
          {/* {
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
  } */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop:100,
  },
  receiveButton: {
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  receiveButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  qrCodeContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  qrCodeBorder: {
    borderWidth: 2,
    borderColor: "#95a5a6",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    marginVertical: 20,
  },
  scanText: {
    fontSize: 16,
    marginBottom: 10,
    color:"white",
  },
});

export default QrCodeScanner;
