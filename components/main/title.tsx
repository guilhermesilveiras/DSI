import React, { Component } from "react";
import { Text } from "react-native";

type Props = {
    label: string;
};

export class Title extends Component<Props> {
    render() {
        const { label } = this.props;

        return (
            <Text className="text-3xl text-tertiary font-semibold mb-6">
                {label}
            </Text>
        );
    }
}
