import { Text, TextInput, View } from "react-native"
import { InputType } from "../../types/input"


export const Input = (props: InputType)=> {
    return(
        <View className="w-full mb-8">
            <Text className="font-bold mb-2">{props.label}</Text>
            <TextInput
                className="border border-zinc-300 rounded-xl px-8 focus:border-secondary"
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.setValue}
            />
        </View>
    )
}