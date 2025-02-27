import React, { Component } from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Input } from "../components/wish-list/wish-input";
import { DateInput } from "../components/wish-list/date-input";
import { ListCard } from "../components/wish-list/card";
import { Header } from "../components/wish-list/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../firebaseConfig";
import { fetchCities } from "../services/api";
import { fetchWishlist, formattedDate, handleAdd, handleDelete, handleEdit } from "../services/wish-list";
import { ErrorText } from "../components/login/error-text";

interface WishListState {
    wish: string;
    date: Date | null;
    open: boolean;
    list: WishListItem[];
    editingId: string | null;
    availableCities: string[];
    isLoading: boolean;
    errorMessage: string;
}

class WishList extends Component<{}, WishListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            wish: "",
            date: null,
            open: false,
            list: [],
            editingId: null,
            availableCities: [],
            isLoading: true,
            errorMessage: ""
        };
    }

    get userEmail(): string | undefined {
        return auth.currentUser?.email ?? undefined;
    }

    async componentDidMount() {
        const userEmail = this.userEmail;
        if (userEmail) {
            fetchWishlist({ userEmail, setList: this.setList });
        }
        await fetchCities({ setAvailableCities: this.setAvailableCities, setIsLoading: this.setIsLoading });
    }

    setList = (list: WishListItem[]) => {
        this.setState({ list });
    };

    setDate = (date: Date | null) => {
        this.setState({ date });
    };

    setEditingId = (editingId: string | null) => {
        this.setState({ editingId });
    };

    setAvailableCities = (cities: string[]) => {
        this.setState({ availableCities: cities });
    };

    setIsLoading = (isLoading: boolean) => {
        this.setState({ isLoading });
    };

    isCityValid = () => {
        const { wish, availableCities } = this.state;
        return availableCities.includes(wish.toLowerCase());
    };

    handleAddItem = () => {
        const { date, editingId, wish } = this.state;
        const userEmail = this.userEmail;

        if (!wish || !date) {
            this.setState({ errorMessage: "Preencha todos os campos antes de adicionar." });
            return;
        }

        if (!this.isCityValid()) {
            this.setState({ errorMessage: "A cidade digitada não está cadastrada." });
            return;
        }

        this.setState({ errorMessage: "" });

        if (userEmail) {
            handleAdd({
                date,
                editingId,
                setDate: this.setDate,
                setEditingId: this.setEditingId,
                setList: this.setList,
                setWish: (wish: string) => this.setState({ wish }),
                userEmail,
                wish,
            });
        }
    };

    toggleDatePicker = () => {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    };

    handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const date = selectedDate || new Date();
        this.setDate(date);
        this.toggleDatePicker();
    };

    render() {
        const { wish, date, open, list, editingId, isLoading, errorMessage } = this.state;

        return (
            <SafeAreaView className="bg-background flex-1">
                <GestureHandlerRootView className="flex-1">
                    <Header />
                    <View className="items-center gap-6 flex-1">
                        <View className="px-10 gap-8">
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#000" />
                            ) : (
                                <View className="gap-2">
                                    <Input
                                        value={wish}
                                        setValue={(e: string) => this.setState({ wish: e })}
                                        placeholder="Digite a cidade que deseja visitar"
                                        icon="map-location-dot"
                                    />
                                    {errorMessage && <ErrorText text={errorMessage} />}
                                </View>
                            )}
                            <DateInput
                                value={formattedDate({ date })}
                                handleDatePicker={this.toggleDatePicker}
                                placeholder="Selecione a data da viagem"
                                icon="calendar-days"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={this.handleAddItem}
                            className="w-52 rounded-xl py-3 justify-center items-center bg-secondary"
                        >
                            <Text className="text-white font-semibold">
                                {editingId ? "Atualizar item" : "Adicionar à lista"}
                            </Text>
                        </TouchableOpacity>

                        {open && (
                            <DateTimePicker
                                mode="date"
                                value={date || new Date()}
                                onChange={this.handleDateChange}
                                display="spinner"
                            />
                        )}

                        <FlatList
                            className="flex-1 w-full"
                            data={list}
                            renderItem={({ item }) => (
                                <ListCard
                                    id={item.id}
                                    city={item.wish}
                                    date={new Date(item.date).toLocaleDateString("pt-BR")}
                                    handleDelete={() => handleDelete({ id: item.id, list, setList: this.setList, userEmail: this.userEmail })}
                                    handleEdit={() => handleEdit({
                                        item,
                                        setDate: this.setDate,
                                        setEditingId: this.setEditingId,
                                        setWish: (wish: string) => this.setState({ wish })
                                    })}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 20 }}
                        />
                    </View>
                </GestureHandlerRootView>
            </SafeAreaView>
        );
    }
}

export default WishList;