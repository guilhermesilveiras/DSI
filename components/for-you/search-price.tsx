import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

interface State {
    price: string;
}

export class SearchPrice extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            price: "",
        };
    }

    handlePress = () => {
        // Implement the functionality for handlePress
    };

    handlePriceChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        this.setState({ price: numericValue });
    };

    render() {
        const { price } = this.state;

        return (
            <View className="w-full mb-8 px-10">
                <Text className="font-bold mb-2"></Text>
                <Text className="text-zinc-500 ml-4">Orçamento definido:</Text>
                <View className="flex-row items-center w-full">
                    <TextInput
                        className="border w-full bg-zinc-200 border-zinc-300 rounded-xl px-8 focus:border-secondary"
                        placeholder="Orçamento em USD"
                        value={`U$ ${price}`}
                        onChangeText={this.handlePriceChange}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        className="w-10 h-10 -ml-10 rounded-full justify-center items-center"
                        onPress={this.handlePress}
                    >
                        <Icon name="search-dollar" size={16} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
