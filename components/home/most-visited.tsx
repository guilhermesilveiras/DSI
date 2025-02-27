import React, { Component } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { BigCard } from "../main/big-card";
import { CityType } from "../../types/city";
import { Title } from "../main/title";
import { fetchPopularCities } from "../../services/api";

interface SuggestionsState {
    dataTemp: CityType[];
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
        this.fetchData();
    }

    fetchData = () => {
        fetchPopularCities({
            setDataTemp: this.setDataTemp,
            setIsLoading: this.setIsLoading
        });
    };

    setDataTemp = (dataTemp: CityType[]) => {
        this.setState({ dataTemp });
    };

    setIsLoading = (loading: boolean) => {
        this.setState({ loading });
    };

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
                        className="pb-2 -ml-3"
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
        );
    }
}
