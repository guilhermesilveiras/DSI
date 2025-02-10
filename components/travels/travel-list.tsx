import React from "react";
import { View } from "react-native";
import { Title } from "../main/title";
import { TravelCard } from "./travel-card";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Trip {
    id: string;
    city: string;
    totalPrice: string;
}

interface State {
    trips: Trip[];
}

export class TravelList extends React.Component<{}, State> {
    private db = getFirestore();
    private auth = getAuth();

    constructor(props: {}) {
        super(props);
        this.state = {
            trips: [],
        };
    }

    async componentDidMount() {
        await this.fetchTrips();
    }

    async fetchTrips() {
        const currentUser = this.auth.currentUser;
        if (!currentUser || !currentUser.email) return;

        try {
            const tripsCollectionRef = collection(this.db, `travelers/${currentUser.email}/travels`);
            const querySnapshot = await getDocs(tripsCollectionRef);

            const tripsData = querySnapshot.docs.map((doc) => {
                const trip = doc.data();
                const dates = trip.dates || {};

                // Soma os valores de cada dia planejado
                const totalPrice = Object.values(dates).reduce((sum: number, day: any) => sum + (day.total || 0), 0);

                return {
                    id: doc.id,
                    city: trip.city,
                    totalPrice: totalPrice > 0 ? totalPrice.toFixed(2) : "",
                };
            });

            this.setState({ trips: tripsData });
        } catch (error: any) {
            console.error("Erro ao buscar as viagens:", error.message);
        }
    }

    render() {
        return (
            <View className="p-10">
                <Title label="Viagens" />
                {this.state.trips.map((trip) => (
                    <TravelCard key={trip.id} id={trip.id} city={trip.city} price={trip.totalPrice} />
                ))}
            </View>
        );
    }
}