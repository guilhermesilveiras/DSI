import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  SlideInLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { wishListType } from "../../types/wish-list";

type Props = {
  id: string;
  city: string;
  date: string;
  handleDelete: (key: string) => void;
  handleEdit: (item: wishListType) => void;
};

export const ListCard = ({ id, city, date, handleDelete, handleEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const configHeight = useSharedValue(0);

  const configStyle = useAnimatedStyle(() => ({
    height: withTiming(configHeight.value, { duration: 100 }),
  }));

  const handlePress = () => {
    configHeight.value = open ? 0 : 40;
    setOpen(!open);
  };

  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutRight}
      style={{ marginBottom: 12 }} // Adicionando algum espaçamento
      className="bg-zinc-200 rounded-2xl p-4 border border-tertiary"
    >
      <Pressable onPress={handlePress}>
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-xl font-semibold text-secondary">{city}</Text>
            <Text className="text-sm text-zinc-500">{date}</Text>
          </View>
          <Pressable className="bg-secondary rounded-xl py-2 px-4">
            <Text className="text-center text-white">
              Planejar
            </Text>
          </Pressable>
        </View>

        <Animated.View
          style={configStyle}
          className="flex-row items-center justify-center"
          >
          <Pressable
            accessible={true}
            accessibilityLabel="Editar"
            onPress={() => handleEdit({ id, wish: city, date })}
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
