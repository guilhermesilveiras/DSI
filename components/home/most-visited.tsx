import React, { Component } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { BigCard } from "../main/big-card";
import { CardType } from "../../types/card";
import { Title } from "../main/title";

interface SuggestionsState {
    dataTemp: CardType[];
    loading: boolean;
}

export class MostVisited extends Component<{}, SuggestionsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            dataTemp: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchPopularCities();
    }

    async fetchPopularCities() {
        try {
            const response = await axios.get("https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/popular");
            this.setState({ dataTemp: response.data, loading: false });
        } catch (error) {
            console.error("Erro ao buscar cidades populares:", error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { dataTemp, loading } = this.state;

        return (
            <View className="w-full mt-10 px-8 justify-center">
                <Title label="Destinos populares" />
                {loading ? (
                    <ActivityIndicator size="large" color="#024554" className="mt-5" />
                ) : (
                    <FlatList
                        data={dataTemp}
                        renderItem={({ item }) => (
                            <BigCard
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
                                    longitude: item.location.longitude
                                }}
                                img={item.img}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        className="pb-2"
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
        );
    }
}
