import { Pressable, Text, View } from "react-native";
import Animated, {
    SlideInLeft,
    SlideOutRight,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Feather";

type Props = {
    id: string;
    city: string;
    date: string;
    handleDelete: (key: string) => void;
    handleEdit: (item: any) => void;
};

export const ListCard = ({ id, city, date, handleDelete, handleEdit }: Props) => {
    const cardOpacity = useSharedValue(1);
    const translateX = useSharedValue(0);

    const handleCityLength = (city: string) => {
        if (city.length < 9) return city;

        const newCity = city.split("").slice(0, 10).join("");
        return `${newCity}-`;
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: cardOpacity.value,
    }));

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd(() => {
            if (translateX.value > 150) {
                // Excluir o item se for arrastado o suficiente
                runOnJS(handleDelete)(id); // Chamar a função de exclusão
                translateX.value = withTiming(300, { duration: 200 }, () => {
                    cardOpacity.value = withTiming(0, { duration: 200 });
                });
            } else {
                // Retornar à posição inicial
                translateX.value = withTiming(0, { duration: 200 });
            }
        });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                style={animatedStyle}
                entering={SlideInLeft}
                exiting={SlideOutRight}
                className="w-60 h-60 rounded-3xl bg-secondary m-auto justify-center items-center mb-4"
            >
                <View className="gap-4">
                    <View>
                        <Text className="text-4xl font-semibold text-white text-center">
                            {handleCityLength(city)}
                        </Text>
                        <Text className="text-sm text-white text-center">
                            {date}
                        </Text>
                    </View>
                    <Pressable className="bg-white rounded-xl w-32 py-2 mx-auto">
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
        </GestureDetector>
    );
};
