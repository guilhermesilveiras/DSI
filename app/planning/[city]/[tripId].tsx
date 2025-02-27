import React, { Component } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { PlanningCalendar } from "../../../components/planning/calendar";
import { BackHeader } from "../../../components/main/back-header";
import { router, useLocalSearchParams } from "expo-router";
import { CityType } from "../../../types/city";
import { fetchCity } from "../../../services/api";

interface PlanningProps {
    city: string;
    tripId: string;
}

interface PlanningState {
    item?: CityType;
    loading: boolean;
}

class Planning extends Component<PlanningProps, PlanningState> {
    constructor(props: PlanningProps) {
        super(props);
        this.state = { item: undefined, loading: true };
    }

    componentDidMount(): void {
        fetchCity({ city: this.props.city, setItem: (item: CityType) => this.setState({ item }), setLoading: (loading: boolean) => this.setState({ loading }) });
    }

    private handleBackButton = (): void => {
        router.back();
    };

    render() {
        const { item, loading } = this.state;
        return (
            <SafeAreaView className="flex-1 bg-background">
                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    <>
                        <BackHeader mode="primary" city={item?.cityPt} handleBack={this.handleBackButton} />
                        <PlanningCalendar cityId={item?.id} path={this.props.tripId} />
                    </>
                )}
            </SafeAreaView>
        );
    }
}

const PlanningWrapper = () => {
    const { city, tripId } = useLocalSearchParams();
    return <Planning city={city as string} tripId={tripId as string} />;
};

export default PlanningWrapper;