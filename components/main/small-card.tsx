import React, { Component } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { CityType } from "../../types/city";

type Props = CityType;

export class SmallCard extends Component<Props> {
    handlePress = () => {
        const { id } = this.props;
        router.navigate(`details/${id}`);
    };

    render() {
        const { cityPt, img, country} = this.props;
        const imageUrl = img;

        return (
            <TouchableOpacity 
                className="w-full sm:w-44 h-44 rounded-3xl overflow-hidden mb-4 mx-auto"
                onPress={this.handlePress}
            >
                <ImageBackground source={{ uri: imageUrl }} className="w-full h-full">
                    <LinearGradient
                        colors={['#0000', '#000a']}
                        className="w-full h-full justify-end"
                    >
                        <View className="m-3">
                            <Text className="text-white font-semibold text-lg">
                                {cityPt}
                            </Text>
                            <Text className="text-white font-bold text-lg">
                                📍{country}
                            </Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}
