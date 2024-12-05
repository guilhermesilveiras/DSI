import { Pressable, Text, TextInput, View } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome5"
import { useState } from "react"


export const Search = ()=> {

    const [location, setLocation] = useState('')
    const handlePress = ()=> {

    }

    return(
        <View className="w-full mb-8 px-10">
            <Text className="font-bold mb-2"></Text>
            <View className="flex-row items-center w-full">
                <TextInput
                    className="border w-full border-zinc-300 rounded-full px-8 focus:border-secondary"
                    placeholder='Para onde você quer viajar?'
                    value={location}
                    onChangeText={e=> setLocation(e)}
                />
                    <Pressable 
                        className="w-10 h-10 -ml-10 rounded-full justify-center items-center"
                        onPress={handlePress}    
                    >
                        <Icon name="search-location" size={16}/>
                    </Pressable>
            </View>
        </View>
    )
}