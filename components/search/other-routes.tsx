import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { BigCard } from "../main/big-card";
import { CityType } from "../../types/city";
import { NoContent } from "../trips/no-content";

interface Props {
    searchedCities: CityType[];
    isLoading: boolean;
}

interface State {
    initialState: boolean;
}

export class CityList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { initialState: true };
    }

    componentDidUpdate(prevProps: Props) {
        if (
            (this.props.searchedCities.length > 0 || this.props.isLoading) &&
            this.state.initialState
        ) {
            this.setState({ initialState: false });
        }
    }

    render() {
        const { searchedCities, isLoading } = this.props;
        const { initialState } = this.state;

        return (
            <View className="flex-1 px-10 items-center">
                {isLoading ? (
                    <ActivityIndicator size={50} color="#024554" className="mt-10" />
                ) : searchedCities.length > 0 ? (
                    <FlatList
                        data={searchedCities}
                        keyExtractor={(city) => city.id}
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
                                location={item.location}
                                img={item.img}
                            />
                        )}
                        contentContainerStyle={{ paddingBottom: 20 }} // Garante que o último item não fique cortado
                        showsVerticalScrollIndicator={false}
                    />
                ) : initialState ? (
                    <NoContent icon="airplane-search" label="Busque uma cidade" />
                ) : (
                    <NoContent icon="airplane-alert" label="Nenhuma cidade encontrada" />
                )}
            </View>
        );
    }
}
