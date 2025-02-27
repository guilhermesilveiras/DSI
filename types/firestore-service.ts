import { CityType } from "./city";
import { DateData } from "react-native-calendars";

export type PlanTripProps = {
    item: CityType;
};

export type FetchTripDataProps = {
    tripId: string | string[];
    formattedDate: string;
    setFastFood: (value: number) => void;
    setLocalFood: (value: number) => void;
    setTaxiTax: (value: number) => void;
    setUberTax: (value: number) => void;
    setBusTicket: (value: number) => void;
    setTotal: (value: number) => void;
};

export type HandleTripProps = {
    tripId: string | string[];
    formattedDate: string;
    fastFood?: number;
    localFood?: number;
    taxiTax?: number;
    uberTax?: number;
    busTicket?: number;
    total?: number;
};

export type handleDeletePlanProps = {
    tripId: string | string[];
    formattedDate: string
}


export type handlebackButtonProps = {
    tripId: string | string[];
    formattedDate: string;
    total: number
}

export type FetchUserDataProps = {
    setEmail: (email: string) => void;
    setUserName: (name: string) => void;
    setContinent: (continent: string) => void;
    setCountry: (country: string) => void;
};

export type SaveAccountProps = {
    email: string;
    userName: string;
    continent: string;
    country: string;
    validContinents: string[];
    validCountries: string[];
    setErrorName: (error: string) => void;
    setErrorContinent: (error: string) => void;
    setErrorCountry: (error: string) => void;
    setIsLoading: (state: "initial" | "loading" | "check") => void;
};

export type DeleteAccountProps = {
    setIsLoading: (state: "initial" | "loading" | "check") => void;
};

export type FetchUserNameProps = {
    setUserName: (name: string) => void;
};

export type FetchSelectedDaysProps = {
    userEmail: string | null;
    tripId: string;
    setSelectedDays: (days: string[]) => void;
};

export type HandleAddDayPlanProps = {
    userEmail: string | null;
    tripId: string;
    day: DateData;
    cityId: string | undefined;
    setSelectedDays: (days: (prevDays: string[]) => string[]) => void;
};

export type HandleDeleteDayPlanProps = {
    userEmail: string | null;
    tripId: string;
};

export type HandlePlanWishProps = {
    userEmail: string | null;
    item: CityType[];
};
