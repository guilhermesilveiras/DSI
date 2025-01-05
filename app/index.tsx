import React, { Component } from "react";
import { View, Image, StatusBar } from "react-native";
import { router } from "expo-router";

interface State {
    timer: NodeJS.Timeout | null;
}

class PreLogin extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            timer: null,
        };
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            router.replace("/sign-in");
        }, 2500);
        this.setState({ timer });
    }

    componentWillUnmount() {
        const { timer } = this.state;
        if (timer) {
            clearTimeout(timer);
        }
    }

    render() {
        return (
            <View className="flex-1 bg-[#002932] justify-center items-center">
                <StatusBar barStyle="light-content" backgroundColor="#002932" />
                <Image
                    source={require('../assets/light-logo.png')}
                    className="w-48 h-48"
                    resizeMode="contain"
                />
            </View>
        );
    }
}

export default PreLogin;
