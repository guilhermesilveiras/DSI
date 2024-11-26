import { LinearGradient } from "expo-linear-gradient"
import { Pressable, Text } from "react-native"

type Props = {
    label: string
}

export const ButtonInput = ({label}: Props)=> {
    return(
        <Pressable
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