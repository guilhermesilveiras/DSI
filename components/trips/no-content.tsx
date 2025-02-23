import { Text, View } from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
    icon: any
    label: string
}
export const NoContent = ({icon,label}: Props)=> {
    return(
        <View className="w-full h-96 justify-center items-center gap-6 bg-secondary rounded-2xl">
            <Icon name={icon} size={80} color="white" />
            <Text className="font-semibold text-xl text-white">
                {label}
            </Text>
        </View>
    )
}