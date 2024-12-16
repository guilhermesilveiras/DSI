import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText } from "../components/login/inputText";
import { ButtonInput } from "../components/login/button";
import { router } from "expo-router";
import { LoginNav } from "../components/login/login-nav";

export default function Index() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setpasswordConfirmation] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setshowPasswordConfirmation] = useState(false)

    const handleSignup = ()=> {
        
    }

    const handleSignIn = () =>{
        router.navigate("/login")
    }


    return(
        <ScrollView>
            <SafeAreaView className="w-full items-center p-12 bg-background">

                <Image
                    className="m-8 h-52 w-52"
                    source={require('../assets/dark-logo.png')}
                    resizeMode="contain"
                    />
                <Text className="text-3xl font-semibold mb-16 text-secondary">Crie sua conta</Text>
                <InputText
                    label="Nome"
                    placeholder="Nome"
                    value={name}
                    setValue={e=> setName(e)}
                    />
                <InputText
                    label="Endereço de email"
                    placeholder="Endereço de email"
                    value={email}
                    setValue={e=> setEmail(e)}
                    />
                <InputText
                    label="Senha"
                    placeholder="Senha"
                    value={password}
                    hide={true}
                    showPassword={{showPassord: showPassword, setShowPassord: setShowPassword }}
                    setValue={e=> setPassword(e)}
                    />
                <InputText
                    label="Confirme a Senha"
                    placeholder="Senha"
                    value={passwordConfirmation}
                    hide={true}
                    showPassword={{showPassord: showPasswordConfirmation, setShowPassord: setshowPasswordConfirmation }}
                    setValue={e=> setpasswordConfirmation(e)}
                    />
                <ButtonInput label="Cadastre-se" onPress={handleSignup}/>
                <View className="mt-10 gap-y-4">
                    <LoginNav label="Você tem uma conta?" linkLabel="Volte para o login" nav={handleSignIn}/>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}