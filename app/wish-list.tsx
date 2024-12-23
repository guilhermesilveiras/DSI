import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  FlatList,
} from "react-native";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Input } from "../components/wish-list/wish-input";
import { DateInput } from "../components/wish-list/date-input";
import { ListCard } from "../components/wish-list/card";
import { Header } from "../components/wish-list/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type WishListItem = {
  id: string;
  wish: string;
  date: string;
};

export default function WishList(): JSX.Element {
  const [wish, setWish] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<WishListItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleDatePicker = (): void => setOpen((prev) => !prev);

  const handlePress = (): void => {
    if (!wish || !date) return;

    const newItem: WishListItem = {
      id: editingId || Date.now().toString(),
      wish,
      date: date.toISOString(),
    };

    const updatedList = editingId
      ? list.map((item) => (item.id === editingId ? newItem : item))
      : [...list, newItem];

    setList(updatedList);

    setWish("");
    setDate(null);
    setEditingId(null);
  };

  const handleDelete = (id: string): void => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const handleEdit = (item: WishListItem): void => {
    setEditingId(item.id);
    setWish(item.wish);
    setDate(new Date());
  };

  const formattedDate: string = date
    ? date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    setOpen(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

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
              value={formattedDate}
              handleDatePicker={toggleDatePicker}
              placeholder="Selecione a data da viagem"
              icon="calendar-days"
            />
          </View>

          <Pressable
            onPress={handlePress}
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
              onChange={handleDateChange}
              display="spinner"
            />
          )}
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <ListCard
                id={item.id}
                city={item.wish}
                date={new Date(item.date).toLocaleDateString("pt-BR")}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
            style={{ flex: 1, width: "100%" }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
