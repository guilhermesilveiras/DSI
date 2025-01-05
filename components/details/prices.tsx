import React from "react";
import { View } from "react-native";
import { Widget } from "./widget";
import { WidgetType } from "../../types/widget";

interface PricesState {
    data: WidgetType[];
}

export class Prices extends React.Component<{}, PricesState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: [
                { id: '1', title: 'Refeição' },
                { id: '2', title: 'Estadia' },
                { id: '3', title: 'Transporte' },
            ],
        };
    }

    render() {
        const { data } = this.state;

        return (
            <View className="flex-row flex-wrap gap-x-8 gap-y-4 justify-center">
                {data.map((item) => (
                    <Widget key={item.id} label={item.title} />
                ))}
            </View>
        );
    }
}
