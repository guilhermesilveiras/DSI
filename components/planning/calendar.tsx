import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebaseConfig";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ptBR } from "../../utils/localeCalendarConfig";
import { styles } from "./styles";
import { router } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Correto para escutar mudanças na autenticação

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

type Props = {
    cityId: string | undefined;
    path: string | string[];
};

export const PlanningCalendar = ({ cityId, path }: Props) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Obtém o e-mail do usuário autenticado
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Carregar os dias selecionados ao abrir o calendário
    useEffect(() => {
        if (!userEmail || !path) return;

        const fetchSelectedDays = async () => {
            try {
                const tripId = path as string;
                const tripRef = doc(db, `travelers/${userEmail}/trips/${tripId}`);
                const tripDoc = await getDoc(tripRef);

                if (tripDoc.exists()) {
                    const tripData = tripDoc.data();
                    const savedDates = Object.keys(tripData.dates || {});
                    setSelectedDays(savedDates);
                }
            } catch (error: any) {
                console.error("Erro ao carregar os dias planejados:", error.message);
            }
        };

        fetchSelectedDays();
    }, [userEmail, path]); 

    const handleDayPress = async (day: DateData) => {
        if (!userEmail || !path) {
            console.log("Usuário não autenticado ou ID da viagem ausente.");
            return;
        }
    
        const tripId = path as string;
        const tripRef = doc(db, `travelers/${userEmail}/trips/${tripId}`);
    
        try {
            const tripDoc = await getDoc(tripRef);
            if (!tripDoc.exists()) {
                console.log("Viagem não encontrada.");
                return;
            }
    
            const travelData = tripDoc.data();
            const existingDates = travelData.dates || {};
            const dayExists = existingDates[day.dateString];
    
            if (dayExists) {
                const updatedDates = { ...existingDates };
                delete updatedDates[day.dateString];
    
                await updateDoc(tripRef, { dates: updatedDates });
    
                setSelectedDays((prevDays) => prevDays.filter((date) => date !== day.dateString));
            } else {
                const newDayPlan = {
                    fastFood: 0,
                    localFood: 0,
                    taxiTax: 0,
                    uberTax: 0,
                    busTicket: 0,
                };
    
                const updatedDates = {
                    ...existingDates,
                    [day.dateString]: newDayPlan,
                };
    
                await updateDoc(tripRef, { dates: updatedDates });
    
                // Atualiza o estado apenas após a adição no banco
                setSelectedDays((prevDays) => [...prevDays, day.dateString]);
    
                // Redireciona para a tela de preços
                router.push(`/prices/${cityId}/${tripId}/${day.dateString}`);
            }
        } catch (error: any) {
            alert("Erro ao atualizar planejamento: " + error.message);
        }
    };
    
        
        const handleDeletePlan = async () => {
            if (!userEmail || !path) {
                console.log("Usuário não autenticado ou ID da viagem ausente.");
                return;
            }
        
            const tripId = path as string;
            const tripRef = doc(db, `travelers/${userEmail}/trips/${tripId}`);
        
            try {
                await deleteDoc(tripRef);
                router.replace("/trips"); // Redireciona para a tela de viagens
            } catch (error: any) {
                console.error("Erro ao excluir planejamento:", error.message);
                alert("Erro ao excluir planejamento: " + error.message);
            }
        };

    const handleFinishPlan = () => {
        router.replace("/trips");
    };

    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                renderArrow={(direction: "left" | "right") => (
                    <View className="py-1 px-1 bg-secondary rounded-xl">
                        <Feather size={28} color="white" name={`chevron-${direction}`} />
                    </View>
                )}
                headerStyle={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#E8E8E8",
                    paddingBottom: 10,
                    marginBottom: 10,
                }}
                theme={{
                    textMonthFontSize: 18,
                    monthTextColor: "#024554",
                    todayTextColor: "#59a2b3",
                    selectedDayBackgroundColor: "#024554",
                    selectedDayTextColor: "#E8E8E8",
                    arrowColor: "#024554",
                    calendarBackground: "transparent",
                    textDayStyle: { color: "#000" },
                    textDisabledColor: "#999",
                }}
                minDate={new Date().toISOString().split("T")[0]}
                hideExtraDays
                onDayPress={handleDayPress}
                markedDates={selectedDays.reduce(
                    (acc, date) => ({ ...acc, [date]: { selected: true } }),
                    {}
                )}
            />

            <TouchableOpacity onPress={handleFinishPlan} className="px-3 py-3 bg-secondary rounded-lg mt-10">
                <Text className="text-white mx-auto">Finalizar Planejamento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePlan} className="px-3 py-3 bg-zinc-300 rounded-lg mt-5">
                <Text className="text-red-500 mx-auto">Deletar Planejamento</Text>
            </TouchableOpacity>
        </View>
    );
};
