import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "../../utils/localeCalendarConfig";
import { styles } from "./styles";
import { router } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Correto para escutar mudanças na autenticação
import { fetchSelectedDays, handleAddDayPlan, handleDeleteDayPlan } from "../../services/firestore-service";

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
    
        fetchSelectedDays({
            userEmail,
            tripId: path as string,
            setSelectedDays,
        });
    }, [userEmail, path]);

    const onDayPress = (day: DateData) => {
        handleAddDayPlan({
            userEmail,
            tripId: path as string,
            day,
            cityId,
            setSelectedDays,
        });
    };
    
    const onDeletePlan = () => {
        handleDeleteDayPlan({
            userEmail,
            tripId: path as string,
        });
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
                onDayPress={onDayPress}
                markedDates={selectedDays.reduce(
                    (acc, date) => ({ ...acc, [date]: { selected: true } }),
                    {}
                )}
            />

            <TouchableOpacity onPress={handleFinishPlan} className="px-3 py-3 bg-secondary rounded-lg mt-10">
                <Text className="text-white mx-auto">Finalizar Planejamento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeletePlan} className="px-3 py-3 bg-zinc-300 rounded-lg mt-5">
                <Text className="text-red-500 mx-auto">Deletar Planejamento</Text>
            </TouchableOpacity>
        </View>
    );
};