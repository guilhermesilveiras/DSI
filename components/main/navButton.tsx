import { router } from "expo-router"
import { Pressable, Text } from "react-native"

type Props = {
    label: string
    active?: boolean
    route?: string
}

export const NavButton = ({label, active, route}: Props)=> {
    
    const handlePress = ()=> {
        router.navigate(`${route}`)
    }

    return(
        <>
        {active &&
            <Pressable onPress={handlePress} className="h-10 justify-center flex-1 rounded-full bg-secondary">
                <Text className="text-center text-sm text-white">
                    {label}
                </Text>
            </Pressable>
        }
        {!active &&
            <Pressable onPress={handlePress} className="h-10 justify-center flex-1 rounded-full bg-primary">
                <Text className="text-center text-sm text-white">
                    {label}
                </Text>
            </Pressable>
        }
        </>
    )
}