import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import {computed} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";
import InputCursor from "@common/components/Input/InputNumber/InputCursor";
import commonStyles from "@common/utils/commonStyle";

interface Props {
    value: string,
    unit?: string;
    modal?: boolean;
    onPress?: () => void;
}

@observer
export default class NumberPadLabel extends Component<Props> {

    @computed
    get displayVal(): string {
        if (!this.props.value) {
            return "";
        }

        return ViewUtils.numberFormat(this.props.value)
    }

    render() {
        const {onPress, unit, modal} = this.props;
        const props: any = {}
        const styles = modal ? stylesModal : stylesNormal;
        if (modal) {
            props.disabled = true;
            if (unit) {
                props.icon = (
                    <View style={styles.iconWrapper}>
                        <InputCursor/>
                        <Text style={styles.unit}>{unit}</Text>
                    </View>
                );
                props.iconRight = true;
            }
        } else {
            props.onPressIn = onPress;
            if (unit) {
                props.icon = <Text style={styles.unit}>{unit}</Text>;
                props.iconRight = true;
            }
        }

        return (
            <Button
                {...props}
                title={this.displayVal}
                buttonStyle={styles.input}
                titleStyle={styles.title}
                disabledStyle={styles.input}
                disabledTitleStyle={styles.title}
                onPress={() => null}
            />
        )
    }
}

const stylesNormal = StyleSheet.create({
    input: {
        height: 44,
        width: "100%",
        justifyContent: "flex-end",
        backgroundColor: Colors.inputBack,
        borderColor: Colors.inputBorder,
        borderWidth: 1
    },
    title: {
        ...commonStyles.amountLabel,
        fontSize: 18,
        color: Colors.primary,
    },
    unit: {
        marginLeft: 8,
        marginTop: 6,
        marginRight: 8,
        opacity: 0.5
    },
    iconWrapper: {}
});

const stylesModal = StyleSheet.create({
    input: {
        height: 50,
        paddingHorizontal: 16,
        width: "100%",
        justifyContent: "flex-end",
        backgroundColor: Colors.inputBack,
        borderWidth: 0
    },
    title: {
        marginRight: 2,
        fontSize: 24,
        letterSpacing: 2,
        color: Colors.primary
    },
    unit: {
        marginLeft: 8,
        marginTop: 6,
        marginRight: 8,
        opacity: 0.5
    },
    iconWrapper: {
        flexDirection: "row"
    }
});
