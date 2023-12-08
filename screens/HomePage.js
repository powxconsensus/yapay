import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeComponent from "../components/HomeComponent";
import DashboardComponent from "../components/DashboardComponent";
import { apiFetcher } from "../Utils/fetch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Account from "./Account";

const Tab = createBottomTabNavigator();


const CustomTabBarIcon = ({ iconName, color, size, isFocused }) => {
  return (
    <View style={styles.tabBarItemContainer}>
      <MaterialCommunityIcons
        name={iconName}
        color={color}
        size={size + 5}
        style={{ alignSelf: "center" }}
      />
      {isFocused && <View style={styles.activeTabBorder} />}
    </View>
  );
};


const HomePage = (props) => {
  // useEffect(()=>{
  //   getTransactionList();
  // },[])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "Dashboard") {
            iconName = "view-dashboard";
          } else if (route.name === "Account") {
            iconName = "menu";
          }
          return (
            <CustomTabBarIcon
              iconName={iconName}
              color={color}
              size={size}
              isFocused={focused}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: "#010001",
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        // tabBarLabelStyle: {
        //   borderTopLeftRadius: 20, // Adjust border radius for individual tabs
        //   borderTopRightRadius: 20,
        //   overflow: "hidden",
        // },
      })}
      tabBarOptions={{
        showLabel: true,
        activeTintColor: "#F1F5F2",
        inactiveTintColor: "#95a5a6",
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeComponent}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardComponent}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: "center",
  },
  activeTabBorder: {
    width: 35, 
    height: 3, 
    backgroundColor: "#18453B", 
    borderRadius: 2, 
    marginTop: 5, 
  },
});


export default HomePage;
