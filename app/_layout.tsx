import { Stack } from "expo-router";
import '../global.css'

export default function Layout() {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="sign-in"/>
            <Stack.Screen name="sign-uo"/>
            <Stack.Screen name="forgot-password"/>
            <Stack.Screen name='home'/>
            <Stack.Screen name="for-you"/>
            <Stack.Screen name="planning"/>
            <Stack.Screen name="wish-list"/>
        </Stack>
    )
}