import React, {Component} from "react";
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";
import Colors from "@constants/Colors";
import {Portal} from "react-native-portalize";

interface Props {
    show?: boolean;
    disablesLayerBackgroundColor?: string;
    cancelable?: boolean;
    close?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default class DisableLayer extends Component<Props> {

    static defaultProps = {
        show: false,
        disablesLayerBackgroundColor: Colors.disablesLayer
    };

    close = () => {
        const {close} = this.props;
        if (close) {
            close();
        }
    }

    render() {
        const {show, disablesLayerBackgroundColor, cancelable, style} = this.props;
        if (!show) {
            return null;
        }
        return (
            <Portal>
                <View style={[styles.disablesLayer, {backgroundColor: disablesLayerBackgroundColor}, style]}>
                    <TouchableOpacity style={styles.cancelable}
                                      disabled={!cancelable}
                                      onPress={this.close}/>
                    {this.props.children}
                </View>
            </Portal>
        )
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelable: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
});
