import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/nav-bar";
import { TravelList } from "../components/trips/trip-list";
import { Header } from "../components/main/header";

class Trips extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView className="pb-10 bg-background min-h-screen">
                    <Header />
                    <Welcome />
                    <NavBar page="travels" />
                    <TravelList />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default Trips;
