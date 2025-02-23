import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { CardType } from "../../types/card";
import MapView, { Marker } from "react-native-maps";
import { getCurrentPositionAsync, LocationObject, requestForegroundPermissionsAsync } from "expo-location";
import { BackHeader } from "../../components/main/back-header";

export default function Map() {
    const { path } = useLocalSearchParams();
    const [item, setItem] = useState<CardType | undefined>(undefined);
    const [userLocation, setUserLocation] = useState<LocationObject | null>(null);

    useEffect(() => {
        const fetchCityDetails = async () => {
            try {
                if (!path) return;
                const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/${path}`);
                setItem(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da cidade:", error);
            }
        };

        fetchCityDetails();
    }, [path]);

    const requestLocationPermission = async () => {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setUserLocation(currentPosition);
        }
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const handleBack = () => {
        router.back();
    };

    return (
        <View className="w-full h-full">
            <BackHeader city={item?.cityPt} handleBack={handleBack} mode="primary" />
            {item && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2,
                    }}
                >
                    <Marker coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }} />
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: "100%",
    },
});
