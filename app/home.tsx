import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/nav-bar";
import { Header } from "../components/main/header";
import { Sugestions } from "../components/home/suggestions";
import { MostVisited } from "../components/home/most-visited";

class Home extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView className="pb-10 bg-background">
                    <Header />
                    <Welcome />
                    <NavBar page="home" />
                    <MostVisited />
                    <Sugestions />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default Home;
