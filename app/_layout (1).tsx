import React, { Component } from "react";
import { Stack } from "expo-router";
import "../global.css";

class Layout extends Component {
    render() {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="sign-in" />
                <Stack.Screen name="sign-up" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="home" />
                <Stack.Screen name="for-you" />
                <Stack.Screen name="travels" />
                <Stack.Screen name="wish-list" />
            </Stack>
        );
    }
}

export default Layout;
