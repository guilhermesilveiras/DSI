import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { NavBar } from "../components/main/nav-bar";
import { Welcome } from "../components/main/welcome";
import { SearchPrice } from "../components/for-you/search-price";
import { SugestionsForYou } from "../components/for-you/suggestions-for-you";
import { OtherRoutes } from "../components/for-you/other-routes";
import { Header } from "../components/main/header";

class ForYou extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView className="pb-10 bg-background">
                    <Header />
                    <Welcome />
                    <NavBar page="for-you" />
                    <SearchPrice />
                    <SugestionsForYou />
                    <OtherRoutes />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default ForYou;
