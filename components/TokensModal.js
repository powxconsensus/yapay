import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TokensModal = ({ isVisible, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemPress = (item) => {
    // Toggle the selection state of the item
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        : [...prevSelectedItems, item]
    );
  };

  const handleConfirm = () => {
    // Save the selected items and create a string with their names
    // const selectedItemsNames = selectedItems.join(", ");

    // // Display an alert with the names of selected items
    // Alert.alert("Tokens Modified", `Selected items: ${selectedItemsNames}`);

    onClose(); // Close the modal
  };

  const renderListItem = (item) => {
    const isSelected = selectedItems.includes(item);
    return (
      <TouchableOpacity
        key={item}
        onPress={() => handleItemPress(item)}
        style={styles.listItem}
      >
        <Text style={styles.listItemText}>{item}</Text>
        <Icon
          name={isSelected ? "check-square-o" : "square-o"}
          size={20}
          color="#679186"
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Tokens Modal Content</Text>

          {/* List of selectable items */}
          {["Fuji", "Avax", "Route","USDT"].map((item) => renderListItem(item))}

          {/* Confirm button */}
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>

          {/* Close button in top right corner */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    width: "80%", // Adjust the width as needed
    alignItems: "center",
    elevation: 5, // shadow on Android
    position: "relative",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#679186",
    borderRadius: 8,
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#679186",
    width: "100%",
  },
  listItemText: {
    fontSize: 16,
    color: "#679186",
  },
  confirmButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#679186",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "white",
  },

  confirmButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#679186",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default TokensModal;

