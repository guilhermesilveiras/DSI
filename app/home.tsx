import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Welcome } from "../components/main/welcome";
import { NavBar } from "../components/main/navBar";
import { Search } from "../components/home/search";
import { Sugestions } from "../components/home/suggestions";
import { MostVisited } from "../components/home/mostVisited";
import { Header } from "../components/main/header";
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebaseConfig'; 
import { auth } from '../firebaseConfig'; 

export default function Home() {
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
  

  return (
    <ScrollView>
      <SafeAreaView className="pb-10 bg-background">
        <Header/>
        <Welcome name={userName} /> 
        <NavBar page="home"/>
        <Search/>
        <Sugestions/>
        <MostVisited/>
      </SafeAreaView>
    </ScrollView>
  );
}