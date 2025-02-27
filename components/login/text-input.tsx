import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputType } from "../../types/input";
import Icon from "@expo/vector-icons/FontAwesome6";
import { ErrorText } from "./error-text";
import { SuccessText } from "./success-text";

export class InputText extends Component<InputType> {

    handleShowPassword = (): void => {
        const { showPassword } = this.props;
        if (showPassword) {
            showPassword.setShowPassord(!showPassword.showPassord);
        }
    };

    render() {
        const { label, placeholder, value, setValue, hide, showPassword, error, editable, success } = this.props;

        return (
            <View className="w-full mb-8 gap-1">
                <Text className="font-bold mb-2">{label}</Text>
                <View className="flex-row items-center w-full">
                    {hide ? (
                        <View className="w-full">
                            <TextInput
                                className="border border-zinc-300 rounded-xl px-8 py-3 focus:border-secondary"
                                placeholder={placeholder}
                                value={value}
                                onChangeText={setValue}
                                secureTextEntry={!showPassword?.showPassord}
                                editable={editable ? editable : true}
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
                                className={`border border-zinc-300 rounded-xl px-8 py-3 focus:border-secondary ${editable === false ? 'text-zinc-500': 'text-black'}`}
                                placeholder={placeholder}
                                value={value}
                                onChangeText={setValue}
                                editable={editable}
                            />
                            {error && error === 'name-required' && label === 'Nome' && (
                                <ErrorText text="Nome é obrigatório" />
                            )}
                            {error && error === 'invalid-email' && (
                                <ErrorText text="Email inválido" />
                            )}
                            {error && error === 'missing-email' && (
                                <ErrorText text="Email não pode ser vazio" />
                            )}
                            {error && error === 'email-already-in-use' && value !== '' && (
                                <ErrorText text="Email já cadastrado" />
                            )}
                            {error && error === 'invalid-credential' && (
                                <ErrorText text="Email/Senha inválidos" />
                            )}
                            {error && error === '20-caracters' && (
                                <ErrorText text="digite um nome com até 20 caracteres" />
                            )}
                            {error && error === 'invalid-continent' && (
                                <ErrorText text="Continente digitado não cadastrado" />
                            )}
                            {error && error === 'invalid-country' && (
                                <ErrorText text="País digitado não cadastrado" />
                            )}
                            {success === 'success-fg-password' &&
                                <SuccessText text="Email de redefinição enviado"/>
                            }
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
