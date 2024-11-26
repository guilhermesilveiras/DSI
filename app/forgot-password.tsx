import { Image, SafeAreaView, ScrollView, Text, View } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome6"

export default function ForgotPassword() {
    return(
        <ScrollView>
            <SafeAreaView className="w-full p-12">
                <View className="flex-row items-center gap-4">
                    <Icon name="arrow-left" size={22} color={'#024554'}/>
                    <Text className="text-2xl text-secondary font-semibold">Esqueci a senha</Text>
                </View>
                <View className="w-full px-10">
                    <Image className="w-full" source={require('../assets/forgot-password-img.png')} resizeMode="contain"/>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}