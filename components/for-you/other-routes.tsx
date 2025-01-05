import React from "react";
import { View } from "react-native";
import { Title } from "../main/title";

export class OtherRoutes extends React.Component {
    render() {
        return (
            <View className="w-full mt-10 px-12">
                <Title label="Outras rotas:" />
            </View>
        );
    }
}
