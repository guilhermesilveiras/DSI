import { Pressable, Text, TextInput, View } from "react-native"
import { InputType } from "../../types/input"
import Icon from "@expo/vector-icons/FontAwesome6"
import { ErrorText } from "./errorText"


export const InputText = (props: InputType)=> {

    const handleShowPassword = ()=> {
        props.showPassword?.setShowPassord(!props.showPassword.showPassord)
    }

    return(
        <View className="w-full mb-8 gap-1">
            <Text className="font-bold mb-2">{props.label}</Text>
            <View className="flex-row items-center w-full">
                {props.hide && 
                <View className="w-full">
                    <TextInput
                        className="border border-zinc-300 rounded-xl px-8 focus:border-secondary"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChangeText={props.setValue}
                        secureTextEntry={!props.showPassword?.showPassord}
                        />
                    {props.error && props.error == 'missing-password' &&
                        <ErrorText text="senha precisa ter no mínimo 6 dígitos"/>
                    }
                    {props.error && props.error == 'weak-password' &&
                        <ErrorText text="senha precisa ter no mínimo 6 dígitos"/>
                    }
                    {props.error && props.error == 'password-unmatch' &&
                        <ErrorText text="confirmação de senha errada"/>
                    }
                    {props.error && props.error == 'invalid-credential' &&
                        <ErrorText text="Email/Senha inválidos"/>
                    }
                </View>
                }
                {!props.hide &&
                <View className="w-full">
                    <TextInput
                        className="border border-zinc-300 rounded-xl px-8 focus:border-secondary"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChangeText={props.setValue}
                        />
                        {props.error && props.error == 'invalid-email' &&
                            <ErrorText text="Email inválido"/>
                        }
                        {props.error && props.error == 'missing-email' &&
                            <ErrorText text="Email inválido"/>
                        }
                        {props.error && props.error == 'email-already-in-use' && props.value !== '' &&
                            <ErrorText text="Email já cadastrado"/>
                        }
                        {props.error && props.error == 'invalid-credential' &&
                            <ErrorText text="Email/Senha inválidos"/>
                        }
                </View>
                }
                {props.showPassword && props.showPassword.showPassord &&
                    <Pressable className="-ml-10" onPress={handleShowPassword}>
                        <Icon name="eye-slash" size={16}/>
                    </Pressable>
                }
                {props.showPassword && !props.showPassword.showPassord &&
                    <Pressable className="-ml-10" onPress={handleShowPassword}>
                        <Icon name="eye" size={16}/>
                    </Pressable>
                }
            </View>
        </View>
    )
}