import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/HomePage";
import LoginPage from "./screens/Login";
import { Ionicons } from "@expo/vector-icons";
import SignupPage from "./screens/Signup";
import LandingPage from "./screens/Landing";
import Scanner from "./screens/Scanner";
import ProfileButton from "./components/ProfileButton";
import { WalletProvider } from "./Utils/context";
import Transaction from "./screens/Transaction";
import QrCodeScanner from "./components/QrCodeScanner";
import Detail from "./screens/Detail";
import Confirmation from "./components/Confirmation";
// import { AnonAadhaarProvider } from "anon-aadhaar-react";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  // return <Ionicons name="map" size={40} color="#bbd4ce" />;
  return <Text style={{ color: "white", fontSize: 16 }}></Text>;
}

export default function App() {
  return (
    // <AnonAadhaarProvider>
    <NavigationContainer>
      <WalletProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerBackTitleStyle: {
              color: "white",
            },
            contentStyle: {
              backgroundColor: "#010001",
            },
            headerStyle: {
              backgroundColor: "#010001",
            },
            headerTintColor: "#fff",
            headerRight: () => <ProfileButton onPress={() => {}} />,
          }}
        >
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={SignupPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen
            name="Qrcode"
            component={QrCodeScanner}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Confirm" component={Confirmation} />
        </Stack.Navigator>
      </WalletProvider>
    </NavigationContainer>
    // </AnonAadhaarProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
