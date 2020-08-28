import React, {PureComponent} from "react";
import {Input as ElInput} from "react-native-elements";
import {Platform, StyleSheet, View} from "react-native";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import InputState from "@common/components/Input/InputState";

interface Props {
    inputState: InputState,
    label?: string;
}

@observer
export default class InputCode extends PureComponent<Props> {

    render() {
        const bars = [];
        const maxLength = 6;
        for (let i = 0; i < maxLength; i++) {
            bars.push(<View key={i} style={styles.bar}/>)
        }
        const {inputState, label} = this.props;
        return (
            <View>
                <ElInput inputStyle={styles.input}
                         value={inputState.value}
                         label={label}
                         keyboardType='numeric'
                         returnKeyType='done'
                         containerStyle={styles.containerStyle}
                         labelStyle={styles.labelStyle}
                         inputContainerStyle={styles.inputContainerStyle}
                         errorStyle={styles.inputError}
                         errorMessage={inputState.errorMsg}
                         onChangeText={(v) => inputState.setValue(v)}
                         maxLength={maxLength}
                />
                <View style={styles.barArea}>
                    {bars}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 40,
        textAlign: "left",
        color: Colors.primaryColor,
        letterSpacing: 22,
        fontFamily: "Roboto"
    },
    labelStyle: {
        marginBottom: 8
    },
    containerStyle: {
        width: 300,
        // backgroundColor: "rgba(255,0,0,0.3)",
        ...Platform.select({
            ios: {
                marginLeft: 10
            }
        })
    },
    inputContainerStyle: {
        borderWidth: 0,
        borderColor: "rgba(0,0,0,0)",
    },
    inputError: {
        position: "absolute",
        bottom: 0,
        left: 12,
        color: "orangered"
    },
    barArea: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 24,
        paddingHorizontal: 16,
    },
    bar: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.labelFontThin,
        opacity: 0.4,
        ...Platform.select({
            ios: {
                width: 34,
                marginRight: 10.5,
            },
            android: {
                width: 34,
                marginRight: 11,
            }
        })
    }
});
