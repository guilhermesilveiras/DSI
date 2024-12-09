import { Pressable, Text } from "react-native"

type Props = {
    label: string
}

export const Widget = ({label}: Props)=> {
    return(
        <Pressable
            className="w-32 rounded-full overflow-hidden bg-secondary py-4 items-center justify-center"
        >
                <Text className="text-white">{label}</Text>
        </Pressable>
    )
}