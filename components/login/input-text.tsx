import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputType } from "../../types/input";
import Icon from "@expo/vector-icons/FontAwesome6";
import { ErrorText } from "./error-text";

export class InputText extends Component<InputType> {

    handleShowPassword = (): void => {
        const { showPassword } = this.props;
        if (showPassword) {
            showPassword.setShowPassord(!showPassword.showPassord);
        }
    };

    render() {
        const { label, placeholder, value, setValue, hide, showPassword, error } = this.props;

        return (
            <View className="w-full mb-8 gap-1">
                <Text className="font-bold mb-2">{label}</Text>
                <View className="flex-row items-center w-full">
                    {hide ? (
                        <View className="w-full">
                            <TextInput
                                className="border border-zinc-300 rounded-xl px-8 focus:border-secondary"
                                placeholder={placeholder}
                                value={value}
                                onChangeText={setValue}
                                secureTextEntry={!showPassword?.showPassord}
                            />
                            {error && error === 'missing-password' && (
                                <ErrorText text="senha precisa ter no mínimo 6 dígitos" />
                            )}
                            {error && error === 'weak-password' && (
                                <ErrorText text="senha precisa ter no mínimo 6 dígitos" />
                            )}
                            {error && error === 'password-unmatch' && (
                                <ErrorText text="confirmação de senha errada" />
                            )}
                            {error && error === 'invalid-credential' && (
                                <ErrorText text="Email/Senha inválidos" />
                            )}
                        </View>
                    ) : (
                        <View className="w-full">
                            <TextInput
                                className="border border-zinc-300 rounded-xl px-8 focus:border-secondary"
                                placeholder={placeholder}
                                value={value}
                                onChangeText={setValue}
                            />
                            {error && error === 'name-required' && label === 'Nome' && (
                                <ErrorText text="Nome é obrigatório" />
                            )}
                            {error && error === 'invalid-email' && (
                                <ErrorText text="Email inválido" />
                            )}
                            {error && error === 'missing-email' && (
                                <ErrorText text="Email inválido" />
                            )}
                            {error && error === 'email-already-in-use' && value !== '' && (
                                <ErrorText text="Email já cadastrado" />
                            )}
                            {error && error === 'invalid-credential' && (
                                <ErrorText text="Email/Senha inválidos" />
                            )}
                        </View>
                    )}
                    {showPassword && showPassword.showPassord && (
                        <TouchableOpacity className="-ml-10" onPress={this.handleShowPassword}>
                            <Icon name="eye-slash" size={16} />
                        </TouchableOpacity>
                    )}
                    {showPassword && !showPassword.showPassord && (
                        <TouchableOpacity className="-ml-10" onPress={this.handleShowPassword}>
                            <Icon name="eye" size={16} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
}
