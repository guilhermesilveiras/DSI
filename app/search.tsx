import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NavBar } from "../components/main/nav-bar";
import { Welcome } from "../components/main/welcome";
import { SearchCity } from "../components/search/search-city";
import { CityList } from "../components/search/other-routes";
import { Header } from "../components/main/header";
import { CardType } from "../types/card";

const Search: React.FC = () => {
    const [searchedCities, setSearchedCities] = useState<CardType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <SafeAreaView className="w-full h-full bg-background mb-3">
            <View className="h-full">
                <Header />
                <Welcome />
                <NavBar page="search" />
                <SearchCity 
                    searchedCities={searchedCities} 
                    setSearchedCities={setSearchedCities} 
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <CityList 
                    searchedCities={searchedCities} 
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

export default Search;
