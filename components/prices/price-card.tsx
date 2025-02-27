import { Text, TouchableOpacity, View } from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
    label: string
    price: number | undefined
    icon: any
    count: number
    setCount: (n:number)=> void
    total: number
    setTotal: (n:number)=> void
}
export const PriceCard = ({label, price, icon, count, setCount, total, setTotal}: Props)=> {

    const handleIncrease = ()=> {
        if (price) {
            setCount(count + 1)
            setTotal(total + price)
        }
    }

    const handleDecrease = ()=> {
        if (count > 0 && price) {
            setCount(count - 1)
            setTotal(total - price)
        }
    }
    return(
        <View className="px-5 py-5 mx-6 flex-row items-center justify-between gap-6 bg-white rounded-xl">
            <View className="flex-row gap-6">
                <View className="w-10 h-10 bg-secondary rounded-lg items-center justify-center">
                    <Icon name={icon} size={20} color={"white"} />
                </View>
                <View>
                    <Text className="font-semibold">
                        {label}
                    </Text>
                    <Text className="text-sm text-zinc-400 font-semibold">
                        U$ {price}
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center gap-2">
                <TouchableOpacity onPress={handleDecrease} className="px-1 py-1">
                    <Icon name="minus" size={14} color={"#024554"} />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">
                    {count}
                </Text>
                <TouchableOpacity onPress={handleIncrease} className="px-1 py-1">
                    <Icon name="plus" size={14} color={"#024554"} />    
                </TouchableOpacity>
            </View>
        </View>
    )
}