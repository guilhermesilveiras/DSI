import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { wishListType } from "../../types/wish-list";

type Props = {
  id: string;
  city: string;
  date: string;
  handleDelete: (key: string) => void;
  handleEdit: (item: wishListType) => void
};

export const ListCard = ({ id, city, date, handleDelete, handleEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const configHeight = useSharedValue(0);

  const configStyle = useAnimatedStyle(() => ({
    height: withTiming(configHeight.value, { duration: 100 }),
  }));

  const handlePress = () => {
    configHeight.value = open ? 0 : 28;
    setOpen(!open);
  };

  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      className="bg-zinc-200 rounded-2xl p-4 border border-tertiary mb-6"
    >
      <Pressable onPress={handlePress}>
        <Text className="text-xl font-semibold">{city}</Text>
        <Text className="text-sm text-zinc-500">{date}</Text>

        <Animated.View style={configStyle} className="flex-row items-center justify-center">
        <Pressable
            accessible={true}
            accessibilityLabel="Editar"
            onPress={() => handleEdit({id, wish: city, date})}
            className="text-md items-center justify-center flex-1"
          >
            <Text>Editar</Text>
          </Pressable>
          <Pressable
            accessible={true}
            accessibilityLabel="Excluir"
            onPress={() => handleDelete(id)}
            className="text-md items-center justify-center flex-1"
          >
            <Text>Excluir</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};