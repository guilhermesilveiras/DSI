import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    State as GestureState
} from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Feather";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Component } from "react";
import { CityType } from "../../types/city";
import { fetchCityDataByName } from "../../services/api"; // Ajuste o caminho conforme necessário
import { handlePlanWish } from "../../services/firestore-service";

type Props = {
    id: string;
    city: string;
    date: string;
    handleDelete: (key: string) => void;
    handleEdit: (item: any) => void;
};

type State = {
    item?: CityType[];
    translateX: number;
    isDeleting: boolean;
};

export class ListCard extends Component<Props, State> {
    private db = getFirestore();
    private auth = getAuth();
    private user = this.auth.currentUser;

    constructor(props: Props) {
        super(props);
        this.state = {
            item: undefined,
            translateX: 0,
            isDeleting: false,
        };
    }

    componentDidMount() {
        fetchCityDataByName({ city: this.props.city, setItem: this.setItem });
    }

    private setItem = (item: CityType[]) => {
        this.setState({ item });
    };

    private handleCityLength(city: string) {
        return city.length < 9 ? city : `${city.substring(0, 10)}-`;
    }

    private handlePanGesture = (event: PanGestureHandlerGestureEvent) => {
        this.setState({ translateX: event.nativeEvent.translationX });
    };

    private handlePanGestureEnd = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === GestureState.END) {
            if (this.state.translateX > 125) {
                this.setState({ isDeleting: true });
            } else {
                this.setState({ translateX: 0 });
            }
        }
    };

    private handleDeleteAnimationEnd = () => {
        this.props.handleDelete(this.props.id);
    };

    private onPlanWish = () => {
        if (this.user && this.state.item) {
            handlePlanWish({
                userEmail: this.user.email,
                item: this.state.item,
            });
        }
    };

    render() {
        return (
            <GestureHandlerRootView>
                <PanGestureHandler
                    onGestureEvent={this.handlePanGesture}
                    onHandlerStateChange={this.handlePanGestureEnd}
                >
                    <Animatable.View
                        animation={this.state.isDeleting ? "fadeOutRight" : "fadeInLeft"}
                        duration={500}
                        onAnimationEnd={this.state.isDeleting ? this.handleDeleteAnimationEnd : undefined}
                        style={{ transform: [{ translateX: this.state.translateX }] }}
                        className="w-60 h-60 rounded-3xl bg-secondary m-auto justify-center items-center mb-4"
                    >
                        <View className="gap-4">
                            <View>
                                <Text className="text-4xl font-semibold text-white text-center">
                                    {this.handleCityLength(this.props.city)}
                                </Text>
                                <Text className="text-sm text-white text-center">
                                    {this.props.date}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={this.onPlanWish} className="bg-white rounded-xl w-32 py-2 mx-auto">
                                <Text className="text-center text-tertiary font-semibold">
                                    Planejar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center justify-end mt-4">
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Editar"
                                onPress={() => this.props.handleEdit({ id: this.props.id, wish: this.props.city, date: this.props.date })}
                                className="rounded-xl relative p-4 -mt-80 ml-44"
                            >
                                <Icon name="edit" color={"white"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        );
    }
}
