import React, {PureComponent} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import InputCursor from "@common/components/Input/InputNumberPad/InputCursor";

interface Props {
    value: string;
    modal?: boolean;
    onPress?: () => void;
}

@observer
export default class CodePadLabel extends PureComponent<Props> {

    render() {
        const {onPress, value, modal} = this.props;
        const props: any = {}
        if (onPress) {
            props.onPressIn = onPress;
        } else {
            props.disabled = true
        }

        const blocks = [];
        const maxLength = 6;
        for (let i = 0; i < maxLength; i++) {
            blocks.push(<Block key={i} index={i} value={value} modal={modal}/>)
        }

        return (
            <TouchableOpacity {...props} onPress={() => {
            }}>
                <View style={styles.wrapper}>
                    {blocks}
                </View>
            </TouchableOpacity>
        )
    }
}

function Block(props) {
    const {index, value, modal} = props;
    let child = null;
    let text = value[index];
    if (modal && value.length === index) {
        child = <InputCursor barStyle={styles.cursor}/>
    }

    return (
        <View style={styles.input}>
            <View style={styles.cursorWrapper}>
                {child}
            </View>
            <Text style={styles.inputText}>
                {value[index] || ""}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        width: "100%"
    },
    input: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderColorDark,
        width: 32,
        height: 52,
        marginHorizontal: 5,
    },
    inputText: {
        fontSize: 40,
        fontFamily: "Roboto",
        color: Colors.primaryColor,
    },
    cursorWrapper: {
        position: "absolute",
        left: 0,
        bottom: 8,
    },
    cursor: {
        marginTop: 0,
        height: 30,
    }
});
