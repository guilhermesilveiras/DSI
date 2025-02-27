import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface WidgetProps {
    label: string;
}

export class Widget extends React.Component<WidgetProps> {
    render() {
        const { label } = this.props;

        return (
            <TouchableOpacity
                className="w-32 rounded-xl overflow-hidden bg-secondary py-4 items-center justify-center"
            >
                <Text className="text-white">{label}</Text>
            </TouchableOpacity>
        );
    }
}
