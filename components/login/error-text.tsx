import React, { Component } from "react";
import { Text } from "react-native";

type Props = {
    text: string;
};

export class ErrorText extends Component<Props> {
    render() {
        const { text } = this.props;

        return (
            <Text className="ml-4 absolute -bottom-6 text-red-500">
                {text}
            </Text>
        );
    }
}
