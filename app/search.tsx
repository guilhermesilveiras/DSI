import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { NavBar } from "../components/main/nav-bar";
import { Welcome } from "../components/main/welcome";
import { SearchCity } from "../components/search/search-city";
import { CityList } from "../components/search/other-routes";
import { Header } from "../components/main/header";
import { CityType } from "../types/city";

interface SearchState {
    searchedCities: CityType[];
    isLoading: boolean;
}

class Search extends Component<{}, SearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchedCities: [],
            isLoading: false
        };
    }

    setSearchedCities = (cities: CityType[]) => {
        this.setState({ searchedCities: cities });
    };

    setIsLoading = (loading: boolean) => {
        this.setState({ isLoading: loading });
    };

    render() {
        const { searchedCities, isLoading } = this.state;
        return (
            <SafeAreaView className="w-full h-full bg-background mb-3">
                <View className="h-full">
                    <Header />
                    <Welcome />
                    <NavBar page="search" />
                    <SearchCity 
                        searchedCities={searchedCities} 
                        setSearchedCities={this.setSearchedCities} 
                        isLoading={isLoading}
                        setIsLoading={this.setIsLoading}
                    />
                    <CityList 
                        searchedCities={searchedCities} 
                        isLoading={isLoading}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Search;