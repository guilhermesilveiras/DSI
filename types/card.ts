import { PricesType } from "./prices"

export type CardType = {
    id: string
    city: string
    country: string
    travelId?: string;  // Adiciona travelId como string
    email?: string;
    img: string,
    prices?: PricesType
}