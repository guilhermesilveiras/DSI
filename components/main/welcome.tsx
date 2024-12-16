import { Text, View } from "react-native"

type Props = {
    name: string
}
export const Welcome = ({name}: Props)=> {
    return(
        <View className="w-full px-10 pb-10">
            <Text className="text-4xl text-tertiary">
                Olá, {name}!
            </Text>
            <Text className="text-md text-zinc-500 mt-2">
                Comece a planejar sua viagem.
            </Text>
        </View>
    )
}