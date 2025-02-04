import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { PriceList } from "../../../../components/prices/price-list";
import { router, useLocalSearchParams } from "expo-router";
import { data } from "../../../../data/temp";
import { CardType } from "../../../../types/card";
import { BackHeader } from "../../../../components/main/back-header";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Prices() {
    const { cityId, travelId, date } = useLocalSearchParams();
    const [item, setItem] = useState<CardType | undefined>(undefined);

    // Estados dos valores financeiros
    const [fastFood, setFastFood] = useState<number>(0);
    const [localFood, setLocalFood] = useState<number>(0);
    const [taxiTax, setTaxiTax] = useState<number>(0);
    const [busTicket, setBusTicket] = useState<number>(0);
    const [uberTax, setUberTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const formattedDate = String(date) ?? ""; // Garante que a data seja uma string válida

    useEffect(() => {
        if (cityId) {
            const foundItem = data.find((i) => i.id === cityId);
            setItem(foundItem);
        }
    }, [cityId]);

    // Calcular total sempre que os valores mudarem
    useEffect(() => {
        setTotal(
            (item?.prices?.fastFood ? fastFood * item.prices.fastFood : 0) +
            (item?.prices?.localFood ? localFood * item.prices.localFood : 0) +
            (item?.prices?.taxiTax ? taxiTax * item.prices.taxiTax : 0) +
            (item?.prices?.uberTax ? uberTax * item.prices.uberTax : 0) +
            (item?.prices?.busTicket ? busTicket * item.prices.busTicket : 0)
        );
    }, [fastFood, localFood, taxiTax, uberTax, busTicket, item]);

    // Carregar os valores do Firestore ao abrir a tela
    useEffect(() => {
        if (!user || !travelId || !formattedDate) return;

        const fetchData = async () => {
            try {
                const travelRef = doc(db, `travelers/${user.email}/travels/${travelId}`);
                const travelDoc = await getDoc(travelRef);

                if (travelDoc.exists()) {
                    const travelData = travelDoc.data();
                    const existingData = travelData.dates?.[formattedDate] || {};

                    setFastFood(existingData.fastFood ?? 0);
                    setLocalFood(existingData.localFood ?? 0);
                    setTaxiTax(existingData.taxiTax ?? 0);
                    setUberTax(existingData.uberTax ?? 0);
                    setBusTicket(existingData.busTicket ?? 0);
                    setTotal(existingData.total ?? 0);
                    console.log(total)
                }
            } catch (error: any) {
                alert("Erro ao carregar os valores: " + error.message);
            }
        };

        fetchData();
    }, [user, travelId, formattedDate]);

    // Função para adicionar planejamento do dia ao Firestore
    const handleAddDayPlan = async () => {
        if (!user || !travelId || !formattedDate) {
            alert("Erro: Usuário, viagem ou data não encontrados.");
            return;
        }

        try {
            const travelRef = doc(db, `travelers/${user.email}/travels/${travelId}`);
            const travelDoc = await getDoc(travelRef);

            if (!travelDoc.exists()) {
                alert("Erro: Viagem não encontrada.");
                return;
            }

            const travelData = travelDoc.data();
            const updatedDates = {
                ...travelData.dates,
                [formattedDate]: {
                    fastFood,
                    localFood,
                    taxiTax,
                    uberTax,
                    busTicket,
                    total, // Adiciona o total ao Firestore
                },
            };

            console.log(total)

            await updateDoc(travelRef, { dates: updatedDates });
            router.back();
        } catch (error: any) {
            alert("Erro ao salvar planejamento: " + error.message);
        }
    };

    // Função para remover o planejamento do Firestore
    const handleDeletePlan = async () => {
        if (!user || !travelId || !formattedDate) {
            alert("Erro: Usuário, viagem ou data não encontrados.");
            return;
        }

        try {
            const travelRef = doc(db, `travelers/${user.email}/travels/${travelId}`);
            const travelDoc = await getDoc(travelRef);

            if (!travelDoc.exists()) {
                alert("Erro: Viagem não encontrada.");
                return;
            }

            const travelData = travelDoc.data();
            const updatedDates = { ...travelData.dates };

            // Remove a data selecionada
            delete updatedDates[formattedDate];

            await updateDoc(travelRef, { dates: updatedDates });
            router.back();
        } catch (error: any) {
            alert("Erro ao deletar planejamento: " + error.message);
        }
    };

    const handleBackButton = async () => {
        if (!user || !travelId || !formattedDate) {
            router.back();
            return;
        }

        try {
            const travelRef = doc(db, `travelers/${user.email}/travels/${travelId}`);
            const travelDoc = await getDoc(travelRef);

            if (travelDoc.exists()) {
                const travelData = travelDoc.data();
                const existingData = travelData.dates?.[formattedDate] || {};

                // Atualiza apenas o total no Firestore sem modificar os outros campos
                const updatedDates = {
                    ...travelData.dates,
                    [formattedDate]: {
                        ...existingData,
                        total, // Atualiza o total mantendo os outros valores inalterados
                    },
                };

                await updateDoc(travelRef, { dates: updatedDates });
            }
        } catch (error: any) {
            alert("Erro ao atualizar total: " + error.message);
        }

        router.back();
    };


    return (
        <SafeAreaView className="bg-background">
            <ScrollView>

                <BackHeader mode="primary" city={item?.city} handleBack={handleBackButton} />
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
        </SafeAreaView>
    );
}
