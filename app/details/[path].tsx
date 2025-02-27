import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { HeaderDetail } from "../../components/details/header";
import { Title } from "../../components/details/title";
import { Description } from "../../components/details/description";
import { Bar } from "../../components/details/bar";
import { Widget } from "../../components/details/widget";
import { Prices } from "../../components/details/prices";
import { Button } from "../../components/details/button";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchCityData } from "../../services/api";
import { CityType } from "../../types/city";

interface CityDetailsProps {
    path: string;
}

interface CityDetailsState {
    item?: CityType;
}

class CityDetails extends Component<CityDetailsProps, CityDetailsState> {
    private db = getFirestore();
    private auth = getAuth();
    private user = this.auth.currentUser;

    constructor(props: CityDetailsProps) {
        super(props);
        this.state = { item: undefined };
    }

    componentDidMount(): void {
        fetchCityData({ path: this.props.path, setItem: (item: CityType) => this.setState({ item }) });
    }

    private handleBackButton = (): void => {
        router.back();
    };

    private handlePlan = async (): Promise<void> => {
        const { item } = this.state;
        if (!this.user || !item) return;

        try {
            const tripRef = doc(collection(this.db, `travelers/${this.user.email}/trips`));
            const tripId = tripRef.id;
            await setDoc(tripRef, {
                tripId,
                city: item.cityPt,
                dates: {},
            });
            router.push({
                pathname: "/planning/[city]/[tripId]",
                params: { city: item.cityPt, tripId },
            });
        } catch (error) {
            console.error("Erro ao criar a viagem:", error);
        }
    };

    private handleShowLocation = (): void => {
        const { item } = this.state;
        router.push({
            pathname: "/map/[path]",
            params: { path: item?.id },
        });
    };

    render() {
        const { item } = this.state;
        return (
            <ScrollView>
                <HeaderDetail
                    img={item?.img || ""}
                    city={item?.cityPt || ""}
                    handleBack={this.handleBackButton}
                />
                <View className="w-full h-full px-8 py-12 bg-zinc-100 -mt-12 rounded-t-[50px]">
                    <Title label="Descrição" />
                    <Description label={item?.description || "Sem descrição disponível."} />
                    <Bar />
                    <Title label="Gastos aproximados por refeição:" />
                    <View className="w-full flex-row justify-center gap-8 mb-4">
                        <Widget label={`U$ ${item?.prices?.localFood.toFixed(2) || "0.00"}`} />
                        <Widget label={`U$ ${item?.prices?.fastFood.toFixed(2) || "0.00"}`} />
                    </View>
                    <View className="hidden invisible">
                        <Title label="Preços mais pesquisados:" />
                        <Prices />
                    </View>
                    <View className="mt-16 gap-5">
                        <Button label={`Ver localização de ${item?.cityPt}`} handleAction={this.handleShowLocation} />
                        <Button label={`Planejar viagem para ${item?.cityPt}`} handleAction={this.handlePlan} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const CityDetailsWrapper = () => {
    const { path } = useLocalSearchParams();
    return <CityDetails path={path as string} />;
};

export default CityDetailsWrapper;
