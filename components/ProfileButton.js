import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Appbar, Menu, Divider, Provider } from "react-native-paper";
// import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import TokensModal from "./TokensModal"
import { useWallet } from "../Utils/context";
import { truncateString } from "../screens/Account";


const ProfileButton = ({ onPress })  => {
  const [modalVisible, setModalVisible] = useState(false);
  const {wallet} = useWallet();

  const openMenu = () => {
    setModalVisible(true);
  };

  const [tokensModalVisible, setTokensModalVisible] = useState(false);

  const closeMenu = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Text style={{ color: "white", paddingRight: 10 }}>
        {!wallet ? "" : truncateString(wallet.address,2)}
      </Text>
      <TouchableOpacity onPress={openMenu} style={styles.button}>
        <View style={styles.profileIcon}>
          <Icon name="user" size={24} color="#5cb85c" />
        </View>
      </TouchableOpacity>
      <TokensModal
        isVisible={tokensModalVisible}
        onClose={() => setTokensModalVisible(false)}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                onPress();
                closeMenu();
              }}
            >
              <Text
                style={styles.menuItem}
                onPress={() => {
                  setTokensModalVisible(true);
                  onPress(); // This is where you can keep your existing logic for the main modal
                  closeMenu();
                }}
              >
                Tokens
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
    

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#bbd4ce",
    borderRadius: 20, // Half of width and height for a perfect circle
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#679186",
    color: "white",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    color: "white",
    borderBottomColor: "#bbd4ce",
  },
  menuItemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#679186",
  },
});


export default ProfileButton;
