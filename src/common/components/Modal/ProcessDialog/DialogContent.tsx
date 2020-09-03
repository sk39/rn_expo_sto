import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native'
import {Button, Text} from "native-base";
import {observer} from "mobx-react";
import AnimatedShow from "@common/components/Animation/AnimatedShow";
import commonStyles from "@common/utils/commonStyle";

interface Props {
    show: boolean;
    cancelable?: boolean;
    style?: any,
    btnStyle?: any;
    btnTextStyle?: any;
    btnText?: string;
    onPress?: (e?) => void;
    onCancel?: (e?) => void;
}

@observer
export default class DialogContent extends PureComponent<Props> {

    renderBottom() {
        const {cancelable, btnStyle, btnTextStyle, btnText, onPress, onCancel} = this.props;
        if (cancelable) {
            return (
                <View style={styles.bottomBtnWrapper}>
                    <Button block style={[styles.btnConfirm, {flex: 1.3}]} onPress={onCancel}>
                        <Text style={[styles.btnText, btnTextStyle]}>Cancel</Text>
                    </Button>
                    <Button block style={[styles.btnConfirm, btnStyle, {flex: 2}]}
                            onPress={onPress}>
                        <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
                    </Button>
                </View>
            )
        } else if (btnText && onPress) {
            return (
                <Button block style={[styles.btn, btnStyle]} onPress={onPress}>
                    <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
                </Button>
            )
        }
        return <View style={{height: 44}}/>;
    }

    render() {
        const {show, style} = this.props;
        return (
            <View style={[styles.content, style]}>
                <AnimatedShow show={show}>
                    <View style={styles.body}>
                        {this.props.children}
                    </View>
                    {this.renderBottom()}
                </AnimatedShow>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        content: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0
        },
        body: {
            padding: 16,
            flex: 1,
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
        },
        btnConfirm: {
            backgroundColor: "#afafaf",
            flex: 1,
            marginHorizontal: 4,
        }
    });
