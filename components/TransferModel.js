import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from "react-native";

const TransferModel = ({ isVisible, closeModal, handleTransfer }) => {
  const [amount, setAmount] = useState();
  const HandleAllow = () => {
    handleTransfer();
    closeModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Do you really want to Transfer ? </Text>
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
              onPress={HandleAllow}
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

export default TransferModel;
