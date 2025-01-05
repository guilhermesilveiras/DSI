import React from "react";
import { View } from "react-native";
import { Title } from "../main/title";
import { TravelCard } from "./travel-card";

export class TravelList extends React.Component {
    render() {
        return (
            <View className="p-10">
                <Title label="Viagens" />
                <TravelCard
                    city="Roma"
                    name="Gabriela Kellyane"
                    price="3.278"
                    status="Realizada"
                    dateRange="1 mai 2024 - 5 mai 2024"
                />
            </View>
        );
    }
}