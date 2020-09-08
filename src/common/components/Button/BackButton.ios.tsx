import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    onPress: () => void;
}

export default class BackButton extends Component<Props> {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Ionicons name="ios-arrow-back" size={22} color="white"/>
                <Text style={styles.titleBackText}>Back</Text>
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
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        paddingRight: 44,
    },
});
