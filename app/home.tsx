import React, { Component } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/nav-bar";
import { Search } from "../components/home/search";
import { Sugestions } from "../components/home/suggestions";
import { MostVisited } from "../components/home/most-visited";
import { Header } from "../components/main/header";

class Home extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView className="pb-10 bg-background">
                    <Header />
                    <Welcome />
                    <NavBar page="home" />
                    <Search />
                    <Sugestions />
                    <MostVisited />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default Home;
