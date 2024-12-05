import { FlatList } from "react-native"
import { BigCardType } from "../../types/bigCardType"
import { BigCard } from "./bigCard"

export const Sugestions = ()=> {
    
    const data:BigCardType[] = [
        {
            id: '1',
            city: 'Roma',
            country: 'Itália',
            img: 'https://blog.assistentedeviagem.com.br/wp-content/uploads/2018/12/pontos-turisticos-em-roma-5.jpg'
        },
        {
            id: '2',
            city: 'Rio de Janeiro',
            country: 'Brazil',
            img: 'https://blog.paineirascorcovado.com.br/wp-content/uploads/2024/11/Cristo-Redentor-Por-do-sol-scaled.jpg'
        },
    ]
    
    return(
        <FlatList
            data={data}
            renderItem={({item})=> <BigCard id={item.id} city={item.city} country={item.country} img={item.img}/>}
            keyExtractor={(item)=> item.id}
            horizontal={true}
            className="ml-8 pb-2"
        />
    )
}