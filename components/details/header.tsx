import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import React from "react";
import { BackHeader } from "../main/back-header";

interface HeaderDetailProps {
    img: string | undefined;
    city: string | undefined;
    handleBack: () => void;
}

export class HeaderDetail extends React.Component<HeaderDetailProps> {
    render() {
        const { img, city, handleBack } = this.props;

        return (
            <ImageBackground source={{ uri: img }} className="w-full h-80">
                <LinearGradient
                    colors={['#0007', '#0000']}
                    className="w-full h-full"
                >
                    <BackHeader mode="white" city={city} handleBack={handleBack}/>
                </LinearGradient>
            </ImageBackground>
        );
    }
}
