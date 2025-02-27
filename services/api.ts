import axios from "axios";
import { CityType } from "../types/city";
import { Alert } from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FetchCitiesProps, FetchCityByNameProps, FetchCityDetailsByNameProps, FetchCityDetailsProps, FetchCityProps, FetchContinentsAndCountriesProps, FetchPopularCitiesProps, FetchSuggestionsProps } from "../types/api-service";

export const fetchCity = async ({city, setItem, setLoading}: FetchCityProps) => {
    try {
        if (city) {
            const response = await axios.get(
                `https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/name/${city}`
            );
            if (response.data.length > 0) {
                setItem(response.data[0]); // Pega a primeira cidade correspondente
            } else {
                Alert.alert("Erro", "Cidade não encontrada na API.");
            }
        }
    } catch (error) {
        console.error("Erro ao buscar cidade:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados da cidade.");
    } finally {
        setLoading(false);
    }
};

export const fetchCityByName = async ({ cityName, setSearchedCities, setIsLoading }: FetchCityByNameProps) => {
    if (!cityName.trim()) return;

    setIsLoading(true);

    try {
        const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/name/${cityName}`);
        setSearchedCities(response.data);
    } catch (error) {
        console.error("Erro ao buscar cidade:", error);
        setSearchedCities([]);
    } finally {
        setIsLoading(false);
    }
};

export const fetchCities = async ({setAvailableCities, setIsLoading}: FetchCitiesProps) => {
    try {
        const response = await axios.get("https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities");
        const cityNames = response.data.map((city: CityType) => city.cityPt.toLowerCase());
        setAvailableCities(cityNames)
        setIsLoading(false)
    } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setIsLoading(true);
    }
};

export const fetchCityData = async ({path, setItem}: FetchCityDetailsProps) => {
    try {
        if (!path) return;
        const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/${path}`);
        setItem(response.data);
    } catch (error) {
        console.error("Erro ao buscar detalhes da cidade:", error);
    }
};

export const fetchCityDataByName = async ({ city, setItem }: FetchCityDetailsByNameProps) => {
    try {
        const response = await axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/name/${city}`);
        setItem(response.data);
    } catch (error) {
        console.error("Erro ao buscar detalhes da cidade:", error);
    }
};


export const fetchCityDataById = async ({city, setItem, setLoading}: FetchCityProps) => {
    try {
        if (city) {
            const response = await axios.get(
                `https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/${city}`
            );
            if (response.data) {
                setItem(response.data);
            } else {
                Alert.alert("Erro", "Cidade não encontrada na API.");
            }
        }
    } catch (error) {
        console.error("Erro ao buscar cidade:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados da cidade.");
    } finally {
        setLoading(false);
    }
};

export const fetchContinentsAndCountries = async ({setValidContinents, setValidCountries}: FetchContinentsAndCountriesProps) => {
    try {
        const response = await axios.get("https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities");

        const continents = [...new Set(response.data.map((city: { continent: string }) => city.continent.toLowerCase()))];
        const countries = [...new Set(response.data.map((city: { country: string }) => city.country.toLowerCase()))];

        setValidContinents(continents);
        setValidCountries(countries);
    } catch (error) {
        console.error("Erro ao buscar continentes e países:", error);
    }
};


export const fetchPopularCities = async ({setDataTemp, setIsLoading}: FetchPopularCitiesProps) =>  {
    try {
        const response = await axios.get("https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/popular");
        setDataTemp(response.data)
        setIsLoading(false)
    } catch (error) {
        console.error("Erro ao buscar cidades populares:", error);
        setIsLoading(false)
    }
}

export const fetchSuggestions = async ({ setData, setLoading }: FetchSuggestionsProps) => {
    try {
        const db = getFirestore();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser || !currentUser.email) {
            throw new Error("Usuário não autenticado");
        }

        const userRef = doc(db, `travelers/${currentUser.email}`);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new Error("Dados do usuário não encontrados");
        }

        const userData = userDoc.data();
        const { continent, country } = userData;

        if (!continent && !country) {
            console.log("Preferências de viagem não definidas");
        }

        const countryPromise = axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/country/${country}`);
        const continentPromise = axios.get(`https://dsi-api-2-danielsantana47s-projects.vercel.app/api/cities/continent/${continent}`);

        const [countryResponse, continentResponse] = await Promise.all([countryPromise, continentPromise]);
        
        const uniqueData = [...countryResponse.data, ...continentResponse.data].reduce((acc, city) => {
            if (!acc.some((item: CityType) => item.id === city.id)) {
                acc.push(city);
            }
            return acc;
        }, [] as CityType[]);

        setData(uniqueData);
        setLoading(false);
    } catch (error) {
        console.error("Erro ao carregar sugestões:", error);
        setLoading(false);
    }
};


