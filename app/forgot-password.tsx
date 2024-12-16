import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import { InputText } from "../components/login/inputText";
import { ButtonInput } from "../components/login/button";
import { router } from "expo-router";

export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    
    const handleBackButton = ()=> {
        router.navigate('/')
    }

    return (
        <ScrollView>
            <SafeAreaView className="w-full py-12 px-8 bg-background">
                <View className="flex-row items-center gap-4">
                    <Pressable onPress={handleBackButton}>
                        <Icon name="arrow-left" size={22} color={"#024554"} />
                    </Pressable>
                    <Text className="text-2xl text-secondary font-semibold">
                        Esqueci a senha
                    </Text>
                </View>
                <View className="w-full h-full justify-center items-center">
                    <Image
                        className="h-96 w-80"
                        source={require("../assets/forgot-password-img.png")}
                        resizeMode="contain"
                    />
                    <Text className="text-3xl font-semibold text-center text-secondary">
                        Esqueceu a senha?
                    </Text>
                    <Text className="text-lg font-semibold text-center text-secondary mt-6 mb-10">
                        Confirme seu e-mail para receber o código de confirmação
                    </Text>
                    <InputText
                        label="Endereço de email"
                        placeholder="Endereço de email"
                        value={email}
                        setValue={e=> setEmail(e)}
                        />
                    <ButtonInput route="/" label="Confirmar Email"/>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}