import React from "react";
import { Tabs } from "expo-router";
import { Home, Message, Profile2User, ProfileCircle } from "iconsax-react-native";
import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: {
          fontFamily: fontFamily.body,
          fontWeight: "600",
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60 + insets.bottom, // add safe area inset
          paddingBottom: 5 + insets.bottom, // push content above gesture bar
          paddingTop: 5,
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              size={20}
              color={focused ? colors.primary : colors.gray}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <Message
              size={20}
              color={focused ? colors.primary : colors.gray}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="forum"
        options={{
          title: "Post",
          tabBarIcon: ({ focused }) => (
            <Profile2User
              size={20}
              color={focused ? colors.primary : colors.gray}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <ProfileCircle
              size={20}
              color={focused ? colors.primary : colors.gray}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
