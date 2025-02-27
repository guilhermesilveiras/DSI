import React, { Component } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { PriceList } from "../../../../components/prices/price-list";
import { router, useLocalSearchParams } from "expo-router";
import { CityType } from "../../../../types/city";
import { BackHeader } from "../../../../components/main/back-header";
import { getAuth } from "firebase/auth";
import { fetchCityDataById } from "../../../../services/api";
import { fetchTripData, handleAddPlan, handleBackButton, handleDeletePlan } from "../../../../services/firestore-service";

interface PricesProps {
    cityId: string;
    tripId: string;
    date: string;
}

interface PricesState {
    item?: CityType;
    loading: boolean;
    fastFood: number;
    localFood: number;
    taxiTax: number;
    busTicket: number;
    uberTax: number;
    total: number;
}

class Prices extends Component<PricesProps, PricesState> {
    private auth = getAuth();
    private user = this.auth.currentUser;
    private formattedDate = String(this.props.date) ?? "";

    constructor(props: PricesProps) {
        super(props);
        this.state = {
            item: undefined,
            loading: true,
            fastFood: 0,
            localFood: 0,
            taxiTax: 0,
            busTicket: 0,
            uberTax: 0,
            total: 0,
        };
    }

    componentDidMount(): void {
        fetchCityDataById({ city: this.props.cityId, setItem: (item: CityType) => this.setState({ item }), setLoading: (loading: boolean) => this.setState({ loading }) });
        if (this.user && this.props.tripId && this.formattedDate) {
            fetchTripData({
                tripId: this.props.tripId,
                formattedDate: this.formattedDate,
                setFastFood: (fastFood: number) => this.setState({ fastFood }),
                setLocalFood: (localFood: number) => this.setState({ localFood }),
                setTaxiTax: (taxiTax: number) => this.setState({ taxiTax }),
                setUberTax: (uberTax: number) => this.setState({ uberTax }),
                setBusTicket: (busTicket: number) => this.setState({ busTicket }),
                setTotal: (total: number) => this.setState({ total })
            });
        }
    }

    private handleAddPlanAsync = async (): Promise<void> => {
        try {
            await handleAddPlan({
                tripId: this.props.tripId,
                formattedDate: this.formattedDate,
                ...this.state
            });
            router.back();
        } catch (error: any) {
            alert("Erro ao salvar planejamento: " + error.message);
        }
    };

    private handleDeleteAsync = async (): Promise<void> => {
        try {
            await handleDeletePlan({ tripId: this.props.tripId, formattedDate: this.formattedDate });
            router.back();
        } catch (error: any) {
            alert("Erro ao deletar planejamento: " + error.message);
        }
    };

    private handleBack = async (): Promise<void> => {
        try {
            await handleBackButton({ tripId: this.props.tripId, formattedDate: this.formattedDate, total: this.state.total });
            router.back();
        } catch (error: any) {
            alert("Erro ao atualizar total: " + error.message);
        }
    };

    render() {
        const { item, loading, fastFood, localFood, taxiTax, busTicket, uberTax, total } = this.state;
        return (
            <SafeAreaView className="bg-background">
                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    <ScrollView>
                        <BackHeader mode="primary" city={item?.cityPt} handleBack={this.handleBack} />
                        <PriceList
                            prices={item?.prices}
                            fastFood={fastFood}
                            setFastFood={(fastFood: number) => this.setState({ fastFood })}
                            localFood={localFood}
                            setLocalFood={(localFood: number) => this.setState({ localFood })}
                            taxiTax={taxiTax}
                            setTaxiTax={(taxiTax: number) => this.setState({ taxiTax })}
                            busTicket={busTicket}
                            setBusTicket={(busTicket: number) => this.setState({ busTicket })}
                            uberTax={uberTax}
                            setUberTax={(uberTax: number) => this.setState({ uberTax })}
                            total={total}
                            setTotal={(total: number) => this.setState({ total })}
                        />
                        <View className="gap-4">
                            <TouchableOpacity onPress={this.handleAddPlanAsync} className="py-4 mt-12 bg-secondary mx-12 rounded-xl">
                                <View>
                                    <Text className="mx-auto text-white font-semibold">Planejar dia</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleDeleteAsync} className="py-4 bg-zinc-300 mx-12 rounded-xl mb-8 invisible">
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
}

const PricesWrapper = () => {
    const { cityId, tripId, date } = useLocalSearchParams();
    return <Prices cityId={cityId as string} tripId={tripId as string} date={date as string} />;
};

export default PricesWrapper;
