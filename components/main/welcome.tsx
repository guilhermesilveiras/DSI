import { Text, View } from "react-native"
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";


export const Welcome = ()=> {
    const [userName, setUserName] = useState('');

    useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user && user.email) {
                    const docRef = doc(db, "travelers", user.email); 
                    getDoc(docRef)
              .then((docSnap) => {
                  if (docSnap.exists()) {
                      const firstName = docSnap.data().name.split(" ")[0]
                      setUserName(firstName); 
                    } else {
                        console.log("Nenhum documento encontrado.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados:", error);
                });
            } else {
                setUserName('Visitante');
            }
        });
        
        return () => unsubscribe();
    }, []);

    return(
        <View className="w-full px-10 pb-10">
            <Text className="text-4xl text-tertiary">
                Olá {userName}!
            </Text>
            <Text className="text-md text-zinc-500 mt-2">
                Comece a planejar sua viagem.
            </Text>
        </View>
    )
}