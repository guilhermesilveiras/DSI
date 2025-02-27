import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
                <TouchableOpacity onPress={handleBack} className="px-2 py-2">
                    <Icon name="arrow-left-long" size={20} color={mode === "white" ? "white" : "#024554"} />
                </TouchableOpacity>
                <Text className={`text-xl text-${mode === "white" ? "white" : "secondary"} font-semibold -ml-10`}>
                    {city}
                </Text>
                <View></View>
            </View>
        );
    }
}