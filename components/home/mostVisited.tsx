import { FlatList, Text, View } from "react-native"
import { SmallCard } from "./smallCard"
import { SmallCardType } from "../../types/smallCardType"

export const MostVisited = ()=> {

    const data:SmallCardType[] = [
        {
            id: '1',
            city: 'Tokyo',
            img: 'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D'
        },
        {
            id: '2',
            city: 'Bangkok',
            img: 'https://quintessentially.com/assets/noted/Header_2023-04-12-154210_sigz.webp'
        },
        {
            id: '3',
            city: 'Jacarta',
            img: 'https://i0.wp.com/mytravelation.com/wp-content/uploads/2023/11/Jakarta.jpeg'
        },
        {
            id: '4',
            city: 'Singapura',
            img: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/542000/542607-singapore.jpg'
        },
    ]

    return(
        <View className="w-full mt-10 px-12">
            <Text className="text-2xl  text-tertiary font-semibold mb-6">
                Destinos populares
            </Text>
            <View className="flex-row gap-5 flex-wrap">
                {data.map((item)=> (
                    <SmallCard key={item.id} id={item.id} city={item.city} img={item.img}/>
                ))}
            </View>
        </View>
    )
}