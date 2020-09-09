import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    onPress: () => void;
}

export default class BackButtonIos extends Component<Props> {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={[styles.container, styles.shadow]}>
                    <Ionicons name="ios-arrow-back" size={22} color={"rgba(0,0,0,0.3)"}/>
                    <Text style={[styles.titleBackText, {color: "rgba(0,0,0,0.3)"}]}>
                        Back
                    </Text>
                </View>
                <Ionicons name="ios-arrow-back" size={22} color="white"/>
                <Text style={styles.titleBackText}>Back</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    titleBackText: {
        color: "white",
        marginLeft: 8,
    },
    container: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        paddingRight: 44,
    },
    shadow: {
        position: "absolute",
        zIndex: 0,
        top: 1,
        left: 1,
    }
});
