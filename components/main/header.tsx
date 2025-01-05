import React, { Component } from "react";
import { Pressable, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

export class Header extends Component {
    handleListButton = () => {
        router.navigate('/wish-list');
    };

    render() {
        return (
            <View className="w-full flex-row items-center justify-between px-10 py-8">
                <Pressable onPress={this.handleListButton}>
                    <Icon name="list-ul" size={24} color={"#002932"} />
                </Pressable>
                <Pressable>
                    <Icon name="user-circle" size={24} color={"#002932"} />
                </Pressable>
            </View>
        );
    }
}
