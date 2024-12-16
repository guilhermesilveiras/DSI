import React, {useEffect} from "react"
import { View, Image, StatusBar } from "react-native"
import { useRouter } from "expo-router";

const PreLogin = () =>{
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/login");
        }, 2500);
        return () => clearTimeout(timer);
        }, []);

    return(
        <View className="flex-1 bg-[#002932] justify-center items-center">
            <StatusBar barStyle="light-content" backgroundColor="#002932"/>
                <Image
                source={require('../assets/light-logo.png')}
                className="w-48 h-48"
                resizeMode="contain"
                />
        </View>
    );
};

export default PreLogin;
