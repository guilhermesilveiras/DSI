import React from "react";
import { Text } from "react-native";

interface TitleProps {
    label: string;
}

export class Title extends React.Component<TitleProps> {
    render() {
        const { label } = this.props;

        return (
            <Text className="text-xl font-semibold mb-4">
                {label}
            </Text>
        );
    }
}
