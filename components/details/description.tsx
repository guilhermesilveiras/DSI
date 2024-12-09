import { Text } from "react-native"

type Props = {
    label: string
}

export const Description = ({label}: Props)=> {
    return(
        <Text className="text text-tertiary text-sm">
            {label}
        </Text>
    )
}