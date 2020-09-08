import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {View} from "native-base";
import {Icon} from "react-native-elements";
import Colors from "@constants/Colors";
import ViewUtils from "@common/utils/ViewUtils";

@observer
export default class AssetImage extends Component {
    render() {
        return (
            <View style={styles.logoWrapper}>
                <View style={styles.logo1}>
                    <Icon name='home' type="feather" color={Colors.primaryColorLight2} size={240}/>
                </View>
                <View style={styles.logo2}>
                    <Icon name='home' type="feather" color={Colors.primaryColor} size={80}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logoWrapper: {
        position: "absolute",
        top: ViewUtils.getPagePaddingTop(),
        right: 0,
    },
    logo1: {
        position: "absolute",
        top: 0,
        right: -30,
        opacity: 0.09,
        zIndex: 2
    },
    logo2: {
        position: "absolute",
        top: 100,
        right: 14,
        opacity: 0.52,
        zIndex: 2
    },
});
