import { getFirestore, doc, setDoc, collection, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser, getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";
import { DeleteAccountProps, FetchSelectedDaysProps, FetchTripDataProps, FetchUserDataProps, FetchUserNameProps, HandleAddDayPlanProps, handlebackButtonProps, HandleDeleteDayPlanProps, handleDeletePlanProps, HandlePlanWishProps, HandleTripProps, PlanTripProps, SaveAccountProps } from "../types/firestore-service";

const db = getFirestore();
const auth = getAuth();

export const planTrip = async ({ item }: PlanTripProps): Promise<void> => {
    const user = auth.currentUser;

    if (!user) {
        console.error("Usuário não autenticado.");
        return;
    }

    try {
        const tripRef = doc(collection(db, `travelers/${user.email}/trips`));
        const tripId = tripRef.id;

        await setDoc(tripRef, {
            tripId,
            city: item.cityPt,
            dates: {},
        });

        console.log(`Viagem para ${item.cityPt} planejada com sucesso!`);
    } catch (error) {
        console.error("Erro ao criar a viagem:", error);
    }
};

export const fetchTripData = async ({
    tripId,
    formattedDate,
    setFastFood,
    setLocalFood,
    setTaxiTax,
    setUberTax,
    setBusTicket,
    setTotal,
}: FetchTripDataProps): Promise<void> => {
    const user = auth.currentUser;

    if (!user) {
        console.error("Usuário não autenticado.");
        return;
    }

    try {
        const tripRef = doc(db, `travelers/${user.email}/trips/${tripId}`);
        const tripDoc = await getDoc(tripRef);

        if (tripDoc.exists()) {
            const tripData = tripDoc.data();
            const existingData = tripData.dates?.[formattedDate] || {};

            setFastFood(existingData.fastFood ?? 0);
            setLocalFood(existingData.localFood ?? 0);
            setTaxiTax(existingData.taxiTax ?? 0);
            setUberTax(existingData.uberTax ?? 0);
            setBusTicket(existingData.busTicket ?? 0);
            setTotal(existingData.total ?? 0);
        }
    } catch (error) {
        console.error("Erro ao carregar os valores:", error);
    }
};

export const getTripData = async (tripId: string | string[]) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    const tripRef = doc(db, `travelers/${user.email}/trips/${tripId}`);
    const tripDoc = await getDoc(tripRef);

    if (!tripDoc.exists()) {
        throw new Error("Viagem não encontrada.");
    }

    return { tripRef, tripData: tripDoc.data() };
};

export const handleAddPlan = async (params: HandleTripProps): Promise<void> => {
    const { tripId, formattedDate, fastFood = 0, localFood = 0, taxiTax = 0, uberTax = 0, busTicket = 0, total = 0 } = params;
    const { tripRef, tripData } = await getTripData(tripId);
    
    const updatedDates = {
        ...tripData.dates,
        [formattedDate]: { fastFood, localFood, taxiTax, uberTax, busTicket, total },
    };

    await updateDoc(tripRef, { dates: updatedDates });
};

export const handleDeletePlan = async ({tripId, formattedDate}: handleDeletePlanProps): Promise<void> => {
    const { tripRef, tripData } = await getTripData(tripId);
    
    const updatedDates = { ...tripData.dates };
    delete updatedDates[formattedDate];

    await updateDoc(tripRef, { dates: updatedDates });
};

export const handleBackButton = async ({tripId, formattedDate, total}: handlebackButtonProps): Promise<void> => {
    const { tripRef, tripData } = await getTripData(tripId);
    
    const existingData = tripData.dates?.[formattedDate] || {};
    const updatedDates = {
        ...tripData.dates,
        [formattedDate]: { ...existingData, total },
    };

    await updateDoc(tripRef, { dates: updatedDates });
};

export const fetchUserData = async ({ setEmail, setUserName, setContinent, setCountry }: FetchUserDataProps) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) return;

    setEmail(currentUser.email);

    try {
        const userRef = doc(db, `travelers/${currentUser.email}`);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || "");
            setContinent(userData.continent || "");
            setCountry(userData.country || "");
        }
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
    }
};

