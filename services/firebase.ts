import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);