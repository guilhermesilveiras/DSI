import React from "react";
import { View } from "react-native";
import { Description } from "./description";
import { CardHeader } from "./card-header";

interface TravelCardProps {
    city: string;
    name: string;
    price: string;
    status: string;
    dateRange: string;
}

export class TravelCard extends React.Component<TravelCardProps> {
    render() {
        const { city, name, price, status, dateRange } = this.props;

        return (
            <View className="bg-zinc-200 rounded-2xl p-4 border border-tertiary">
                <CardHeader city={city} name={name} price={price} />

                <View className="justify-end items-end mt-5">
                    <Description label={status} />
                    <Description label={dateRange} />
                </View>
            </View>
        );
    }
}
