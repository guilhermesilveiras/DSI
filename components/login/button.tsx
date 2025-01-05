import React, { Component } from "react";
import { Pressable, Text } from "react-native";
import { ButtonInputType } from "../../types/button-input";

export class ButtonInput extends Component<ButtonInputType> {
    render() {
        const { label, onPress } = this.props;

        return (
            <Pressable
                onPress={onPress}
                className="w-52 rounded-xl overflow-hidden bg-secondary justify-center items-center p-3"
            >
                <Text className="text-white font-semibold">{label}</Text>
            </Pressable>
        );
    }
}
