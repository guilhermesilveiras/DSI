import React from "react";
import { Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
    label: string;
    icon: any;
    count: number;
};

export class TotalCard extends React.Component<Props> {
    render() {
        const { label, icon, count } = this.props;

        return (
            <View className="px-5 py-5 mx-6 flex-row items-center justify-between gap-6 bg-white rounded-xl">
                <View className="flex-row gap-6 items-center">
                    <View className="w-10 h-10 bg-secondary rounded-lg items-center justify-center">
                        <Icon name={icon} size={28} color={"white"} />
                    </View>
                    <Text className="font-semibold">{label}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <Text className="text-xl font-semibold">{count.toFixed(2)}</Text>
                </View>
            </View>
        );
    }
}