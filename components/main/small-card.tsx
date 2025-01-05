import React, { Component } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { CardType } from "../../types/card";

type Props = CardType;

export class SmallCard extends Component<Props> {
    handlePress = () => {
        const { id } = this.props;
        router.navigate(`details/${id}`);
    };

    render() {
        const { city, img } = this.props;
        const imageUrl = img;

        return (
            <Pressable 
                className="w-full sm:w-44 h-44 rounded-3xl overflow-hidden"
                onPress={this.handlePress}
            >
                <ImageBackground source={{ uri: imageUrl }} className="w-full h-full">
                    <LinearGradient
                        colors={['#0000', '#000a']}
                        className="w-full h-full justify-end"
                    >
                        <View className="m-3">
                            <Text className="text-white font-semibold text-lg">
                                {city}
                            </Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </Pressable>
        );
    }
}
