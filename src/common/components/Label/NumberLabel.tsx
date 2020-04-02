import React, {Component} from "react";
import {Text} from "native-base";
import {Platform, StyleProp, StyleSheet, TextStyle} from "react-native";
import ViewUtils from "@common/utils/ViewUtils";
import s from "underscore.string";

interface Props {
    value?: number | string,
    decimals: number;
    prefix?: string,
    style?: StyleProp<TextStyle>
}

export default class NumberLabel extends Component<Props> {

    render() {
        const {value, decimals, prefix, style} = this.props;
        const stylesArr: any[] = [styles.text];
        const formattedVal = ViewUtils.numberFormat(value, decimals);
        if (Platform.OS === "ios" && s.contains(formattedVal, ",")) {
            stylesArr.push({marginBottom: -5})
        }
        stylesArr.push(style);

        return (
            <Text style={stylesArr}>
                {prefix} {formattedVal}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    }
});
