import { LinearGradient } from "expo-linear-gradient"
import { Pressable, Text } from "react-native"

export const ButtonInput = ()=> {
    return(
        <Pressable
            className="w-52 rounded-xl overflow-hidden"
        >
            <LinearGradient 
                colors={['#024554', '#002932']}
                className="w-full py-3 justify-center items-center">
                <Text className="text-white font-semibold">Login</Text>
            </LinearGradient>
        </Pressable>
    )
}