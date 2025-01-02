import { SafeAreaView, ScrollView } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/navBar";
import { TravelList } from "../components/planning/travelList";
import { Header } from "../components/main/header";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Planning() {

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
            setUserName('Visitante'); // Valor padrão se o usuário não estiver autenticado
          }
        });
      
        return () => unsubscribe();
      }, []);
    
    return(
        <ScrollView>
            <SafeAreaView className="pb-10 bg-background">
                <Header/>
                <Welcome name={userName}/>
                <NavBar page="planning"/>
                <TravelList/>
            </SafeAreaView>
        </ScrollView>
    )
}