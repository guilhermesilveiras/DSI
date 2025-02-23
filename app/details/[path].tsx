import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { HeaderDetail } from "../../components/details/header";
import { Title } from "../../components/details/title";
import { Description } from "../../components/details/description";
import { Bar } from "../../components/details/bar";
import { Widget } from "../../components/details/widget";
import { Prices } from "../../components/details/prices";
import { Button } from "../../components/details/button";
import { CardType } from "../../types/card";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const CityDetails = () => {
    const { path } = useLocalSearchParams();
    const [item, setItem] = useState<CardType | undefined>(undefined);

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchCityDetails = async () => {
            try {
                if (!path) return;
                const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/${path}`);
                setItem(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da cidade:", error);
            }
        };

        fetchCityDetails();
    }, [path]);

    const handleBackButton = (): void => {
        router.back();
    };

    const handlePlan = async (): Promise<void> => {
        if (!user || !item) return;

        try {
            // Criando um ID único para cada viagem
            const tripRef = doc(collection(db, `travelers/${user.email}/trips`));
            const tripId = tripRef.id;
            await setDoc(tripRef, {
                tripId,
                city: item.cityPt,
                dates: {},
            });
            router.push({
                pathname: "/planning/[city]/[tripId]",
                params: { city: item.cityPt, tripId }
            });
        } catch (error) {
            console.error("Erro ao criar a viagem:", error);
        }
    };

    const handleShowLocation = () => {
        router.push({
            pathname: "/map/[path]",
            params: { path: item?.id }
        });
    };

    return (
        <ScrollView>
            <HeaderDetail
                img={item?.img || ""}
                city={item?.cityPt || ""}
                handleBack={handleBackButton}
            />
            <View className="w-full h-full px-8 py-12 bg-zinc-100 -mt-12 rounded-t-[50px]">
                <Title label="Descrição" />
                <Description label={item?.description || "Sem descrição disponível."} />
                <Bar />
                <Title label="Gastos aproximados por refeição:" />
                <View className="w-full flex-row justify-center gap-8 mb-4">
                    <Widget label={`U$ ${item?.prices?.localFood.toFixed(2) || "0.00"}`} />
                    <Widget label={`U$ ${item?.prices?.fastFood.toFixed(2) || "0.00"}`} />
                </View>
                <View className="hidden invisible">
                    <Title label="Preços mais pesquisados:" />
                    <Prices />
                </View>
                    <View className="mt-16 gap-5">
                        <Button label={`Ver localização de ${item?.cityPt}`} handleAction={handleShowLocation} />
                        <Button label={`Planejar viagem para ${item?.cityPt}`} handleAction={handlePlan} />
                    </View>
            </View>
        </ScrollView>
    );
};

export default CityDetails;
