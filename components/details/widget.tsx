import React from "react";
import { Pressable, Text } from "react-native";

interface WidgetProps {
    label: string;
}

export class Widget extends React.Component<WidgetProps> {
    render() {
        const { label } = this.props;

        return (
            <Pressable
                className="w-32 rounded-full overflow-hidden bg-secondary py-4 items-center justify-center"
            >
                <Text className="text-white">{label}</Text>
            </Pressable>
        );
    }
}
