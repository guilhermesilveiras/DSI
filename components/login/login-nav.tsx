import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
    label: string;
    linkLabel: string;
    nav: () => void;
};

export class LoginNav extends Component<Props> {
    render() {
        const { label, linkLabel, nav } = this.props;

        return (
            <View className="flex-row items-center gap-2 text-zinc-500">
                <Text className="text-zinc-500">{label}</Text>
                <Pressable onPress={nav}>
                    <Text className="text-secondary font-bold">{linkLabel}</Text>
                </Pressable>
            </View>
        );
    }
}
