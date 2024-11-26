import { Pressable, Text, TextInput, View } from "react-native"
import { InputType } from "../../types/input"
import Icon from "@expo/vector-icons/FontAwesome6"
import { useState } from "react"


export const Input = (props: InputType)=> {

    const handleShowPassword = ()=> {
        props.showPassword?.setShowPassord(!props.showPassword.showPassord)
    }

    return(
        <View className="w-full mb-8">
            <Text className="font-bold mb-2">{props.label}</Text>
            <View className="flex-row items-center w-full">
                {props.hide && 
                <TextInput
                    className="border w-full border-zinc-300 rounded-xl px-8 focus:border-secondary"
                    placeholder={props.placeholder}
                    value={props.value}
                    onChangeText={props.setValue}
                    secureTextEntry={!props.showPassword?.showPassord}
                />
                }
                {!props.hide && 
                <TextInput
                    className="border w-full border-zinc-300 rounded-xl px-8 focus:border-secondary"
                    placeholder={props.placeholder}
                    value={props.value}
                    onChangeText={props.setValue}
                />
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