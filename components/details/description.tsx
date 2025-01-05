import React from "react";
import { Text } from "react-native";

interface DescriptionProps {
    label: string;
}

export class Description extends React.Component<DescriptionProps> {
    render() {
        const { label } = this.props;

        return (
            <Text className="text text-tertiary text-sm">
                {label}
            </Text>
        );
    }
}
