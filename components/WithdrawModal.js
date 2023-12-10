import React, { useState,useEffect } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet
} from "react-native";
import { config, tokens } from "../Utils/constants";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import { Buffer } from "buffer/";


const WithdrawModal = ({ isVisible, closeModal, handleWithdraw }) => {

const [selectedChainId, setSelectedChainId] = useState(Object.keys(tokens)[0]);
  const [estTimeData, setEstTimeData] = useState();
  const Auth = Buffer.from(
    "91531d5460e34331a77e37156c61e223" +
      ":" +
      "2194cb49ca0244d1af4245430c9f36f0"
  ).toString("base64");
  const [loader, setLoading] = useState(false);

   useEffect(() => {
     (async () => {
       setLoading(true);
       try {
         const data = await axios.get(
           `https://gas.api.infura.io/networks/${config[selectedChainId].mainChainId}/suggestedGasFees`,
           {
             headers: {
               Authorization: `Basic ${Auth}`,
             },
           }
         );
         setLoading(false);
         setEstTimeData(data.data);
       } catch (error) {
         console.log("Server responded with:", error);
       }
     })();
   }, [selectedChainId]);

  const [selectedTab, setSelectedTab] = useState("low");


   const renderGasInfo = (gasType, estTimeData) => {
     const gasData = estTimeData && estTimeData[gasType];
     let networkStatusMessage = "⚪ Unknown";
     let feeTrendMessage = "💹 Fees are stable.";

     // Check network congestion and set network status message
     if (estTimeData.networkCongestion < 0.5) {
       networkStatusMessage = "⚫ Low (Stable)";
     } else {
       networkStatusMessage = "🔴 High (Congested)";
       // You may provide additional information or instructions to users about high congestion.
       // For example, you could display a message like "Transaction processing may be delayed due to high network congestion."
     }

     // Check base fee trend and set fee trend message
     if (estTimeData.priorityFeeTrend === "down") {
       feeTrendMessage = "💹 Fees are decreasing.";
     } else {
       feeTrendMessage = "💹 Fees are increasing.";
     }

     if (!gasData) {
       // Handle the case when gasData is undefined
       return (
         <View style={styles.noDataContainer}>
           <Text style={styles.noDataText}>
             No data available for {gasType}.
           </Text>
         </View>
       );
     }

     return (
       <View style={styles.tabContent}>
         <Text style={styles.tabLabel}>
           ~ {Number(gasData.minWaitTimeEstimate) / 1000} s -{" "}
           {Number(gasData.maxWaitTimeEstimate) / 1000} s ~
           {"                             "}
           {gasData.suggestedMaxFeePerGas}
         </Text>
         <Text style={styles.tabLabel}>
           {feeTrendMessage}
           {"               "} {networkStatusMessage}
         </Text>
       </View>
     );
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
          
            <View style={styles.mainContainer}>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === "low" && styles.selectedTab,
                  ]}
                  onPress={() => setSelectedTab("low")}
                >
                  <Text style={styles.tabText}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === "medium" && styles.selectedTab,
                  ]}
                  onPress={() => setSelectedTab("medium")}
                >
                  <Text style={styles.tabText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === "high" && styles.selectedTab,
                  ]}
                  onPress={() => setSelectedTab("high")}
                >
                  <Text style={styles.tabText}>High</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                  <Picker
                    selectedValue={selectedChainId}
                    onValueChange={(itemValue) => setSelectedChainId(itemValue)}
                    style={styles.picker}
                  >
                    {Object.keys(tokens).map((chainId) => (
                      <Picker.Item
                        key={chainId}
                        label={config[chainId].chainName}
                        value={chainId}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              {!loader &&
                estTimeData &&
                renderGasInfo(selectedTab, estTimeData)}
            </View>
          
          <Text>Do you really want to Withdraw ? </Text>
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
              onPress={handleWithdraw}
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
  mainContainer: {
    paddingVertical: 1,
    paddingHorizontal: 16,
    backgroundColor: "#010001",
    height: 140,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 16,
    height: 40,
  },
  pickerContainer: {
    height: 30, // Set the height to 30
    width: 200,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#434343",
  },
  selectedTab: {
    backgroundColor: "#5cb85c",
  },
  tabText: {
    color: "white",
    fontSize: 16,
  },
  tabContent: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#434343",
    marginBottom: 10,
  },
  tabLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: "#5cb85c",
    textAlign: "center",
  },
  noDataContainer: {
    paddingTop: 10,
    borderRadius: 8,
    backgroundColor: "#FFDADA",
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 14,
    color: "#FF0000",
  },
});

export default WithdrawModal;
