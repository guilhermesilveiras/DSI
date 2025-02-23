import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Feather";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { CardType } from "../../types/card";
import { getAuth } from "firebase/auth";
import axios from "axios";

type Props = {
    id: string;
    city: string;
    date: string;
    handleDelete: (key: string) => void;
    handleEdit: (item: any) => void;
};

export const ListCard = ({ id, city, date, handleDelete, handleEdit }: Props) => {
    const [item, setItem] = useState<CardType[] | undefined>(undefined);
    const [translateX, setTranslateX] = useState(0);
    const [opacity, setOpacity] = useState(1);

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchCityDetails = async () => {
            try {
                const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/name/${city}`);
                setItem(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da cidade:", error);
            }
        };

        fetchCityDetails();
    }, [city]);

    const handleCityLength = (city: string) => {
        if (city.length < 9) return city;

        const newCity = city.split("").slice(0, 10).join("");
        return `${newCity}-`;
    };

    const handlePanGesture = (event: PanGestureHandlerGestureEvent) => {
        setTranslateX(event.nativeEvent.translationX);
    };

    const handlePanGestureEnd = () => {
        if (translateX > 150) {
            handleDelete(id);
            setTranslateX(300);
            setOpacity(0);
        } else {
            setTranslateX(0);
        }
    };

    const handlePlan = async (): Promise<void> => {
        if (!user || !item) return;

        try {
            // Criando um ID único para cada viagem
            const tripRef = doc(collection(db, `travelers/${user.email}/trips`));
            const tripId = tripRef.id;
            await setDoc(tripRef, {
                tripId,
                city: item[0].cityPt,
                dates: {},
            });
            router.push({
                pathname: "planning/[city]/[tripId]",
                params: { city: item[0].cityPt, tripId }
            });
        } catch (error) {
            console.error("Erro ao criar a viagem:", error);
        }
    };

    return (
        <GestureHandlerRootView>
            <PanGestureHandler
                onGestureEvent={handlePanGesture}
                onHandlerStateChange={handlePanGestureEnd}
            >
                <Animatable.View
                    animation="slideInLeft"
                    duration={500}
                    style={{
                        transform: [{ translateX }],
                        opacity,
                    }}
                    className="w-60 h-60 rounded-3xl bg-secondary m-auto justify-center items-center mb-4"
                >
                    <View className="gap-4">
                        <View>
                            <Text className="text-4xl font-semibold text-white text-center">
                                {handleCityLength(city)}
                            </Text>
                            <Text className="text-sm text-white text-center">
                                {date}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handlePlan} className="bg-white rounded-xl w-32 py-2 mx-auto">
                            <Text className="text-center text-tertiary font-semibold">
                                Planejar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-end mt-4">
                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="Editar"
                            onPress={() => handleEdit({ id, wish: city, date })}
                            className="rounded-xl relative p-4 -mt-80 ml-44"
                        >
                            <Icon name="edit" color={"white"} size={20} />
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};
