import React from "react";
import { Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
    city: string;
    price: string;
};

export class CardHeader extends React.Component<Props> {
    getLimitedTitle(city: string, maxLength: number = 21) {
        const title = `Viagem para ${city}`;
        return title.length > maxLength ? title.slice(0, maxLength) + "-" : title;
    }

    render() {
        const { city, price } = this.props;

        return (
            <View className="flex-row items-center justify-between">
                <View className="gap-4">
                    <View>
                        <Text className="text-2xl font-semibold text-white">
                            {this.getLimitedTitle(city)}
                        </Text>
                    </View>
                    <Text className="text-xl text-white font-semibold">
                        US$ {price ? price : "0.00"}
                    </Text>
                </View>
                <View className="bg-white px-2 py-2 rounded-lg">
                    <Icon name="airplane" size={30} color={"#024554"} />
                </View>
            </View>
        );
    }
}
