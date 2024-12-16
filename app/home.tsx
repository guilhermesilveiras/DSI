import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/navBar";
import { Search } from "../components/home/search";
import { Sugestions } from "../components/home/suggestions";
import { MostVisited } from "../components/home/mostVisited";
import Icon from "@expo/vector-icons/FontAwesome6";
import { Header } from "../components/main/header";

export default function Home() {

    return(
        <ScrollView>
            <SafeAreaView className="pb-10 bg-background">
                <Header/>
                <Welcome name="fulano"/>
                <NavBar page="home"/>
                <Search/>
                <Sugestions/>
                <MostVisited/>
            </SafeAreaView>
        </ScrollView>
    )
}