import { Image, Text, View } from "react-native"
import { InputText } from "../login/input-text"
import { ButtonInput } from "../login/button"

type Props = {
    email: string
    setEmail: (s: string)=> void
    handlePress: ()=> void
}

export const Body = ({email, setEmail, handlePress}: Props)=> {
    return(
        <View className="w-full h-full justify-center items-center">
            <Image
                className="h-96 w-80"
                source={require("../../assets/forgot-password-img.png")}
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
            <ButtonInput onPress={handlePress} label="Confirmar Email"/>
        </View>
    )
}