import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";

export function KeyBtn(props) {
    const {title, disabled, onPress, mini} = props;
    return (
        <View style={styles.keyBtnWrapper}>
            <Button
                title={title}
                type={mini ? "clear" : "solid"}
                buttonStyle={mini ? styles.keyMini : styles.key}
                titleStyle={styles.keyText}
                disabledStyle={styles.keyDisable}
                disabledTitleStyle={styles.keyDisableText}
                disabled={disabled}
                onPressIn={onPress}
                onPress={() => null}
            />
        </View>
    )
}


export function KeyIconBtn(props) {
    const {iconName, iconType, disabled, onPress, mini} = props;
    const color = disabled ? styles.keyDisableText.color : styles.keyText.color;
    return (
        <View style={styles.keyBtnWrapper}>
            <Button
                icon={(
                    <Icon name={iconName}
                          type={iconType}
                          color={color}
                          size={24}/>
                )}
                type={"clear"}
                buttonStyle={mini ? styles.keyMini : styles.keyIcon}
                titleStyle={styles.keyText}
                disabledStyle={styles.keyDisableIcon}
                disabledTitleStyle={styles.keyDisableText}
                disabled={disabled}
                onPressIn={onPress}
                onPress={() => null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    key: {
        width: (Layout.window.width - 8) / 3,
        height: 48,
        backgroundColor: Colors.back,
        borderWidth: 1,
        borderColor: Colors.listBorder
    },
    keyIcon: {
        width: (Layout.window.width - 8) / 3,
        height: 48,
    },
    keyMini: {
        width: 56,
        height: 52,
    },
    keyText: {
        color: Colors.font,
        fontSize: 22
    },
    keyDisable: {
        backgroundColor: "rgba(255,255,255,0.4)",
        // borderColor: "rgba(0,0,0,0)",
    },
    keyDisableIcon: {
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: "rgba(0,0,0,0)",
    },
    keyDisableText: {
        color: "#ccc",
    },
    keyBtnWrapper: {
        padding: 0,
    }
});
