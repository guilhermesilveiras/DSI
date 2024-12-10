import { SafeAreaView, ScrollView } from "react-native";
import { NavBar } from "../components/main/navBar";
import { Welcome } from "../components/main/welcome";
import { SearchPrice } from "../components/for-you/searchPrice";
import { SugestionsForYou } from "../components/for-you/suggestionsForYou";
import { OtherRoutes } from "../components/for-you/otherRoutes";

export default function ForYou () {
    return(
        <ScrollView>
            <SafeAreaView className="pb-10 bg-background">
                    <Welcome name="fulano"/>
                    <NavBar page="for-you"/>
                    <SearchPrice/>
                    <SugestionsForYou/>
                    <OtherRoutes/>
            </SafeAreaView>
        </ScrollView>
    )
}