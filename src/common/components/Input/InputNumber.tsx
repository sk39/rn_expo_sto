import React, {PureComponent} from "react";
import {IconNode, Input as ElInput} from "react-native-elements";
import {StyleSheet, Text} from "react-native";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import InputNumberState from "@common/components/Input/InputNumberState";

interface Props {
    inputState: InputNumberState,
    label?: string;
    secureTextEntry?: boolean;
    leftIcon?: IconNode;
}

@observer
export default class InputNumber extends PureComponent<Props> {
    render() {
        const {inputState, label, secureTextEntry, leftIcon} = this.props;
        return (
            <ElInput inputStyle={styles.input}
                     label={label}
                     keyboardType='numeric'
                // selectionColor={Colors.primaryColor}
                     leftIcon={leftIcon}
                     rightIcon={<Text style={styles.unit}>{inputState.unit}</Text>}
                     containerStyle={styles.containerStyle}
                     labelStyle={styles.labelStyle}
                     inputContainerStyle={styles.inputContainerStyle}
                     secureTextEntry={secureTextEntry}
                     errorStyle={styles.inputError}
                     errorMessage={inputState.errorMsg}
                     onChangeText={(v) => inputState.setValue(v)}
                     maxLength={8}
                // selection={{start: 0, end: 0}}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 12,
        paddingVertical: 6,
        fontSize: 26,
        textAlign: "right",
        color: Colors.primaryColor,
        letterSpacing:1,
    },
    labelStyle: {
        marginBottom: 8
    },
    containerStyle: {
        width: 240,
        paddingBottom: 24,
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: Colors.primaryColorLight,
        backgroundColor: "#f6f7ff",
        borderRadius: 8,
    },
    inputError: {
        position: "absolute",
        bottom: 0,
        left: 12,
        color: "orangered"
    },
    unit: {
        color: "#888",
        marginRight: 11,
        fontSize: 14,
        // marginTop: 6,
        // marginLeft: 2,
        textAlign: "center"
    }
});
