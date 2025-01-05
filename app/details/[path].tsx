import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router"; // Importa o hook
import { data } from "../../data/temp";
import { HeaderDetail } from "../../components/details/header";
import { Title } from "../../components/details/title";
import { Description } from "../../components/details/description";
import { Bar } from "../../components/details/bar";
import { Widget } from "../../components/details/widget";
import { Prices } from "../../components/details/prices";
import { Button } from "../../components/details/button";

interface Item {
    id: string;
    img: string;
    country?: string;
    city: string;
}

const Details = () => {
    const { path } = useLocalSearchParams(); // Usa o hook para acessar os parâmetros da URL

    const [item, setItem] = useState<Item | undefined>(undefined);

    useEffect(() => {
        // Quando o parâmetro 'path' mudar, buscamos o item correspondente
        if (path) {
            const foundItem = data.find((i) => i.id === path);
            setItem(foundItem);
        }
    }, [path]);

    const handleBackButton = (): void => {
        router.back();
    };

    const handlePlan = (): void => {
        // Função a ser implementada
    };

    return (
        <ScrollView>
            <HeaderDetail
                img={item?.img || ""}
                city={item?.city || ""}
                handleBack={handleBackButton}
            />
            <View className="w-full h-full px-8 py-12 bg-zinc-100 -mt-12 rounded-t-[50px]">
                <Title label="Descrição" />
                <Description label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                <Bar />
                <Title label="Gastos aproximados por dia:" />
                <View className="w-full flex-row justify-center gap-8 mb-4">
                    <Widget label="U$ 78,83" />
                    <Widget label="$$$" />
                </View>
                <Title label="Preços mais pesquisados" />
                <Prices />
                <Button city={item?.city || ""} handleAction={handlePlan} />
            </View>
        </ScrollView>
    );
};

export default Details;
