import { useState } from "react";
import { Image, SafeAreaViewBase, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/login/input";
import { ButtonInput } from "../components/login/button";

export default function Index() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <SafeAreaView className="w-full items-center px-12">
            <Image
                className="m-8 h-52 w-52"
                source={require('../assets/dark-logo.png')}
                resizeMode="contain"
            />
            <Text className="text-3xl font-semibold mb-16 text-secondary">Entre na sua conta</Text>
            <Input
                label="Endereço de email"
                placeholder="Endereço de email"
                value={email}
                setValue={e=> setEmail(e)}
            />
            <Input
                label="Senha"
                placeholder="Senha"
                value={password}
                setValue={e=> setPassword(e)}
            />
            <ButtonInput/>
        </SafeAreaView>
    )
}