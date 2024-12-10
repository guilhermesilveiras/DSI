import { SafeAreaView, ScrollView, Text } from "react-native";
import { Welcome } from "../components/home/welcome";
import { NavBar } from "../components/home/navBar";
import { Title } from "../components/root/title";
import { TravelList } from "../components/planning/travelList";

export default function Planning() {
    return(
        <ScrollView>
            <SafeAreaView className="pb-10">
                    <Welcome name="fulano"/>
                    <NavBar page="planning"/>
                    <TravelList/>
            </SafeAreaView>
        </ScrollView>
    )
}