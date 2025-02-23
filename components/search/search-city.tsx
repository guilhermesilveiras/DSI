import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { CardType } from "../../types/card";

interface SearchCityProps {
    searchedCities: CardType[];
    setSearchedCities: (cities: CardType[]) => void;
    isLoading: boolean;
    setIsLoading: (b: boolean) => void;
}

export const SearchCity: React.FC<SearchCityProps> = ({ searchedCities, setSearchedCities, isLoading, setIsLoading }) => {
    const [cityName, setCityName] = useState("");

    const handleSearch = async () => {
        if (!cityName.trim()) return;

        setIsLoading(true); // Inicia o loading antes da requisição

        try {
            const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/name/${cityName}`);
            setSearchedCities(response.data);
        } catch (error) {
            console.error("Erro ao buscar cidade:", error);
            setSearchedCities([]); // Se houver erro, limpar a lista
        } finally {
            setIsLoading(false); // Finaliza o loading após a requisição
        }
    };

    return (
        <View className="w-full mb-8 px-10 mt-7">
            <View className="flex-row items-center w-full">
                <TextInput
                    className="border w-full bg-zinc-200 border-zinc-300 rounded-xl px-8 focus:border-secondary"
                    placeholder="Busque uma cidade:"
                    value={cityName}
                    onChangeText={setCityName}
                />
                <TouchableOpacity
                    className="w-10 h-10 px-2 py-2 -ml-10 rounded-full justify-center items-center"
                    onPress={handleSearch}
                    disabled={isLoading} // Bloqueia o botão durante o loading
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#024554" />
                    ) : (
                        <Icon name="search-location" size={20} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};
