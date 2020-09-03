import React from "react";
import {StyleSheet} from "react-native";
import {Button, Icon} from "react-native-elements";
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";

export function KeyBtn(props) {
    const {title, disabled, onPress, mini} = props;
    return (
        <Button
            title={title}
            type={mini ? "clear" : "solid"}
            buttonStyle={mini ? styles.keyMini : styles.key}
            titleStyle={styles.keyText}
            disabledStyle={styles.keyDisable}
            disabledTitleStyle={styles.keyDisableText}
            disabled={disabled}
            onPressIn={onPress}
            onPress={() => {
            }}
        />
    )
}


export function KeyIconBtn(props) {
    const {iconName, iconType, disabled, onPress, mini} = props;
    const color = disabled ? styles.keyDisableText.color : styles.keyText.color;
    return (
        <Button
            icon={(
                <Icon name={iconName}
                      type={iconType}
                      color={color}
                      size={24}/>
            )}
            type={mini ? "clear" : "solid"}
            buttonStyle={mini ? styles.keyMini : styles.key}
            titleStyle={styles.keyText}
            disabledStyle={styles.keyDisable}
            disabledTitleStyle={styles.keyDisableText}
            disabled={disabled}
            onPressIn={onPress}
            onPress={() => {
            }}
        />
    )
}

const styles = StyleSheet.create({
    key: {
        width: (Layout.window.width - 24) / 3,
        height: 48,
        margin: 2,
        backgroundColor: Colors.backColor,
        borderWidth: 1,
        borderColor: Colors.primaryColorLight
    },
    keyMini: {
        width: 56,
        height: 48,
        margin: 2,
        // backgroundColor: Colors.backColor,
        // borderWidth: 1,
        // borderColor: Colors.primaryColorLight
    },
    keyText: {
        color: Colors.labelFont,
        fontSize: 22
    },
    keyDisable: {
        opacity: 0.4
    },
    keyDisableText: {
        color: "#888",
    }
});
