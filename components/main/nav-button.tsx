import React, { Component } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type Props = {
    label: string;
    active?: boolean;
    route?: string;
};

export class NavButton extends Component<Props> {
    handlePress = () => {
        const { route } = this.props;
        if (route) {
            router.navigate(route);
        }
    };

    render() {
        const { label, active } = this.props;

        return (
            <TouchableOpacity
                onPress={this.handlePress}
                className={`h-10 justify-center flex-1 rounded-xl ${active ? "bg-secondary" : "bg-primary"}`}
            >
                <Text className="text-center text-sm text-white">
                    {label}
                </Text>
            </TouchableOpacity>
        );
    }
}
