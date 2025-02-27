import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDe4GjTCqlQI4S_0-Z0TOL3B6HlASFNdS4",
  authDomain: "atlas-22895.firebaseapp.com",
  databaseURL: "https://atlas-22895-default-rtdb.firebaseio.com",
  projectId: "atlas-22895",
  storageBucket: "atlas-22895.firebasestorage.app",
  messagingSenderId: "685620884774",
  appId: "1:685620884774:web:1d692b67f962aff5d37de7",
  measurementId: "G-FEP7GWT5FN"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços necessários
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore