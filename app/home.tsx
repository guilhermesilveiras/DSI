import React, { Component } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/nav-bar";
import { Header } from "../components/main/header";
import { Sugestions } from "../components/home/suggestions";
import { MostVisited } from "../components/home/most-visited";

class Home extends Component {
    render() {
        const sections = ["mostVisited", "sugestions"];

        return (
            <SafeAreaView className="flex-1 bg-background">
                <FlatList
                    data={sections}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) =>
                        item === "mostVisited" ? <MostVisited /> : <Sugestions />
                    }
                    ListHeaderComponent={() => (
                        <View>
                            <Header />
                            <Welcome />
                            <NavBar page="home" />
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </SafeAreaView>
        );
    }
}

export default Home;