export const handleSaveAccount = async ({
    email,
    userName,
    continent,
    country,
    validContinents,
    validCountries,
    setErrorName,
    setErrorContinent,
    setErrorCountry,
    setIsLoading
}: SaveAccountProps) => {
    if (!email || !userName) return;
    if (userName.length > 20) {
        setErrorName("20-caracters");
        return;
    }

    setErrorContinent("");
    setErrorCountry("");

    const updates: Record<string, string | null> = { name: userName };

    if (continent.trim()) {
        if (!validContinents.includes(continent.toLowerCase())) {
            setErrorContinent("invalid-continent");
            return;
        }
        updates.continent = continent;
    } else {
        updates.continent = null;
    }

    if (country.trim()) {
        if (!validCountries.includes(country.toLowerCase())) {
            setErrorCountry("invalid-country");
            return;
        }
        updates.country = country;
    } else {
        updates.country = null;
    }

    try {
        setIsLoading("loading");
        const userRef = doc(db, `travelers/${email}`);
        await updateDoc(userRef, updates);
        setIsLoading("check");
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        setIsLoading("initial");
    }
};
export const handleDeleteAccount = ({ setIsLoading }: DeleteAccountProps) => {
    Alert.alert(
        "Confirmação",
        "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        const currentUser = auth.currentUser;
                        if (!currentUser || !currentUser.email) {
                            Alert.alert("Erro", "Nenhum usuário autenticado.");
                            return;
                        }

                        setIsLoading("loading");

                        // Deletar os dados do usuário no Firestore
                        const userRef = doc(db, `travelers/${currentUser.email}`);
                        await deleteDoc(userRef);

                        // Tentar deletar a conta do Authentication
                        try {
                            await deleteUser(currentUser);
                            Alert.alert("Conta excluída", "Sua conta foi excluída.");
                            router.replace("/sign-in");
                        } catch (error: any) {
                            if (error.code === "auth/requires-recent-login") {
                                Alert.alert(
                                    "Reautenticação necessária",
                                    "Para excluir sua conta, faça login novamente.",
                                    [
                                        {
                                            text: "Ok",
                                            onPress: () => {
                                                router.replace("/sign-in");
                                            }
                                        }
                                    ]
                                );
                            } else {
                                throw error;
                            }
                        }
                    } catch (error: any) {
                        console.error("Erro ao excluir conta:", error);
                        Alert.alert("Erro", "Não foi possível excluir sua conta.");
                        setIsLoading("initial");
                    }
                }
            }
        ]
    );
};

export const fetchUserName = ({ setUserName }: FetchUserNameProps) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && user.email) {
            const docRef = doc(db, "travelers", user.email);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const firstName = docSnap.data().name.split(" ")[0];
                        setUserName(firstName);
                    } else {
                        console.log("Nenhum documento encontrado.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados:", error);
                });
        } else {
            setUserName("Visitante");
        }
    });

    return unsubscribe;
};

export const fetchSelectedDays = async ({ userEmail, tripId, setSelectedDays }: FetchSelectedDaysProps) => {
    if (!userEmail || !tripId) return;

    try {
        const tripRef = doc(db, `travelers/${userEmail}/trips/${tripId}`);
        const tripDoc = await getDoc(tripRef);

        if (tripDoc.exists()) {
            const tripData = tripDoc.data();
            const savedDates = Object.keys(tripData.dates || {});
            setSelectedDays(savedDates);
        }
    } catch (error: any) {
        console.error("Erro ao carregar os dias planejados:", error.message);
    }
};

export const handleAddDayPlan = async ({ userEmail, tripId, day, cityId, setSelectedDays }: HandleAddDayPlanProps) => {
    if (!userEmail || !tripId) {
        console.log("Usuário não autenticado ou ID da viagem ausente.");
        return;
    }

    const tripRef = doc(db, `travelers/${userEmail}/trips/${tripId}`);

    try {
        const tripDoc = await getDoc(tripRef);
        if (!tripDoc.exists()) {
            console.log("Viagem não encontrada.");
            return;
        }

        const travelData = tripDoc.data();
        const existingDates = travelData.dates || {};
        const dayExists = existingDates[day.dateString];

        if (dayExists) {
            const updatedDates = { ...existingDates };
            delete updatedDates[day.dateString];

            await updateDoc(tripRef, { dates: updatedDates });

            setSelectedDays((prevDays) => prevDays.filter((date) => date !== day.dateString));
        } else {
            const newDayPlan = {
                fastFood: 0,
                localFood: 0,
                taxiTax: 0,
                uberTax: 0,
                busTicket: 0,
            };

            const updatedDates = {
                ...existingDates,
                [day.dateString]: newDayPlan,
            };

            await updateDoc(tripRef, { dates: updatedDates });

            setSelectedDays((prevDays) => [...prevDays, day.dateString]);

            router.push(`/prices/${cityId}/${tripId}/${day.dateString}`);
        }
    } catch (error: any) {
        alert("Erro ao atualizar planejamento: " + error.message);
    }
};

export const handleDeleteDayPlan = async ({ userEmail, tripId }: HandleDeleteDayPlanProps) => {
    if (!userEmail || !tripId) {
        console.log("Usuário não autenticado ou ID da viagem ausente.");
        return;
    }

    const tripRef = doc(db, `travelers/${userEmail}/trips/${tripId}`);

    try {
        await deleteDoc(tripRef);
        router.replace("/trips"); // Redireciona para a tela de viagens
    } catch (error: any) {
        console.error("Erro ao excluir planejamento:", error.message);
        alert("Erro ao excluir planejamento: " + error.message);
    }
};

export const handlePlanWish = async ({ userEmail, item }: HandlePlanWishProps): Promise<void> => {
    if (!userEmail || !item) return;

    try {
        const tripRef = doc(collection(db, `travelers/${userEmail}/trips`));
        const tripId = tripRef.id;

        await setDoc(tripRef, {
            tripId,
            city: item[0].cityPt,
            dates: {},
        });

        router.push({
            pathname: "planning/[city]/[tripId]",
            params: { city: item[0].cityPt, tripId },
        });
    } catch (error) {
        console.error("Erro ao criar a viagem:", error);
    }
};