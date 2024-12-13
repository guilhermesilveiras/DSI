import { FlatList, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { wishListType } from "../types/wish-list";
import { ListCard } from "../components/wish-list/card";
import { Header } from "../components/wish-list/header";

export default function WishList() {
  const [wish, setWish] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<wishListType[]>([]);
  const [id, setId] = useState<number>(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleDatePicker = () => {
    setOpen(!open);
  };

  const handlePress = () => {
    if (date !== null && wish !== "") {
      if (editingId !== null) {
        setList((prevList) =>
          prevList.map((item) =>
            item.id === editingId
              ? { ...item, wish, date: date.toISOString() }
              : item
          )
        );
        setEditingId(null);
      } else {
        setList([
          ...list,
          {
            id: id.toString(),
            wish,
            date: date.toISOString(),
          },
        ]);
        setId(id + 1);
      }
      setWish("");
      setDate(null);
    }
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === "android") {
      setOpen(false);
    }
    setDate(currentDate);
  };

  const handleDelete = (key: string) => {
    if (parseInt(key) > -1) {
      const listClone = [...list];
      const newList = listClone.filter((item) => item.id != key);
      setList(newList);
    }
  };

  const handleEdit = (item: wishListType) => {
    setEditingId(item.id);
    setWish(item.wish);
    const newDate = new Date(item.date);
    setDate(newDate instanceof Date && !isNaN(newDate.getTime()) ? newDate : new Date());
  };

  const formattedDate = date
    ? date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <SafeAreaView className="pb-10 bg-background h-full">
      <Header />
      <View className="px-10 items-center gap-4">
        <TextInput
          className="border w-full bg-zinc-200 border-zinc-300 rounded-xl px-8 focus:border-secondary"
          placeholder="Para onde você deseja viajar?"
          value={wish}
          onChangeText={(e) => setWish(e)}
        />

        <TextInput
          className="border w-full bg-zinc-200 border-zinc-300 rounded-xl px-8 focus:border-secondary"
          placeholder="Selecionar Data"
          value={formattedDate}
          onFocus={toggleDatePicker}
        />

        <Pressable
          onPress={handlePress}
          className="w-52 rounded-xl overflow-hidden py-3 justify-center items-center bg-secondary"
        >
          <Text className="text-white">{editingId ? "Atualizar item" : "Adicionar à lista"}</Text>
        </Pressable>

        {open && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            value={date || new Date()}
            onChange={onChange}
          />
        )}

        {list.length > 0 && (
          <View className="w-full mt-6">
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
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
