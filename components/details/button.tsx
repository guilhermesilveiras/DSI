import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    city: string | undefined;
    handleAction: () => void;
}

export class Button extends React.Component<ButtonProps> {
    render() {
        const { city, handleAction } = this.props;

        return (
            <TouchableOpacity 
                onPress={handleAction} 
                className="w-full py-4 mt-16 bg-secondary rounded-xl"
            >
                <Text className="text-xl text-center text-white">
                    Planejar Viagem para {city}
                </Text>
            </TouchableOpacity>
        );
    }
}
