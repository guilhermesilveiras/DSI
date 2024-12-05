import { ImageBackground, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BigCardType } from "../../types/bigCardType"



export const BigCard = ({city, country, img}: BigCardType)=> {

    const imageUrl = img
    
    return(
        <View className="w-72 h-72 rounded-3xl overflow-hidden mx-3">
            <ImageBackground source={{uri: imageUrl}} className="w-full h-full">
                <LinearGradient
                    colors={['#0000', '#000a']}
                    className="w-full h-full justify-end"
                >
                    <View className="m-3">
                        <Text className="text-white font-bold text-lg">
                            {city}
                        </Text>
                        <Text className="text-white font-bold text-lg">
                        📍{country}
                        </Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}