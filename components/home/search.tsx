import React, { Component } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

interface SearchState {
    location: string;
}

export class Search extends Component<{}, SearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            location: "",
        };
    }

    handlePress = () => {
        // Implementar a lógica de busca
    };

    render() {
        const { location } = this.state;

        return (
            <View className="w-full mb-8 px-10">
                <Text className="font-bold mb-2"></Text>
                <View className="flex-row items-center w-full">
                    <TextInput
                        className="border w-full bg-zinc-200 border-zinc-300 rounded-full px-8 focus:border-secondary"
                        placeholder="Para onde você quer viajar?"
                        value={location}
                        onChangeText={(e) => this.setState({ location: e })}
                    />
                    <Pressable
                        className="w-10 h-10 -ml-10 rounded-full justify-center items-center"
                        onPress={this.handlePress}
                    >
                        <Icon name="search-location" size={16} />
                    </Pressable>
                </View>
            </View>
        );
    }
}
