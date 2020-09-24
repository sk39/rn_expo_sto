import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native'
import commonStyles from "@common/utils/commonStyle";
import Colors from "@constants/Colors";
import {Button} from "react-native-elements";

interface Props {
    onCancel: () => void;
    onPress: () => void;
    btnText?: string;
    doneBtnStyle?: StyleProp<ViewStyle>
    doneBtnTitleStyle?: StyleProp<TextStyle>
}

export default class ConfirmContent extends PureComponent<Props> {

    static defaultProps = {
        btnText: t("btn.done")
    };

    render() {
        const {onCancel, onPress, btnText, doneBtnStyle, doneBtnTitleStyle} = this.props;
        return (
            <View style={[styles.content]}>
                <View>
                    {this.props.children}
                </View>
                <View style={styles.bottomBtnWrapper}>
                    <Button title={t("btn.cancel")}
                            raised
                            containerStyle={{flex: 1.2}}
                            buttonStyle={[styles.btnCancel]}
                            onPress={onCancel}
                    />
                    <Button title={btnText}
                            raised
                            containerStyle={{flex: 2, marginLeft: 8}}
                            buttonStyle={[styles.btnDone, doneBtnStyle]}
                            titleStyle={doneBtnTitleStyle}
                            onPress={onPress}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: "100%"
    },
    btn: commonStyles.modalBtn,
    btnText: {
        fontSize: 16,
        letterSpacing: 2
    },
    bottomBtnWrapper: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 16,
        width: "100%",
    },
    btnCancel: {
        backgroundColor: Colors.btn,
        height: 44,
    },
    btnDone: {
        backgroundColor: Colors.primary,
        height: 44,
    }
});
