import React, { Component } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CityType } from "../../types/city";
import { router } from "expo-router";

export class BigCard extends Component<CityType> {
    handlePress = (id: string) => {
        router.push(`details/${id}`);
    };

    render() {
        const props = this.props;

        return (
            <TouchableOpacity 
                className="w-72 h-72 rounded-3xl overflow-hidden mx-3 mb-5"
                onPress={()=>this.handlePress(props.id)}
            >
                <ImageBackground source={{ uri: props.img }} className="w-full h-full">
                    <LinearGradient
                        colors={['#0000', '#000a']}
                        className="w-full h-full justify-end"
                    >
                        <View className="m-3">
                            <Text className="text-white font-bold text-lg">
                                {props.cityPt}
                            </Text>
                            <Text className="text-white font-bold text-lg">
                                📍{props.country}
                            </Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}
