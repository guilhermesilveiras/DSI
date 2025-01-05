import React, { Component } from "react";
import { FlatList } from "react-native";
import { BigCard } from "../main/big-card";
import { data } from "../../data/temp";

interface Item {
    id: string;
    city: string;
    country: string;
    img: string;
}

interface State {
    dataTemp: Item[];
}

export class SugestionsForYou extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        // Filtra os dados com id > 6
        this.state = {
            dataTemp: data.filter((item) => parseInt(item.id) > 6),
        };
    }

    render() {
        const { dataTemp } = this.state;

        return (
            <FlatList
                data={dataTemp}
                renderItem={({ item }) => (
                    <BigCard
                        id={item.id}
                        city={item.city}
                        country={item.country}
                        img={item.img}
                    />
                )}
                keyExtractor={(item) => item.id}
                horizontal={true}
                className="ml-8 pb-2"
                showsHorizontalScrollIndicator={false}
            />
        );
    }
}
