import { PricesType } from "./prices"

export type CardType = {
    id: string;
    city: string;
    cityPt: string;
    country: string;
    continent: 'America' | 'Europe' | 'Asia' | 'Africa' | 'Ociania';
    img: string;
    subRegion?: 'South America' | 'North America' | 'Central America';
    description: string;
    popular?: boolean;
    prices: PricesType;
    location: {
        latitude: number;
        longitude: number;
    };
}