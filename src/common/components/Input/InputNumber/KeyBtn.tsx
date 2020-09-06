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
                containerStyle={styles.container}
                buttonStyle={mini ? styles.keyMini : styles.key}
                titleStyle={styles.keyText}
                disabledStyle={styles.keyDisable}
                disabledTitleStyle={styles.keyDisableText}
                disabled={disabled}
                onPressIn={onPress}
                onPress={() => {
                }}
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
                disabledStyle={styles.keyDisable}
                disabledTitleStyle={styles.keyDisableText}
                disabled={disabled}
                onPressIn={onPress}
                onPress={() => {
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    key: {
        width: (Layout.window.width - 24) / 3,
        height: 48,
        backgroundColor: "rgba(227,227,248,0.1)",
        borderWidth: 1,
        borderColor: "rgba(227,227,248,0.7)"
    },
    container: {
        // ...getPlatformElevation(1)
    },
    keyIcon: {
        width: (Layout.window.width - 24) / 3,
        height: 48,
    },
    keyMini: {
        width: 56,
        height: 52,
    },
    keyText: {
        color: Colors.labelFont,
        fontSize: 22
    },
    keyDisable: {
        // opacity: 0.2,
        backgroundColor: "rgba(227,227,248,0)",
    },
    keyDisableText: {
        color: "#ccc",
    },
    keyBtnWrapper: {
        padding: 2,
    }
});
