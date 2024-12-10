import { SafeAreaView, ScrollView } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/navBar";
import { TravelList } from "../components/planning/travelList";

export default function Planning() {
    return(
        <ScrollView>
            <SafeAreaView className="pb-10 bg-background">
                    <Welcome name="fulano"/>
                    <NavBar page="planning"/>
                    <TravelList/>
            </SafeAreaView>
        </ScrollView>
    )
}