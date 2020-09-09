import React, {PureComponent} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import InputCursor from "@common/components/Input/InputNumber/InputCursor";

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

        let child = null;
        if (modal && value.length === 6) {
            child = <InputCursor barStyle={styles.cursor}/>
        }

        return (
            <TouchableOpacity {...props} onPress={() => {
            }}>
                <View style={styles.wrapper}>
                    {blocks}
                    <View style={styles.lastCursorWrapper}>
                        <View style={styles.cursorWrapper}>
                            {child}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

function Block(props) {
    const {index, value, modal} = props;
    let child = null;
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
        borderBottomColor: Colors.listBorderDark,
        width: 32,
        height: 52,
        marginHorizontal: 5,
    },
    inputText: {
        fontSize: 40,
        fontFamily: "Roboto",
        color: Colors.primary,
    },
    cursorWrapper: {
        position: "absolute",
        left: 0,
        bottom: 8,
    },
    lastCursorWrapper: {
        height: 52,
    },
    cursor: {
        marginTop: 0,
        height: 30,
    }
});
