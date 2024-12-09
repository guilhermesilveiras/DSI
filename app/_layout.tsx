import { Stack } from "expo-router";
import '../global.css'
import { ScreenStack } from "react-native-screens";

export default function Layout() {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="prelogin"/>
            <Stack.Screen name="index"/>
            <Stack.Screen name="cadastro"/>
            <Stack.Screen name="forgot-password"/>
            <Stack.Screen name='home'/>
        </Stack>
    )
}