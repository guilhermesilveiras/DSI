import { View } from "react-native"
import { Description } from "./description"
import { CardHeader } from "./card-header"

export const TravelCard = ()=> {
    return(
        <View className="bg-zinc-200 rounded-2xl p-4 border border-tertiary">
            <CardHeader city="Roma" name="Gabriela Kellyane" price="3.278"/>

            <View className="justify-end items-end mt-5">
                <Description label="Realizada"/>
                <Description label="1 mai 2024 - 5 mai 2024"/>
            </View>
        </View>
    )
}