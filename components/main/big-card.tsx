import { ImageBackground, Pressable, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { CardType } from "../../types/card"
import { router } from "expo-router"

export const BigCard = ({id, city, country, img}: CardType)=> {

    const imageUrl = img
    
    const handlePress = ()=> {
        router.navigate(`details/${id}`)
    }

    return(
        <Pressable 
            className="w-72 h-72 rounded-3xl overflow-hidden mx-3"
            onPress={handlePress}    
        >
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
        </Pressable>
    )
}