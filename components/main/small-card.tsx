import { ImageBackground, Pressable, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { CardType } from "../../types/card"



export const SmallCard = ({id, city, img}: CardType)=> {

    const imageUrl = img

    const handlePress = ()=> {
        router.navigate(`details/${id}`)
    }
    
    return(
        <Pressable 
            className="w-full sm:w-44 h-44 rounded-3xl overflow-hidden"
            onPress={handlePress}
        >
            <ImageBackground source={{uri: imageUrl}} className="w-full h-full">
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
    )
}