import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
} from "react-native";



const KYCModal = ({ isVisible, closeModal, getKYCDone }) => {


  const url = "https://yakken-web-laukiks-projects.vercel.app/";
const handleLinkPress = async () => {
  

  // Check if the device can open the URL
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Open the URL in the device's default web browser
    await Linking.openURL(url);
    getKYCDone();
    closeModal();
  } else {
    console.error("Cannot open the URL");
  }
};
const HandleConfirm = () =>{
  getKYCDone();
  closeModal();
}

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Redirect to : </Text>
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              {url}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 20,
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={styles.withdrawButton}
              onPress={HandleConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.withdrawButton}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: 300,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  withdrawButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#5cb85c", // Use the same color as in the Login page
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default KYCModal;
