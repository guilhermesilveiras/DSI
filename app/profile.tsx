import { SafeAreaView, ScrollView, View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { BackHeader } from "../components/main/back-header";
import { router } from "expo-router";
import Icon from "@expo/vector-icons/FontAwesome6";
import { Component } from "react";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ButtonInput } from "../components/login/button";
import { InputText } from "../components/login/text-input";
import { fetchContinentsAndCountries } from "../services/api";
import { fetchUserData, handleDeleteAccount, handleSaveAccount } from "../services/firestore-service";

type State = {
    email: string;
    userName: string;
    continent: string;
    country: string;
    errorName: string;
    errorCountry: string;
    errorContinent: string;
    isLoading: "initial" | "loading" | "check";
    validContinents: any[];
    validCountries: any[];
};

class Profile extends Component<{}, State> {
    private db = getFirestore();
    private auth = getAuth();

    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            userName: "",
            continent: "",
            country: "",
            errorName: "",
            errorCountry: "",
            errorContinent: "",
            isLoading: "initial",
            validContinents: [],
            validCountries: []
        };
    }

    componentDidMount(): void {
        fetchUserData({
            setEmail: (email) => this.setState({ email }),
            setUserName: (userName) => this.setState({ userName }),
            setContinent: (continent) => this.setState({ continent }),
            setCountry: (country) => this.setState({ country })
        });
        fetchContinentsAndCountries({
            setValidContinents: (validContinents) => this.setState({ validContinents }),
            setValidCountries: (validCountries) => this.setState({ validCountries })
        });
    }

    handleBack = () => {
        router.navigate("/home");
    };

    render() {
        const { email, userName, continent, country, errorName, errorContinent, errorCountry, isLoading, validContinents, validCountries } = this.state;

        return (
            <ScrollView>
                <SafeAreaView className="items-center">
                    <BackHeader mode="primary" city="perfil" handleBack={this.handleBack} />

                    {isLoading === "initial" && errorName !== "20-caracters" && (
                        <View className="mt-12 px-12">
                            <Icon name="user-large" size={120} color="#024554" />
                        </View>
                    )}
                    {isLoading === "loading" && (
                        <View className="mt-12 px-12">
                            <ActivityIndicator size={120} color={"#024554"} />
                        </View>
                    )}
                    {isLoading === "check" && errorName !== "20-caracters" && (
                        <View className="mt-12 px-12">
                            <Icon name="user-check" size={120} color="#024554" />
                        </View>
                    )}
                    {isLoading !== "loading" && errorName === "20-caracters" && (
                        <View className="mt-12 px-12">
                            <Icon name="user-xmark" size={120} color="#024554" />
                        </View>
                    )}

                    <View className="mt-6 px-10 items-center">
                        <InputText label="Email" placeholder="" value={email} setValue={(email) => this.setState({ email })} editable={false} />
                        <InputText label="Nome de usuário" placeholder="" value={userName} setValue={(userName) => this.setState({ userName })} error={errorName} />
                        <InputText label="Continente de Interesse" placeholder="Ex: Europa" value={continent} setValue={(continent) => this.setState({ continent })} error={errorContinent} />
                        <InputText label="País de Interesse" placeholder="Ex: França" value={country} setValue={(country) => this.setState({ country })} error={errorCountry} />
                        <ButtonInput
                            label="Confirmar alterações"
                            onPress={() => handleSaveAccount({
                                email,
                                userName,
                                continent,
                                country,
                                validContinents,
                                validCountries,
                                setErrorName: (errorName) => this.setState({ errorName }),
                                setErrorContinent: (errorContinent) => this.setState({ errorContinent }),
                                setErrorCountry: (errorCountry) => this.setState({ errorCountry }),
                                setIsLoading: (isLoading) => this.setState({ isLoading })
                            })}
                        />
                        <TouchableOpacity
                            onPress={() => handleDeleteAccount({ setIsLoading: (isLoading) => this.setState({ isLoading }) })}
                            className="px-6 py-2 bg-zinc-300 rounded-lg mt-6"
                        >
                            <Text className="text-red-500 font-semibold">Excluir conta</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default Profile;