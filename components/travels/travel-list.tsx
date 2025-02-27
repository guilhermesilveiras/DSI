import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Title } from "../main/title";
import { TravelCard } from "./travel-card";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export function TravelList() {
    const [trips, setTrips] = useState<any[]>([]);
    const db = getFirestore();
    const auth = getAuth();

    // Busca todas as viagens do usuário e calcula o total de gastos
    useEffect(() => {
        const fetchTrips = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser || !currentUser.email) return;

            try {
                const tripsCollectionRef = collection(db, `travelers/${currentUser.email}/travels`);
                const querySnapshot = await getDocs(tripsCollectionRef);
                
                const tripsData = querySnapshot.docs.map((doc) => {
                    const trip = doc.data();
                    const dates = trip.dates || {}; // Verifica se existe algum planejamento de dias
                    
                    // Soma os valores de cada dia planejado
                    const totalPrice = Object.values(dates).reduce((sum: number, day: any) => sum + (day.total || 0), 0);

                    return {
                        id: doc.id,
                        ...trip,
                        totalPrice: totalPrice > 0 ? totalPrice.toFixed(2) : "", // Formata o valor final
                    };
                });

                setTrips(tripsData);
            } catch (error: any) {
                console.error("Erro ao buscar as viagens:", error.message);
            }
        };

        fetchTrips();
    }, [auth.currentUser, db]);

    return (
        <View className="p-10">
            <Title label="Viagens" />
            {trips.map((trip) => (
                <TravelCard
                    key={trip.id}
                    id={trip.id}
                    city={trip.city}
                    price={trip.totalPrice} // Exibe o total calculado
                />
            ))}
        </View>
    );
}
