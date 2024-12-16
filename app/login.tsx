import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/login/input";
import { ButtonInput } from "../components/login/button";
import { router } from "expo-router";
import { LoginNav } from "../components/login/login-nav";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Try } from "expo-router/build/views/Try";

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = ()=> {
        router.navigate('/cadastro')
    }
    const handleForgotPassword = ()=> {
        router.navigate('/forgot-password')
    }

    const handleEmailSignIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Sucessido");
            router.replace("/home");
            } catch (error) {
                console.log("Erro ao logar:", error);
        }
    };

    return(
        <ScrollView>
            <SafeAreaView className="w-full items-center p-12">
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
                    hide={true}
                    showPassword={{showPassord: showPassword, setShowPassord: setShowPassword }}
                    setValue={e=> setPassword(e)}
                    />
                <ButtonInput label="Login" onPress={handleEmailSignIn}/>
                <View className="mt-10 gap-y-4">
                    <LoginNav label="Você tem uma conta?" linkLabel="Cadastre-se" nav={handleSignUp}/>
                    <Pressable onPress={handleForgotPassword}>
                        <Text className="text-center text-secondary font-bold">Esqueceu a Senha?</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}