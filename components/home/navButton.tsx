import { Pressable, Text } from "react-native"

type Props = {
    label: string
    active?: boolean
}

export const NavButton = ({label, active}: Props)=> {
    return(
        <>
        {active &&
            <Pressable className="p-3 flex-1 rounded-full bg-secondary">
                <Text className="text-center text-sm text-white">
                    {label}
                </Text>
            </Pressable>
        }
        {!active &&
            <Pressable className="p-3 flex-1 rounded-full bg-primary">
                <Text className="text-center text-sm text-white">
                    {label}
                </Text>
            </Pressable>
        }
        </>
    )
}