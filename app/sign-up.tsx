import React, { Component } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputText } from "../components/login/text-input";
import { ButtonInput } from "../components/login/button";
import { router } from "expo-router";
import { LoginNav } from "../components/login/login-nav";
import { handleCreateUser } from "../services/sign-up";

interface SignUpState {
    email: string;
    password: string;
    passwordConfirmation: string;
    name: string;
    showPassword: boolean;
    showPasswordConfirmation: boolean;
    errorMessage: string;
}

class SignUp extends Component<{}, SignUpState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirmation: "",
            name: "",
            showPassword: false,
            showPasswordConfirmation: false,
            errorMessage: "",
        };
    }

    handleInputChange = (field: keyof SignUpState, value: string | boolean) => {
        this.setState({
            ...this.state,
            [field]: value,
        });
    };

    handleSignIn = () => {
        router.navigate("/sign-in");
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
                        Crie sua conta
                    </Text>
                    <InputText
                        label="Nome"
                        placeholder="Nome"
                        value={this.state.name}
                        setValue={(e) => this.handleInputChange("name", e)}
                        error={this.state.errorMessage === "name-required" ? "name-required" : ""}
                    />
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
                                this.handleInputChange("showPassword", value),
                        }}
                        setValue={(e) => this.handleInputChange("password", e)}
                        error={this.state.errorMessage}
                    />
                    <InputText
                        label="Confirme a Senha"
                        placeholder="Senha"
                        value={this.state.passwordConfirmation}
                        hide={true}
                        setValue={(e) => this.handleInputChange("passwordConfirmation", e)}
                        error={this.state.errorMessage === "password-unmatch" ? "password-unmatch" : ""}
                        showPassword={{
                            showPassord: this.state.showPasswordConfirmation,
                            setShowPassord: (value: boolean) =>
                                this.handleInputChange("showPasswordConfirmation", value),
                        }}
                    />
                    <ButtonInput
                        label="Cadastre-se"
                        onPress={() =>
                            handleCreateUser({
                                email: this.state.email,
                                password: this.state.password,
                                passwordConfirmation: this.state.passwordConfirmation,
                                name: this.state.name,
                                errorMessage: this.state.errorMessage,
                                setErrorMessage: (msg: string) =>
                                    this.handleInputChange("errorMessage", msg),
                            })
                        }
                    />
                    <View className="mt-10 gap-y-4">
                        <LoginNav
                            label="Você tem uma conta?"
                            linkLabel="Volte para o login"
                            nav={this.handleSignIn}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default SignUp;
