import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import { PriceList } from "../../../../components/prices/price-list";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { CardType } from "../../../../types/card";
import { BackHeader } from "../../../../components/main/back-header";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Prices() {
    const { cityId, tripId, date } = useLocalSearchParams();
    const [item, setItem] = useState<CardType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [fastFood, setFastFood] = useState<number>(0);
    const [localFood, setLocalFood] = useState<number>(0);
    const [taxiTax, setTaxiTax] = useState<number>(0);
    const [busTicket, setBusTicket] = useState<number>(0);
    const [uberTax, setUberTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const formattedDate = String(date) ?? "";

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                if (cityId) {
                    const response = await axios.get(
                        `https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/${cityId}`
                    );
                    if (response.data) {
                        setItem(response.data);
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

        fetchCityData();
    }, [cityId]);

    useEffect(() => {
        setTotal(
            (item?.prices?.fastFood ? fastFood * item.prices.fastFood : 0) +
            (item?.prices?.localFood ? localFood * item.prices.localFood : 0) +
            (item?.prices?.taxiTax ? taxiTax * item.prices.taxiTax : 0) +
            (item?.prices?.uberTax ? uberTax * item.prices.uberTax : 0) +
            (item?.prices?.busTicket ? busTicket * item.prices.busTicket : 0)
        );
    }, [fastFood, localFood, taxiTax, uberTax, busTicket, item]);

    useEffect(() => {
        if (!user || !tripId || !formattedDate) return;

        const fetchData = async () => {
            try {
                const tripRef = doc(db, `travelers/${user.email}/trips/${tripId}`);
                const tripDoc = await getDoc(tripRef);

                if (tripDoc.exists()) {
                    const tripData = tripDoc.data();
                    const existingData = tripData.dates?.[formattedDate] || {};

                    setFastFood(existingData.fastFood ?? 0);
                    setLocalFood(existingData.localFood ?? 0);
                    setTaxiTax(existingData.taxiTax ?? 0);
                    setUberTax(existingData.uberTax ?? 0);
                    setBusTicket(existingData.busTicket ?? 0);
                    setTotal(existingData.total ?? 0);
                }
            } catch (error: any) {
                alert("Erro ao carregar os valores: " + error.message);
            }
        };

        fetchData();
    }, [user, tripId, formattedDate]);

    const handleAddDayPlan = async () => {
        if (!user || !tripId || !formattedDate) {
            alert("Erro: Usuário, viagem ou data não encontrados.");
            return;
        }

        try {
            const tripRef = doc(db, `travelers/${user.email}/trips/${tripId}`);
            const tripDoc = await getDoc(tripRef);

            if (!tripDoc.exists()) {
                alert("Erro: Viagem não encontrada.");
                return;
            }

            const tripData = tripDoc.data();
            const updatedDates = {
                ...tripData.dates,
                [formattedDate]: {
                    fastFood,
                    localFood,
                    taxiTax,
                    uberTax,
                    busTicket,
                    total,
                },
            };

            await updateDoc(tripRef, { dates: updatedDates });
            router.back();
        } catch (error: any) {
            alert("Erro ao salvar planejamento: " + error.message);
        }
    };

    const handleDeletePlan = async () => {
        if (!user || !tripId || !formattedDate) {
            alert("Erro: Usuário, viagem ou data não encontrados.");
            return;
        }

        try {
            const tripRef = doc(db, `travelers/${user.email}/trips/${tripId}`);
            const tripDoc = await getDoc(tripRef);

            if (!tripDoc.exists()) {
                alert("Erro: Viagem não encontrada.");
                return;
            }

            const tripData = tripDoc.data();
            const updatedDates = { ...tripData.dates };

            delete updatedDates[formattedDate];

            await updateDoc(tripRef, { dates: updatedDates });
            router.back();
        } catch (error: any) {
            alert("Erro ao deletar planejamento: " + error.message);
        }
    };

    const handleBackButton = async () => {
        if (!user || !tripId || !formattedDate) {
            router.back();
            return;
        }

        try {
            const tripRef = doc(db, `travelers/${user.email}/trips/${tripId}`);
            const tripDoc = await getDoc(tripRef);

            if (tripDoc.exists()) {
                const tripData = tripDoc.data();
                const existingData = tripData.dates?.[formattedDate] || {};

                const updatedDates = {
                    ...tripData.dates,
                    [formattedDate]: {
                        ...existingData,
                        total,
                    },
                };

                await updateDoc(tripRef, { dates: updatedDates });
            }
        } catch (error: any) {
            alert("Erro ao atualizar total: " + error.message);
        }

        router.back();
    };

    return (
        <SafeAreaView className="bg-background">
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <ScrollView>
                    <BackHeader mode="primary" city={item?.cityPt} handleBack={handleBackButton} />
                    <PriceList
                        prices={item?.prices}
                        fastFood={fastFood}
                        setFastFood={setFastFood}
                        localFood={localFood}
                        setLocalFood={setLocalFood}
                        taxiTax={taxiTax}
                        setTaxiTax={setTaxiTax}
                        busTicket={busTicket}
                        setBusTicket={setBusTicket}
                        uberTax={uberTax}
                        setUberTax={setUberTax}
                        total={total}
                        setTotal={setTotal}
                    />
                    <View className="gap-4">
                        <TouchableOpacity onPress={handleAddDayPlan} className="py-4 mt-12 bg-secondary mx-12 rounded-xl">
                            <View>
                                <Text className="mx-auto text-white font-semibold">Planejar dia</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDeletePlan} className="py-4 bg-zinc-300 mx-12 rounded-xl mb-8 invisible">
                            <View>
                                <Text className="mx-auto text-red-500 font-semibold">Deletar planejamento</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
