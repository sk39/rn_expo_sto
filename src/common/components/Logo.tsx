import React, {Component} from "react";
import {Image} from "react-native";

interface Props {
    size?: number,
    gray?: boolean;
}

export default class Logo extends Component<Props> {

    static defaultProps = {
        size: 92,
    };


    render() {
        const {size, gray} = this.props;
        const style = {height: size, width: size};
        if (gray) {
            return (
                <Image
                    style={style}
                    source={require('@assets/logoGray.png')}
                />
            )
        }
        return (
            <Image
                style={style}
                source={require('@assets/logo.png')}
            />
        )
    }
}

