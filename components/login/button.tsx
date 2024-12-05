import { LinearGradient } from "expo-linear-gradient"
import { Pressable, Text } from "react-native"
import { ButtonInputType } from "../../types/button-input"
import { router } from "expo-router"


export const ButtonInput = ({label, route}: ButtonInputType)=> {

    const handlePress = ()=> {
        router.replace(route)
    }

    return(
        <Pressable
            onPress={handlePress}
            className="w-52 rounded-xl overflow-hidden"
        >
            <LinearGradient 
                colors={['#024554', '#002932']}
                className="w-full py-3 justify-center items-center">
                <Text className="text-white font-semibold">{label}</Text>
            </LinearGradient>
        </Pressable>
    )
}