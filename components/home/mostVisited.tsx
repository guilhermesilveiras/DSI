import { Text, View } from "react-native"
import { SmallCard } from "./smallCard"
import { data } from "../../data/temp"

export const MostVisited = ()=> {

    const dataTemp = data.filter((item)=> parseInt(item.id) > 2)

    return(
        <View className="w-full mt-10 px-12">
            <Text className="text-2xl  text-tertiary font-semibold mb-6">
                Destinos populares
            </Text>
            <View className="flex-row gap-5 flex-wrap">
                {dataTemp.map((item)=> (
                    <SmallCard key={item.id} country={item.country} id={item.id} city={item.city} img={item.img}/>
                ))}
            </View>
        </View>
    )
}