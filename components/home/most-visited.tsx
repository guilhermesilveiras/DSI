import { View } from "react-native"
import { SmallCard } from "../main/small-card"
import { data } from "../../data/temp"
import { Title } from "../main/title"

export const MostVisited = ()=> {

    const dataTemp = data.filter((item)=>parseInt(item.id) > 2 && parseInt(item.id) < 7)

    return(
        <View className="w-full mt-10 px-12">
            <Title label="Destinos populares"/>
            <View className="flex-row gap-5 flex-wrap">
                {dataTemp.map((item)=> (
                    <SmallCard 
                        key={item.id} 
                        country={item.country} 
                        id={item.id} 
                        city={item.city} 
                        img={item.img}
                    />
                ))}
            </View>
        </View>
    )
}