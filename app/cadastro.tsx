import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText } from "../components/login/inputText";
import { ButtonInput } from "../components/login/button";
import { router } from "expo-router";
import { LoginNav } from "../components/login/login-nav";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { FirebaseError } from "firebase/app";

export default function Index() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setpasswordConfirmation] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setshowPasswordConfirmation] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')


    const handleCreateUser = async () => {
        try {
            if (password.split("").length > 5 && password === passwordConfirmation){
                console.log(password, passwordConfirmation, password.split("").length);
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Cadastro bem-sucedido");
                router.replace("/home");
            }
            else {
                setErrorMessage('password-unmatch')
                return
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                setErrorMessage(error.code.toString().split('/')[1])
            }else {
                console.log("Erro desconhecido:", error);
            }
        }
    };


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
                    error={errorMessage}
                    />
                <InputText
                    label="Senha"
                    placeholder="Senha"
                    value={password}
                    hide={true}
                    showPassword={{showPassord: showPassword, setShowPassord: setShowPassword }}
                    setValue={e=> setPassword(e)}
                    error={errorMessage}
                    />
                <InputText
                    label="Confirme a Senha"
                    placeholder="Senha"
                    value={passwordConfirmation}
                    hide={true}
                    showPassword={{showPassord: showPasswordConfirmation, setShowPassord: setshowPasswordConfirmation }}
                    setValue={e=> setpasswordConfirmation(e)}
                    error={errorMessage == "password-unmatch" ? "password-unmatch": ''}
                    />
                <ButtonInput label="Cadastre-se" onPress={handleCreateUser}/>
                <View className="mt-10 gap-y-4">
                    <LoginNav label="Você tem uma conta?" linkLabel="Volte para o login" nav={handleSignIn}/>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}