import { Text } from "react-native"

type Props = {
    label: string
}
export const Description = ({label}: Props)=> {
    return(
        <Text className="text-zinc-500 text-sm">{label}</Text>
    )
}