import React, { Component } from "react";
import { View } from "react-native";
import { NavButton } from "./nav-button";

type Props = {
    page: string;
};

export class NavBar extends Component<Props> {
    renderNavButtons = (activePage: string) => {
        return (
            <View className="flex-row flex-wrap justify-between items-center gap-4 px-10">
                <NavButton label="Home" active={activePage === "home"} route="/home" />
                <NavButton label="Para você" active={activePage === "for-you"} route="/for-you" />
                <NavButton label="planejamento" active={activePage === "planning"} route="/travels" />
            </View>
        );
    };

    render() {
        const { page } = this.props;

        return (
            <>
                {page === 'home' && this.renderNavButtons('home')}
                {page === 'for-you' && this.renderNavButtons('for-you')}
                {page === 'travels' && this.renderNavButtons('planning')}
            </>
        );
    }
}
