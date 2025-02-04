import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ButtonInputType } from "../../types/button-input";

export class ButtonInput extends Component<ButtonInputType> {
    render() {
        const { label, onPress } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                className="w-52 rounded-xl overflow-hidden bg-secondary justify-center items-center p-3"
            >
                <Text className="text-white font-semibold">{label}</Text>
            </TouchableOpacity>
        );
    }
}
