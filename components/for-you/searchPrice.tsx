import { Pressable, Text, TextInput, View } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome5"
import { useState } from "react"


export const SearchPrice = ()=> {

    const [price, setPrice] = useState('')
    const handlePress = ()=> {

    }

    return(
        <View className="w-full mb-8 px-10">
            <Text className="font-bold mb-2"></Text>
            <Text className="text-zinc-500 ml-4">Orçamento definido:</Text>
            <View className="flex-row items-center w-full">
            <TextInput
                className="border w-full bg-zinc-200 border-zinc-300 rounded-full px-8 focus:border-secondary"
                placeholder="Orçamento em USD"
                value={`U$ ${price}`}
                onChangeText={(text) => {
                    // Filtra apenas números
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setPrice(numericValue);
                }}
                keyboardType="numeric" // Garante que o teclado numérico será exibido
            />

                    <Pressable 
                        className="w-10 h-10 -ml-10 rounded-full justify-center items-center"
                        onPress={handlePress}    
                    >
                        <Icon name="search-dollar" size={16}/>
                    </Pressable>
            </View>
        </View>
    )
}