import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { PlanningCalendar } from "../../../components/planning/calendar";
import { BackHeader } from "../../../components/main/back-header";
import { router, useLocalSearchParams } from "expo-router";
import { data } from "../../../data/temp";

interface Item {
    id: string;
    img: string;
    country?: string;
    city: string;
}
export default function Teste(){


    const { city, travelId } = useLocalSearchParams();

    const [item, setItem] = useState<Item | undefined>(undefined);
    
    useEffect(() => {
            // Quando o parâmetro 'path' mudar, buscamos o item correspondente
            if (city) {
                const foundItem = data.find((i) => i.city === city);
                setItem(foundItem);
            }
        }, [city]);
    
    const handleBackButton = ()=> {
        router.back()
    }

    return(
        <SafeAreaView className="flex-1 bg-background">
            <BackHeader mode="primary" city={item?.city} handleBack={handleBackButton}/>
            <PlanningCalendar cityId={item?.id} path={travelId}/>
        </SafeAreaView>
    )
}