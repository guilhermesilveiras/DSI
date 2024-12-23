import { Pressable, Text, View } from "react-native";
import Animated, {
  SlideInLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { wishListType } from "../../types/wish-list";
import Icon from "@expo/vector-icons/Feather";

type Props = {
  id: string;
  city: string;
  date: string;
  handleDelete: (key: string) => void;
  handleEdit: (item: wishListType) => void;
};

export const ListCard = ({ id, city, date, handleDelete, handleEdit }: Props) => {
  const translateX = useSharedValue(0);
  const cardOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: cardOpacity.value,
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > 150) {
        // Excluir o item se for arrastado o suficiente
        translateX.value = withTiming(300, { duration: 200 }, () => {
          cardOpacity.value = withTiming(0, { duration: 200 });
        });
        runOnJS(handleDelete)(id); // Chamar a função de exclusão
      } else {
        // Retornar à posição inicial
        translateX.value = withTiming(0, { duration: 200 });
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={animatedStyle}
        entering={SlideInLeft}
        exiting={SlideOutRight}
        className="w-60 h-60 rounded-3xl bg-secondary m-auto justify-center items-center mb-2"
      >
        <View className="gap-4">
          <View>
            <Text className="text-4xl font-semibold text-white text-center">{city}</Text>
            <Text className="text-sm text-white text-center">{date}</Text>
          </View>
          <Pressable className="bg-white rounded-xl py-2 px-6">
            <Text className="text-center text-tertiary font-semibold">
              Planejar
            </Text>
          </Pressable>
        </View>
        <View className="flex-row items-center justify-end mt-4">
          <Pressable
            accessible={true}
            accessibilityLabel="Editar"
            onPress={() => handleEdit({ id, wish: city, date })}
            className="rounded-xl relative p-4 -mt-80 ml-44"
          >
            <Icon name="edit" color={"white"} size={20} />
          </Pressable>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
