import React, { Component } from "react";
import {
    Pressable,
    SafeAreaView,
    Text,
    View,
    FlatList,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Input } from "../components/wish-list/wish-input";
import { DateInput } from "../components/wish-list/date-input";
import { ListCard } from "../components/wish-list/card";
import { Header } from "../components/wish-list/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../firebaseConfig";
import { fetchWishlist, formattedDate, handleAdd, handleDateChange, handleDelete, handleEdit, toggleDatePicker } from "../services/wish-list";

// Tipagem do item da lista de desejos
interface WishListItem {
    id: string;
    wish: string;
    date: string;
}

interface WishListState {
    wish: string;
    date: Date | null;
    open: boolean;
    list: WishListItem[];
    editingId: string | null;
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
        };
    }

    // Getter para pegar o email do usuário autenticado
    get userEmail(): string | undefined {
        return auth.currentUser?.email ?? undefined; // Garantir que seja undefined em vez de null
    }

    componentDidMount() {
        const userEmail = this.userEmail;
        if (userEmail) {
            fetchWishlist({ userEmail, setList: this.setList });
        }
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

    // Corrigir a função handleAddItem para passar diretamente a função que altera o wish
    handleAddItem = () => {
        const { date, editingId, wish } = this.state;
        const userEmail = this.userEmail;

        if (userEmail) {
            handleAdd({
                date,
                editingId,
                setDate: this.setDate,
                setEditingId: this.setEditingId,
                setList: this.setList,
                setWish: (wish: string) => this.setState({ wish }), // Atualização do campo `wish` diretamente
                userEmail,
                wish,
            });
        }
    };

    // Função para alternar o estado de `open` (DatePicker aberto ou fechado)
    toggleDatePicker = () => {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    };

    // Função específica para lidar com a data e garantir que o tipo esperado seja booleano
    handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const date = selectedDate || new Date();
        this.setDate(date); // Atualizando a data
        this.toggleDatePicker(); // Chamada para alternar o estado de 'open'
    };

    render() {
        const { wish, date, open, list, editingId } = this.state;

        return (
            <SafeAreaView className="bg-background flex-1">
                <GestureHandlerRootView className="flex-1">
                    <Header />
                    <View className="items-center gap-6 flex-1">
                        <View className="px-10 gap-6">
                            <Input
                                value={wish}
                                setValue={(e: string) => this.setState({ wish: e })} // Atualizando diretamente o campo wish
                                placeholder="Digite a cidade que deseja visitar"
                                icon="map-location-dot"
                            />
                            <DateInput
                                value={formattedDate({ date })}
                                handleDatePicker={this.toggleDatePicker} // Chamada da função toggleDatePicker
                                placeholder="Selecione a data da viagem"
                                icon="calendar-days"
                            />
                        </View>

                        <Pressable
                            onPress={this.handleAddItem}
                            className="w-52 rounded-full py-3 justify-center items-center bg-secondary"
                        >
                            <Text className="text-white font-semibold">
                                {editingId ? "Atualizar item" : "Adicionar à lista"}
                            </Text>
                        </Pressable>

                        {open && (
                            <DateTimePicker
                                mode="date"
                                value={date || new Date()}
                                onChange={this.handleDateChange} // Chamada da função handleDateChange
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
                                        setWish: (wish: string) => this.setState({ wish }) // Atualização do campo wish diretamente
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
