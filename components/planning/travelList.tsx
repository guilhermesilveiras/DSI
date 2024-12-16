import { View } from "react-native"
import { Title } from "../main/title"
import { TravelCard } from "./travelCard"

export const TravelList = ()=> {
    return(
        <View className="p-10">
            <Title label="Viagens"/>
            <TravelCard/>
        </View>
    )
}