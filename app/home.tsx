import { SafeAreaView, ScrollView, Text } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/navBar";
import { Search } from "../components/home/search";
import { Sugestions } from "../components/home/suggestions";
import { MostVisited } from "../components/home/mostVisited";

export default function Home() {

    return(
        <ScrollView>
            <SafeAreaView className="pb-10 bg-background">
                    <Welcome name="fulano"/>
                    <NavBar page="home"/>
                    <Search/>
                    <Sugestions/>
                    <MostVisited/>
            </SafeAreaView>
        </ScrollView>
    )
}