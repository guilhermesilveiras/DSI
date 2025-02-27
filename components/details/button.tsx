import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    label: string | undefined;
    handleAction: () => void;
}

export class Button extends React.Component<ButtonProps> {
    render() {
        const { label, handleAction } = this.props;

        return (
            <TouchableOpacity 
                onPress={handleAction} 
                className="w-full py-4 bg-secondary rounded-xl"
            >
                <Text className="text-xl text-center text-white">
                    {label}
                </Text>
            </TouchableOpacity>
        );
    }
}
