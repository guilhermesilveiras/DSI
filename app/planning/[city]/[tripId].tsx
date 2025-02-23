import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { PlanningCalendar } from "../../../components/planning/calendar";
import { BackHeader } from "../../../components/main/back-header";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { CardType } from "../../../types/card";

export default function Planning() {
    const { city, tripId } = useLocalSearchParams();
    const [item, setItem] = useState<CardType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                if (city) {
                    const response = await axios.get(
                        `https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/name/${city}`
                    );
                    if (response.data.length > 0) {
                        setItem(response.data[0]); // Pega a primeira cidade correspondente
                    } else {
                        Alert.alert("Erro", "Cidade não encontrada na API.");
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar cidade:", error);
                Alert.alert("Erro", "Não foi possível carregar os dados da cidade.");
            } finally {
                setLoading(false);
            }
        };

        fetchCity();
    }, [city]);

    const handleBackButton = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <>
                    <BackHeader mode="primary" city={item?.cityPt} handleBack={handleBackButton} />
                    <PlanningCalendar cityId={item?.id} path={tripId} />
                </>
            )}
        </SafeAreaView>
    );
}
