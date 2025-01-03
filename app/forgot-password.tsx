import { SafeAreaView, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Header } from "../components/forgot-passowrd/header";
import { Body } from "../components/forgot-passowrd/body";

export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    
    const handleBackButton = ()=> {
        router.navigate('/sign-in')
    }

    const handlePress = ()=> {
        
    }

    return (
        <ScrollView>
            <SafeAreaView className="w-full py-12 px-8 bg-background">
                <Header 
                    label="Esqueci a senha" 
                    handleBack={handleBackButton}
                />
                <Body
                    email={email} 
                    setEmail={setEmail} 
                    handlePress={handlePress}
                />
            </SafeAreaView>
        </ScrollView>
    );
}