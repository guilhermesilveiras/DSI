import { PricesType } from "./prices";

export type PriceListType = {
        prices: PricesType | undefined;
        fastFood: number;
        setFastFood: (n: number) => void;
        localFood: number;
        setLocalFood: (n: number) => void;
        taxiTax: number;
        setTaxiTax: (n: number) => void;
        busTicket: number;
        setBusTicket: (n: number) => void;
        uberTax: number;
        setUberTax: (n: number) => void;
        total: number;
        setTotal: (n: number) => void;
}