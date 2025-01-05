import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
    city: string | undefined;
    handleAction: () => void;
}

export class Button extends React.Component<ButtonProps> {
    render() {
        const { city, handleAction } = this.props;

        return (
            <Pressable 
                onPress={handleAction} 
                className="w-full py-6 mt-16 bg-secondary rounded-full"
            >
                <Text className="text-xl text-center text-white">
                    Planejar Viagem para {city}
                </Text>
            </Pressable>
        );
    }
}
