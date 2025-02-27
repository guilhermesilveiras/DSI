import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { SmallCard } from "../main/small-card";
import { Title } from "../main/title";
import { CityType } from "../../types/city";
import { NoContent } from "../trips/no-content";
import { router } from "expo-router";
import { fetchSuggestions } from "../../services/api";

interface State {
    data: CityType[];
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

    componentDidMount() {
        fetchSuggestions({
            setData: (data) => this.setState({ data }),
            setLoading: (loading) => this.setState({ loading }),
        });
    }

    handleProfile() {
        router.navigate('/profile')
    }

    render() {
        const { data, loading } = this.state
        return (
            <View className="w-full mt-10 px-8">
                <Title label="Sugestões Personalizadas" />
                {loading ? (
                    <ActivityIndicator size="large" color="#024554" />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SmallCard
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
                        )}
                        ListEmptyComponent={() => (
                            <NoContent label="nenhuma preferência cadastrada no perfil" icon="earth-off" handlePress={this.handleProfile}/>
                        )}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        );
    }
}
