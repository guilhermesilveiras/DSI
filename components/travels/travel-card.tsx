import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { CardHeader } from "./card-header";

interface TravelCardProps {
    id: string;
    city: string;
    price: string;
}

export class TravelCard extends React.Component<TravelCardProps> {
    handlePress = () => {
        const { id, city } = this.props;
        router.push(`/planning/${city}/${id}`);
    };

    render() {
        const { city, price } = this.props;

        return (
            <TouchableOpacity
                className="bg-secondary rounded-2xl px-4 py-8 mb-6"
                onPress={this.handlePress}
            >
                <CardHeader city={city} price={price} />
            </TouchableOpacity>
        );
    }
}
