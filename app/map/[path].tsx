import React, { Component } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getCurrentPositionAsync, LocationObject, requestForegroundPermissionsAsync } from "expo-location";
import { BackHeader } from "../../components/main/back-header";
import { fetchCityData } from "../../services/api";
import { CityType } from "../../types/city";

interface MapProps {
    path: string;
}

interface MapState {
    item?: CityType;
    userLocation: LocationObject | null;
}

class Map extends Component<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props);
        this.state = { item: undefined, userLocation: null };
    }

    componentDidMount(): void {
        fetchCityData({ path: this.props.path, setItem: (item: CityType) => this.setState({ item }) });
        this.requestLocationPermission();
    }

    private requestLocationPermission = async (): Promise<void> => {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            this.setState({ userLocation: currentPosition });
        }
    };

    private handleBack = (): void => {
        router.back();
    };

    render() {
        const { item } = this.state;
        return (
            <View className="w-full h-full">
                <BackHeader city={item?.cityPt} handleBack={this.handleBack} mode="primary" />
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
}

const MapWrapper = () => {
    const { path } = useLocalSearchParams();
    return <Map path={path as string} />;
};

export default MapWrapper;

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: "100%",
    },
});