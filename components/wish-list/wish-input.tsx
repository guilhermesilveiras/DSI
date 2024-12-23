import { TextInput, View } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome6"

type Props = {
    value: string,
    setValue: (s: string) => void,
    placeholder: string,
    icon: string
}
export const Input = ({ value, setValue, placeholder, icon }: Props) => {
    return (
        <View className="w-full">
            <View className="flex-row items-center w-full">
                <TextInput
                    className="border w-full bg-zinc-200 border-zinc-300 rounded-full px-10 focus:border-secondary"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={e => setValue(e)}
                />
                <View
                    className="w-10 h-10 -ml-10 rounded-full justify-center items-center"
                >
                    <Icon name={icon} size={16} />
                </View>
            </View>
        </View>
    )
}