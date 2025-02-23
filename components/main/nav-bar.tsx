import React, { Component } from "react";
import { View } from "react-native";
import { NavButton } from "./nav-button";

type Props = {
    page: string;
};

export class NavBar extends Component<Props> {
    renderNavButtons = (activePage: string) => {
        return (
            <View className="flex-row flex-wrap justify-between items-center gap-4 px-8">
                <NavButton label="Home" active={activePage === "home"} route="/home" />
                <NavButton label="Para você" active={activePage === "search"} route="/search" />
                <NavButton label="planejamento" active={activePage === "planning"} route="/trips" />
            </View>
        );
    };

    render() {
        const { page } = this.props;

        return (
            <>
                {page === 'home' && this.renderNavButtons('home')}
                {page === 'search' && this.renderNavButtons('search')}
                {page === 'travels' && this.renderNavButtons('planning')}
            </>
        );
    }
}
