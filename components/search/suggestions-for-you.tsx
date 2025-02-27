import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { CityType } from "../../types/city";

interface State {
    dataTemp: CityType[];
}

export class SugestionsForYou extends Component<{}, State> {

    render() {
        const { dataTemp } = this.state;

        return (
            <FlatList
                data={dataTemp}
                renderItem={({ item }) => (
                    <View></View>
                )}
                keyExtractor={(item) => item.id}
                horizontal={true}
                className="ml-8 pb-2"
                showsHorizontalScrollIndicator={false}
            />
        );
    }
}
