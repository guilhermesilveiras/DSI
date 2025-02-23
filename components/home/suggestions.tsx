import React, { Component } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { SmallCard } from "../main/small-card";
import { Title } from "../main/title";
import axios from "axios";
import { CardType } from "../../types/card";

interface State {
    data: CardType[];
    loading: boolean;
}

export class Sugestions extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get("https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities");
            const filteredData = response.data.filter((item: CardType) => parseInt(item.id) > 2 && parseInt(item.id) < 7);
            this.setState({ data: filteredData, loading: false });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as sugestões.");
            this.setState({ loading: false });
        }
    }

    render() {
        const { data, loading } = this.state;

        return (
            <View className="w-full mt-10 px-8">
                <Title label="Sugestões" />
                {loading ? (
                    <ActivityIndicator size="large" color="#024554" />
                ) : (
                    <View className="flex-row gap-5 flex-wrap">
                        {data.map((item) => (
                            <SmallCard
                                key={item.id}
                                id={item.id}
                                city={item.city}
                                cityPt={item.cityPt}
                                country={item.country}
                                continent={item.continent}
                                prices={item.prices}
                                popular={item.popular}
                                subRegion={item.subRegion}
                                description={item.description}
                                location={{
                                    latitude: item.location.latitude,
                                    longitude: item.location.longitude,
                                }}
                                img={item.img}
                            />
                        ))}
                    </View>
                )}
            </View>
        );
    }
}
