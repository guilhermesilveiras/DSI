import {
    Pressable,
    SafeAreaView,
    Text,
    View,
    FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Input } from "../components/wish-list/wish-input";
import { DateInput } from "../components/wish-list/date-input";
import { ListCard } from "../components/wish-list/card";
import { Header } from "../components/wish-list/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../firebaseConfig";
import { fetchWishlist, formattedDate, handleAdd, handleDateChange, handleDelete, handleEdit, toggleDatePicker } from "../services/wish-list";


export default function WishList(): JSX.Element {
    const [wish, setWish] = useState<string>("");
    const [date, setDate] = useState<Date | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [list, setList] = useState<WishListItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    
    // Pega o email do usuário autenticado
    const userEmail = auth.currentUser?.email;
    
    useEffect(() => {
        if (userEmail) {
            fetchWishlist({userEmail, setList});
        }
    }, [userEmail]);

    return (
        <SafeAreaView className="bg-background flex-1">
            <GestureHandlerRootView className="flex-1">
                <Header />
                <View className="items-center gap-6 flex-1">
                    <View className="px-10 gap-6">
                        <Input
                            value={wish}
                            setValue={setWish}
                            placeholder="Digite a cidade que deseja visitar"
                            icon="map-location-dot"
                        />
                        <DateInput
                            value={formattedDate({date})}
                            handleDatePicker={()=>toggleDatePicker({setOpen})}
                            placeholder="Selecione a data da viagem"
                            icon="calendar-days"
                        />
                    </View>
        
                    <Pressable
                    onPress={()=>handleAdd({date, editingId, setDate, setEditingId, setList, setWish, userEmail, wish})}
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
                            onChange={(event: DateTimePickerEvent, selectedDate?: Date) =>
                                handleDateChange({ selectedDate, setDate, setOpen })
                            }
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
                            handleDelete={()=>handleDelete({id: item.id ,list, setList, userEmail})}
                            handleEdit={()=>handleEdit({item, setDate, setEditingId, setWish})}
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
