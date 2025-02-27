import React, { Component } from "react";
import { View } from "react-native";
import { NavButton } from "../main/nav-button";

type Props = {
    page: string;
};

export class PricesNavBar extends Component<Props> {
    renderNavButtons = (activePage: string) => {
        return (
            <View className="flex-row mt-12 flex-wrap justify-between items-center gap-4 px-10">
                <NavButton label="Tudo" active={activePage === "home"}/>
                <NavButton label="Transporte" active={activePage === "for-you"}/>
                <NavButton label="Alimentação" active={activePage === "planning"}/>
            </View>
        );
    };

    render() {
        const { page } = this.props;

        return (
            <>
                {page === 'tudo' && this.renderNavButtons('home')}
                {page === 'transporte' && this.renderNavButtons('for-you')}
                {page === 'alimentação' && this.renderNavButtons('planning')}
            </>
        );
    }
}
