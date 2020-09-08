import React, {Component} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";

interface Props {
    onPress: () => void;
}

export default class BackButton extends Component<Props> {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Feather name="arrow-left" size={22} color="white"/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    titleBackText: {
        color: 'white',
        marginLeft: 8,
    },
    container: {
        width: 48,
        height: 48,
        paddingRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
