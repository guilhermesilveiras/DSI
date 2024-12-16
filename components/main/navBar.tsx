import { View } from "react-native"
import { NavButton } from "./navButton"

type Props = {
    page: string
}

export const NavBar = ({page}: Props)=> {
    return(
        <>
        {page === 'home' &&
            <View className="flex-row flex-wrap justify-between items-center gap-4 px-10">
                <NavButton label="Home" active={true} route="/home"/>
                <NavButton label="Para você" route="/for-you"/>
                <NavButton label="planejamento" route="/planning"/>
            </View>
        }
        {page === 'for-you' &&
            <View className="flex-row flex-wrap justify-between items-center gap-4 px-10">
                <NavButton label="Home" route="/home"/>
                <NavButton label="Para você" active={true} route="/for-you"/>
                <NavButton label="planejamento" route="planning"/>
            </View>
        }
        {page === 'planning' &&
            <View className="flex-row flex-wrap justify-between items-center gap-4 px-10">
                <NavButton label="Home" route="/home"/>
                <NavButton label="Para você" route="/for-you"/>
                <NavButton label="planejamento" active={true} route="/planning"/>
            </View>
        }
        </>
    )
}