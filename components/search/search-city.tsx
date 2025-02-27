import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { CityType } from "../../types/city";
import { fetchCityByName } from "../../services/api";

interface Props {
    searchedCities: CityType[];
    setSearchedCities: (cities: CityType[]) => void;
    isLoading: boolean;
    setIsLoading: (b: boolean) => void;
}

interface State {
    cityName: string;
}

export class SearchCity extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { cityName: "" };
    }

    handleSearch = () => {
        fetchCityByName({ 
            cityName: this.state.cityName, 
            setSearchedCities: this.props.setSearchedCities, 
            setIsLoading: this.props.setIsLoading 
        });
    };

    render() {
        const { isLoading } = this.props;
        const { cityName } = this.state;

        return (
            <View className="w-full mb-8 px-10 mt-7">
                <View className="flex-row items-center w-full">
                    <TextInput
                        className="border w-full bg-zinc-200 border-zinc-300 rounded-xl px-8 focus:border-secondary"
                        placeholder="Busque uma cidade:"
                        value={cityName}
                        onChangeText={(text) => this.setState({ cityName: text })}
                    />
                    <TouchableOpacity
                        className="w-10 h-10 px-2 py-2 -ml-10 rounded-full justify-center items-center"
                        onPress={this.handleSearch}
                        disabled={isLoading}
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
    }
}
