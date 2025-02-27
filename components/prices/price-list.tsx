import React from "react";
import { View } from "react-native";
import { PriceCard } from "./price-card";
import { TotalCard } from "./totalCard";
import { PriceListType } from "../../types/price-list";

export class PriceList extends React.Component<PriceListType> {
    render() {
        const { 
            prices, fastFood, setFastFood, localFood, setLocalFood, 
            taxiTax, setTaxiTax, busTicket, setBusTicket, 
            uberTax, setUberTax, total, setTotal 
        } = this.props;

        return (
            <View className="mt-12 gap-6">
                <PriceCard
                    label="Refeição fastfood"
                    price={prices?.fastFood}
                    icon="food"
                    count={fastFood}
                    setCount={setFastFood}
                    total={total}
                    setTotal={setTotal}
                />
                <PriceCard
                    label="Refeição culinária local"
                    price={prices?.localFood}
                    icon="food-fork-drink"
                    count={localFood}
                    setCount={setLocalFood}
                    total={total}
                    setTotal={setTotal}
                />
                <PriceCard
                    label="Tarifa de táxi (Km)"
                    price={prices?.taxiTax}
                    icon="car"
                    count={taxiTax}
                    setCount={setTaxiTax}
                    total={total}
                    setTotal={setTotal}
                />
                <PriceCard
                    label="Passagem de ônibus"
                    price={prices?.busTicket}
                    icon="bus"
                    count={busTicket}
                    setCount={setBusTicket}
                    total={total}
                    setTotal={setTotal}
                />
                <PriceCard
                    label="Tarifa de uber (Km)"
                    price={prices?.uberTax}
                    icon="car-connected"
                    count={uberTax}
                    setCount={setUberTax}
                    total={total}
                    setTotal={setTotal}
                />
                <TotalCard label="Valor Total (U$)" icon="cash" count={total} />
            </View>
        );
    }
}