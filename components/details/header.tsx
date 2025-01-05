import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Pressable, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import React from "react";

interface HeaderDetailProps {
    img: string | undefined;
    city: string | undefined;
    handleBack: () => void;
}

export class HeaderDetail extends React.Component<HeaderDetailProps> {
    render() {
        const { img, city, handleBack } = this.props;

        return (
            <ImageBackground source={{ uri: img }} className="w-full h-80">
                <LinearGradient
                    colors={['#0007', '#0000']}
                    className="w-full h-full"
                >
                    <View className="w-full flex-row items-center justify-between py-4 px-8">
                        <Pressable onPress={handleBack}>
                            <Icon name="arrow-left-long" size={20} color={"white"} />
                        </Pressable>
                        <Text className="text-xl text-white font-semibold">
                            {city}
                        </Text>
                        <View></View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
}
