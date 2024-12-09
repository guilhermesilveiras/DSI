import { SafeAreaView, ScrollView, Text } from "react-native";
import { Welcome } from "../components/home/welcome";
import { NavBar } from "../components/home/navBar";
import { Search } from "../components/home/search";
import { Sugestions } from "../components/home/sugestions";
import { MostVisited } from "../components/home/mostVisited";

export default function Home() {

    return(
        <ScrollView>
            <SafeAreaView className="pb-10">
                    <Welcome name="fulano"/>
                    <NavBar/>
                    <Search/>
                    <Sugestions/>
                    <MostVisited/>
            </SafeAreaView>
        </ScrollView>
    )
}