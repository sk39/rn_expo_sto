import React, {Component} from "react";
import {Modal, StyleSheet, View} from "react-native";
import Colors from "@constants/Colors";

interface Props {
    show?: boolean,
    disablesLayerBackgroundColor?: string,
}

export default class DisableLayer extends Component<Props> {

    static defaultProps = {
        show: false,
        disablesLayerBackgroundColor: Colors.disablesLayer
    };

    render() {
        const {show, disablesLayerBackgroundColor} = this.props;
        return (
            <Modal transparent
                   animationType="none"
                   visible={show}
                   onRequestClose={() => null}>
                <View style={[
                    styles.disablesLayer,
                    {backgroundColor: disablesLayerBackgroundColor}
                ]}>
                    {this.props.children}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
