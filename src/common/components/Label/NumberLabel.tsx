import React, {Component} from "react";
import {Text} from "native-base";
import {Platform, StyleProp, StyleSheet, TextStyle, View} from "react-native";
import ViewUtils from "@common/utils/ViewUtils";
import s from "underscore.string";
import {Icon} from "react-native-elements";
import Colors from "@constants/Colors";

interface Props {
    value?: number | string,
    decimals: number;
    prefix?: string,
    suffix?: string;
    sign?: boolean;
    style?: StyleProp<TextStyle>;
    prefixStyle?: StyleProp<TextStyle>;
    suffixStyle?: StyleProp<TextStyle>;
}

export default class NumberLabel extends Component<Props> {

    renderPrefix(stylesArr) {
        const {prefix, prefixStyle} = this.props;
        if (!prefix) {
            return null;
        }

        return <Text style={[stylesArr, prefixStyle, styles.prefix]}>{prefix}</Text>
    }

    renderSuffix(stylesArr) {
        const {suffix, suffixStyle} = this.props;
        if (!suffix) {
            return null;
        }

        return <Text style={[stylesArr, suffixStyle, styles.suffix]}>{suffix}</Text>
    }

    renderSign() {
        const {value, sign} = this.props;
        if (!sign) {
            return null;
        }

        let color, iconName;
        if (Number(value) >= 0) {
            color = Colors.positiveColor;
            iconName = 'plus';
        } else {
            color = Colors.negativeColor;
            iconName = 'minus';
        }

        return (
            <View style={{marginLeft: 4}}>
                <Icon name={iconName}
                      type="feather"
                      color={color}
                      size={16}/>
            </View>
        )

    }

    render() {
        const {value, decimals, style, sign} = this.props;
        const stylesArr: any[] = [styles.text];
        let formattedVal;
        if (sign && Number(value) < 0) {
            formattedVal = ViewUtils.numberFormat((Number(value) * -1), decimals);
        } else {
            formattedVal = ViewUtils.numberFormat(value, decimals);
        }

        if (Platform.OS === "ios" && s.contains(formattedVal, ",")) {
            stylesArr.push({marginBottom: -5})
        }
        stylesArr.push(style);

        return (
            <View style={{flexDirection: "row", alignItems: "center"}}>
                {this.renderPrefix(stylesArr)}
                <Text style={stylesArr}>
                    {formattedVal}
                </Text>
                {this.renderSuffix(stylesArr)}
                {this.renderSign()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    },
    prefix: {},
    suffix: {}
});
