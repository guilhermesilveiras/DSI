import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText } from "../components/login/input-text";
import { ButtonInput } from "../components/login/button";
import { router } from "expo-router";
import { LoginNav } from "../components/login/login-nav";
import { handleSignIn } from "../services/login";

// Definindo o tipo de estado explicitamente
interface State {
    email: string;
    password: string;
    showPassword: boolean;
    errorMessage: string;
}

class SignIn extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false,
            errorMessage: "",
        };
    }

    // Função para atualizar o estado com a chave correta
    handleInputChange = (field: keyof State, value: string) => {
        this.setState({
            ...this.state,
            [field]: value,
        });
    };

    handleSignUp = () => {
        router.navigate("/sign-up");
    };

    handleForgotPassword = () => {
        router.navigate("/forgot-password");
    };

    render() {
        return (
            <ScrollView>
                <SafeAreaView className="w-full items-center p-12 bg-background">
                    <Image
                        className="m-8 h-52 w-52"
                        source={require("../assets/dark-logo.png")}
                        resizeMode="contain"
                    />
                    <Text className="text-3xl font-semibold mb-16 text-secondary">
                        Entre na sua conta
                    </Text>
                    <InputText
                        label="Endereço de email"
                        placeholder="Endereço de email"
                        value={this.state.email}
                        setValue={(e) => this.handleInputChange("email", e)}
                        error={this.state.errorMessage}
                    />
                    <InputText
                        label="Senha"
                        placeholder="Senha"
                        value={this.state.password}
                        hide={true}
                        showPassword={{
                            showPassord: this.state.showPassword,
                            setShowPassord: (value: boolean) =>
                                this.setState({
                                    ...this.state,
                                    showPassword: value,
                                }),
                        }}
                        setValue={(e) => this.handleInputChange("password", e)}
                        error={this.state.errorMessage}
                    />
                    <ButtonInput
                        label="Login"
                        onPress={() =>
                            handleSignIn({
                                email: this.state.email,
                                password: this.state.password,
                                errorMessage: this.state.errorMessage,
                                setErrorMessage: (msg: string) =>
                                    this.setState({
                                        ...this.state,
                                        errorMessage: msg,
                                    }),
                            })
                        }
                    />
                    <View className="mt-10 gap-y-4">
                        <LoginNav
                            label="Você tem uma conta?"
                            linkLabel="Cadastre-se"
                            nav={this.handleSignUp}
                        />
                        <Pressable onPress={this.handleForgotPassword}>
                            <Text className="text-center text-secondary font-bold">
                                Esqueceu a Senha?
                            </Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default SignIn;
