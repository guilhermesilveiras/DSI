import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { BigCard } from "../main/big-card";
import { CardType } from "../../types/card";
import { NoContent } from "../trips/no-content";

interface Props {
    searchedCities: CardType[];
    isLoading: boolean;
}

export const CityList: React.FC<Props> = ({ searchedCities, isLoading }) => {
    const [initialState, setInitialState] = useState(true);

    useEffect(() => {
        if (searchedCities.length > 0 || isLoading) {
            setInitialState(false);
        }
    }, [searchedCities, isLoading]);

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
};
