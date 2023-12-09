import React, { useState } from "react";
import { View, Modal,TextInput, Text, Button, StyleSheet } from "react-native";

const AllowanceModal = ({ isVisible, closeModal }) => {
    const [amount,setAmount] = useState();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Enter THe amount</Text>
          <TextInput
            style={styles.textArea}
            placeholder="00.00"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={(text) => setAmount(Number(text))}
            value={amount}
          />
          <Button title="Close Modal" onPress={closeModal} />
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
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default AllowanceModal