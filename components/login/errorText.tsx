import { Text } from "react-native"

type Props = {
    text: string
}

export const ErrorText = ({text}: Props)=> {
    return(
        <Text className="ml-4 absolute -bottom-6 text-red-500">
            {text}
        </Text>
    )
}