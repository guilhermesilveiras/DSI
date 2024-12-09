import { Text } from "react-native"

type Props = {
    label: string
}

export const Title = ({label}: Props)=> {
    return(
        <Text className="text-xl font-semibold mb-4">
            {label}
        </Text>
    )
}