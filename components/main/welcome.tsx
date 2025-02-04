import React, { Component } from "react";
import { Text, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

type State = {
    userName: string;
};

export class Welcome extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userName: "",
        };
    }

    componentDidMount() {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email) {
                const docRef = doc(db, "travelers", user.email);
                getDoc(docRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            const firstName = docSnap.data().name.split(" ")[0];
                            this.setState({ userName: firstName });
                        } else {
                            console.log("Nenhum documento encontrado.");
                        }
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar dados:", error);
                    });
            } else {
                this.setState({ userName: "Visitante" });
            }
        });

        // Cancela a inscrição ao desmontar o componente
        return () => unsubscribe();
    }

    render() {
        const { userName } = this.state;

        return (
            <View className="w-full px-10 pb-10">
                <Text className="text-4xl text-tertiary">Olá {userName}!</Text>
                <Text className="text-md text-zinc-500 mt-2">
                    Comece a planejar sua viagem.
                </Text>
            </View>
        );
    }
}
