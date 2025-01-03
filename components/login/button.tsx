import { Pressable, Text } from "react-native"
import { ButtonInputType } from "../../types/button-input"


export const ButtonInput = ({label, onPress}: ButtonInputType)=> {

    return(
        <Pressable
            onPress={onPress}
            className="w-52 rounded-xl overflow-hidden bg-secondary justify-center items-center p-3"
        >
            <Text className="text-white font-semibold">{label}</Text>
        </Pressable>
    )
}