import React from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

export class Header extends React.Component {
    handleBack = () => {
        router.back();
    };

    render() {
        return (
            <View className="w-full flex-row items-center justify-between py-4 px-10">
                <Pressable onPress={this.handleBack}>
                    <Icon name="arrow-left-long" size={22} color={"#024554"} />
                </Pressable>
                <Text className="text-2xl text-secondary font-semibold">
                    Lista de desejos
                </Text>
                <View></View>
            </View>
        );
    }
}
