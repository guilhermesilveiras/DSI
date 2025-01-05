import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/nav-bar";
import { TravelList } from "../components/planning/travel-list";
import { Header } from "../components/main/header";

class Planning extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView className="pb-10 bg-background">
                    <Header />
                    <Welcome />
                    <NavBar page="planning" />
                    <TravelList />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default Planning;
