import React, {PureComponent} from "react";
import {IconNode, Input as ElInput} from "react-native-elements";
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";
import InputState from "./InputState";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";

interface Props {
    inputState: InputState,
    label?: string;
    secureTextEntry?: boolean;
    leftIcon?: IconNode;
    inputStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    placeholder?: string;
}

@observer
export default class Input extends PureComponent<Props> {
    render() {
        const {
            inputState, label, inputStyle, containerStyle,
            secureTextEntry, leftIcon, placeholder
        } = this.props;
        return (
            <ElInput
                value={inputState.value}
                label={label}
                placeholder={placeholder}
                selectionColor={Colors.primary}
                leftIcon={leftIcon}
                inputStyle={[styles.input, inputStyle]}
                containerStyle={[styles.container, containerStyle]}
                secureTextEntry={secureTextEntry}
                errorStyle={styles.inputError}
                errorMessage={inputState.errorMsg}
                onChangeText={(v) => inputState.setValue(v)}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        color: Colors.font,
        paddingLeft: 8
    },
    container: {},
    inputError: {
        position: "absolute",
        bottom: 0,
        left: 12,
        color: "orangered"
    }
});
