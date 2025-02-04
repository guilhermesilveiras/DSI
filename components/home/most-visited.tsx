import React, { Component } from "react";
import { View } from "react-native";
import { SmallCard } from "../main/small-card";
import { Title } from "../main/title";
import { data } from "../../data/temp";

interface Item {
    id: string;
    city: string;
    country: string;
    img: string;
}

export class MostVisited extends Component {
    render() {
        const dataTemp: Item[] = data.filter(
            (item) => parseInt(item.id) > 2 && parseInt(item.id) < 7
        );

        return (
            <View className="w-full mt-10 px-12">
                <Title label="Destinos populares" />
                <View className="flex-row gap-5 flex-wrap">
                    {dataTemp.map((item) => (
                        <SmallCard
                            key={item.id}
                            country={item.country}
                            id={item.id}
                            city={item.city}
                            img={item.img}
                        />
                    ))}
                </View>
            </View>
        );
    }
}
