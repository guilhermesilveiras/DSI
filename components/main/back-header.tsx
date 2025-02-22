import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";

interface Props {
    mode: "white" | "primary";
    city: string | undefined;
    handleBack: () => void;
}

export class BackHeader extends React.Component<Props> {
    render() {
        const { mode, city, handleBack } = this.props;

        return (
            <View className="w-full flex-row items-center justify-between py-4 px-8">
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left-long" size={20} color={mode === "white" ? "white" : "#024554"} />
                </TouchableOpacity>
                <Text className={`text-xl text-${mode === "white" ? "white" : "secondary"} font-semibold`}>
                    {city}
                </Text>
                <View></View>
            </View>
        );
    }
}