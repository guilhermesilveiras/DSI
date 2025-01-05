import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { router } from "expo-router";
import { Header } from "../components/forgot-passowrd/header";
import { Body } from "../components/forgot-passowrd/body";

interface ForgotPasswordState {
    email: string;
}

class ForgotPassword extends Component<{}, ForgotPasswordState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
        };
    }

    handleBackButton = (): void => {
        router.navigate("/sign-in");
    };

    handlePress = (): void => {
        // Implementar a lógica para envio de recuperação de senha
    };

    setEmail = (email: string): void => {
        this.setState({ email });
    };

    render() {
        const { email } = this.state;

        return (
            <ScrollView>
                <SafeAreaView className="w-full py-12 px-8 bg-background">
                    <Header
                        label="Esqueci a senha"
                        handleBack={this.handleBackButton}
                    />
                    <Body
                        email={email}
                        setEmail={this.setEmail}
                        handlePress={this.handlePress}
                    />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default ForgotPassword;
