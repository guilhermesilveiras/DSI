import { FlatList } from "react-native"
import { BigCard } from "../main/bigCard"
import { data } from "../../data/temp"

export const Sugestions = ()=> {
    
    const dataTemp = data.filter((item)=> parseInt(item.id) < 3)
    
    return(
        <FlatList
            data={dataTemp}
            renderItem={({item})=> <BigCard id={item.id} city={item.city} country={item.country} img={item.img}/>}
            keyExtractor={(item)=> item.id}
            horizontal={true}
            className="ml-8 pb-2"
            showsHorizontalScrollIndicator={false}
        />
    )
}