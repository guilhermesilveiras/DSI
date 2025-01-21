import { Pressable, View } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
export const Header = ()=> {
    
    const handleListButton = ()=> {
        router.navigate('/wish-list')
    }

    const handleProfileButton = ()=> {
        router.navigate('/profile')
    }
    
    return(
        <View className="w-full flex-row items-center justify-between px-10 py-8">
            <Pressable onPress={handleListButton}>
                <Icon name="list-ul" size={24} color={"#002932"}/>
            </Pressable>
            <Pressable onPress={handleProfileButton}>
                <Icon name="user-circle" size={24} color={"#002932"} />
            </Pressable>
        </View>
    )
}