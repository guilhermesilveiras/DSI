import React from "react";
import { Text, View } from "react-native";

type Props = {
    city: string;
    name: string;
    price: string;
};

export class CardHeader extends React.Component<Props> {
    render() {
        const { city, name, price } = this.props;

        return (
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-lg font-semibold">
                        Viagem para {city}
                    </Text>
                    <View className="flex-row gap-2">
                        <Text className="text-zinc-500 text-sm">
                            por
                        </Text>
                        <Text className="text-tertiary text-sm">
                            {name}
                        </Text>
                    </View>
                </View>
                <Text className="text-2xl text-tertiary font-semibold">
                    US$ {price}
                </Text>
            </View>
        );
    }
}
