import React from "react";
import { Text } from "react-native";

type Props = {
    label: string;
};

export class Description extends React.Component<Props> {
    render() {
        const { label } = this.props;

        return (
            <Text className="text-zinc-500 text-sm">{label}</Text>
        );
    }
}
