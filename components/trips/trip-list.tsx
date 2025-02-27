import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Title } from "../main/title";
import { TripCard } from "./trip-card";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { NoContent } from "./no-content";

interface Trip {
    id: string;
    city: string;
    totalPrice: string;
}

interface State {
    trips: Trip[];
    loading: boolean;
}

export class TravelList extends React.Component<{}, State> {
    private db = getFirestore();
    private auth = getAuth();

    constructor(props: {}) {
        super(props);
        this.state = {
            trips: [],
            loading: true
        };
    }

    async componentDidMount() {
        await this.fetchTrips();
    }

    async fetchTrips() {
        const currentUser = this.auth.currentUser;
        if (!currentUser || !currentUser.email) {
            this.setState({ loading: false });
            return;
        }

        try {
            const tripsCollectionRef = collection(this.db, `travelers/${currentUser.email}/trips`);
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

            this.setState({ trips: tripsData, loading: false });
        } catch (error: any) {
            console.error("Erro ao buscar as viagens:", error.message);
            this.setState({ loading: false });
        }
    }

    render() {
        const { trips, loading } = this.state;

        return (
            <View className="p-10">
                <Title label="Viagens" />

                {loading ? (
                    <View className="w-full h-96 justify-center items-center">
                        <ActivityIndicator size="large" color="#024554" />
                    </View>
                ) : trips.length > 0 ? (
                    trips.map((trip) => (
                        <TripCard key={trip.id} id={trip.id} city={trip.city} price={trip.totalPrice} />
                    ))
                ) : (
                    <NoContent icon="airplane-search" label="Você ainda não tem planejamentos"/>
                )}
            </View>
        );
    }
}
