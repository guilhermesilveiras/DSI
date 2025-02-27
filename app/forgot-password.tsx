import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { router } from "expo-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Header } from "../components/forgot-passowrd/header";
import { Body } from "../components/forgot-passowrd/body";

interface ForgotPasswordState {
    email: string;
    error: string;
    success: string
}

class ForgotPassword extends Component<{}, ForgotPasswordState> {
    private auth = getAuth();

    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            error: "",
            success: ""
        };
    }

    handleBackButton = (): void => {
        router.navigate("/sign-in");
    };

    handlePress = async (): Promise<void> => {
        const { email } = this.state;

        if (!email) {
            this.setState({error: "missing-email"})
            return;
        }

        try {
            await sendPasswordResetEmail(this.auth, email);
            this.setState({error: ''})
            this.setState({success: 'success-fg-password'})
        } catch (error) {
            this.setState({error: 'invalid-email'})
        }
    };

    setEmail = (email: string): void => {
        this.setState({ email });
    };

    render() {
        const { email, error, success } = this.state;

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
                        error={error}
                        success={success}
                    />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default ForgotPassword;
