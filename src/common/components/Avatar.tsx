import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

interface Props {
    size?: number,
    mailAddr?: string;
    demo?: boolean;
}

export default class Avatar extends Component<Props> {

    static defaultProps = {
        size: 60,
    };

    render() {
        const {size} = this.props;

        return (
            <View style={styles.imageWrapper}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageWrapper: {},
    image: {}
});
