import { Pressable, Text, View } from "react-native"
import { NavButton } from "./navButton"

export const NavBar = ()=> {
    return(
        <View className="flex-row justify-between items-center gap-4 px-10">
            <NavButton label="Home" active={true}/>
            <NavButton label="Para você"/>
            <NavButton label="planejamento"/>
        </View>
    )
}