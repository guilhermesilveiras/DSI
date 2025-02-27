import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
    icon: any;
    label: string;
    handlePress?: () => void;
}

export class NoContent extends Component<Props> {
    render() {
        const { icon, label, handlePress } = this.props;

        return (
            <View className="w-full h-96 justify-center items-center gap-6 bg-secondary rounded-2xl">
                <Icon name={icon} size={80} color="white" />
                <Text className="font-semibold text-xl text-white text-center">
                    {label}
                </Text>
                {handlePress && (
                    <TouchableOpacity onPress={handlePress} className="px-6 py-3 bg-background rounded-xl">
                        <Text className="text-secondary font-semibold">
                            Editar perfil
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}
