import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Scanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    props.navigation.navigate("Transaction", { type,data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // <View style={styles.container}>
    //   <BarCodeScanner
    //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    //     style={StyleSheet.absoluteFillObject}
    //   />
    //   {/* {scanned && (
    //     <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
    //   )} */}
    // </View>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.scanner,{height:600, width:"100%"}]}
      />
      <Text style={styles.instructions}>Scan the QR Code Above:</Text>
      {/* <View style={styles.scannerContainer}>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
    height:"100%"
  },
  instructions: {
    fontSize: 18,
    marginBottom: 60,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3E92CC",
    borderRadius: 10,
    overflow: "hidden",
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Scanner;
