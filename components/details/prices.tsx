import { View } from "react-native"
import { Widget } from "./widget"
import { WidgetType } from "../../types/widget"


export const Prices = ()=> {
    
    const data: WidgetType[] = [
        {
            id: '1',
            title: 'Refeição'
        },
        {
            id: '2',
            title: 'Estadia'
        },
        {
            id: '3',
            title: 'Transporte'
        },
    ]

    return(
        <View className="flex-row flex-wrap gap-x-8 gap-y-4 justify-center">
            {data.map((item)=> (
                <Widget key={item.id} label={item.title}/>
            ))}
        </View>
    )
}