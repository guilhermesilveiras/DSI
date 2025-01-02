import { SafeAreaView, ScrollView } from "react-native";
import { NavBar } from "../components/main/navBar";
import { Welcome } from "../components/main/welcome";
import { SearchPrice } from "../components/for-you/searchPrice";
import { SugestionsForYou } from "../components/for-you/suggestionsForYou";
import { OtherRoutes } from "../components/for-you/otherRoutes";
import { Header } from "../components/main/header";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ForYou () {
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
                <NavBar page="for-you"/>
                <SearchPrice/>
                <SugestionsForYou/>
                <OtherRoutes/>
            </SafeAreaView>
        </ScrollView>
    )
}