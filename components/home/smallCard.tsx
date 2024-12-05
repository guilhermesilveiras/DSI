import { ImageBackground, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { SmallCardType } from "../../types/smallCardType"



export const SmallCard = ({city, img}: SmallCardType)=> {

    const imageUrl = img
    
    return(
        <View className="w-[47%] h-44 rounded-3xl overflow-hidden">
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
        </View>
    )
}