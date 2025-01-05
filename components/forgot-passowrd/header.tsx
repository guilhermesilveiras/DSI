import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";

interface Props {
    label: string;
    handleBack: () => void;
}

export class Header extends Component<Props> {
    render() {
        const { label, handleBack } = this.props;

        return (
            <View className="flex-row items-center justify-between">
                <Pressable onPress={handleBack}>
                    <Icon name="arrow-left" size={22} color={"#024554"} />
                </Pressable>
                <Text className="text-2xl text-secondary font-semibold">
                    {label}
                </Text>
                <View></View>
            </View>
        );
    }
}
