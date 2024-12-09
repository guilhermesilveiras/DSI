import { Pressable, Text } from "react-native"

type Props = {
    city: string | undefined
    handleAction: ()=> void
}

export const Button = ({city, handleAction}: Props)=> {
    return(
        <Pressable 
            onPress={handleAction}
            className="w-full py-6 mt-16 bg-secondary rounded-full"
        >
            <Text className="text-xl text-center text-white">
                Planejar Viajem para {city}
            </Text>
        </Pressable>
    )
}