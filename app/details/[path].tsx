import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { data } from "../../data/temp";
import { HeaderDetail } from "../../components/details/header";
import { Title } from "../../components/details/title";
import { Description } from "../../components/details/description";
import { Bar } from "../../components/details/bar";
import { Widget } from "../../components/details/widget";
import { Prices } from "../../components/details/prices";
import { Button } from "../../components/details/button";

// Firebase imports
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Item {
    id: string;
    img: string;
    country?: string;
    city: string;
}

const Details = () => {
    const { path } = useLocalSearchParams();
    const [item, setItem] = useState<Item | undefined>(undefined);

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (path) {
            const foundItem = data.find((i) => i.id === path);
            setItem(foundItem);
        }
    }, [path]);

    const handleBackButton = (): void => {
        router.back();
    };

    const handlePlan = async (): Promise<void> => {
        if (!user || !item) return;

        try {
            // Criando um ID único para cada viagem
            const travelRef = doc(collection(db, `travelers/${user.email}/travels`));
            const travelId = travelRef.id;

            // Criando um novo documento de viagem no Firestore
            await setDoc(travelRef, {
                travelId,
                city: item.city,
                dates: {}, // Inicializa os gastos vazios
            });
            // Redireciona para a tela de planejamento usando o nome da cidade
            router.push({
                pathname: "/planning/[city]/[travelId]",
                params: { city: item.city, travelId }
            });
        } catch (error) {
            console.error("Erro ao criar a viagem:", error);
        }
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
                <Description label="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                <Bar />
                <Title label="Gastos aproximados por dia:" />
                <View className="w-full flex-row justify-center gap-8 mb-4">
                    <Widget label="U$ 78,83" />
                    <Widget label="$$$" />
                </View>
                <Title label="Preços mais pesquisados:" />
                <Prices />
                <Button city={item?.city || ""} handleAction={handlePlan} />
            </View>
        </ScrollView>
    );
};

export default Details;
