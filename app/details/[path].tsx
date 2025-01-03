import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { data } from "../../data/temp";
import { HeaderDetail } from "../../components/details/header";
import { Title } from "../../components/details/title";
import { Description } from "../../components/details/description";
import { Bar } from "../../components/details/bar";
import { Widget } from "../../components/details/widget";
import { Prices } from "../../components/details/prices";
import { Button } from "../../components/details/button";

export default function Details() {

    const { path } = useLocalSearchParams()
    const item = data.find((i) => i.id === path)
    const handleBackButton = () => {
        router.back()
    }

    const handlePlan = () => {

    }

    return (
        <ScrollView>
            <HeaderDetail
                img={item?.img}
                city={item?.city}
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
                <Button city={item?.city} handleAction={handlePlan} />
            </View>
        </ScrollView>
    )
}