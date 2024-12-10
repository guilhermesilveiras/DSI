import { Text } from "react-native"

type Props = {
    label: string
}
export const Title = ({label}: Props)=> {
    return(
        <Text className="text-3xl  text-tertiary font-semibold mb-6">
            {label}
        </Text>
    )
}