import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    color?: string;
    shadowColor?: string;
    onPress: () => void;
}

export default class BackButtonIos extends Component<Props> {

    static defaultProps = {
        color: "white",
        shadowColor: "rgba(0,0,0,0.3)",
    };

    render() {
        const {color, shadowColor, onPress} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={[styles.container, styles.shadow]}>
                    <Ionicons name="ios-arrow-back" size={22} color={shadowColor}/>
                    <Text style={[styles.titleBackText, {color: shadowColor}]}>
                        Back
                    </Text>
                </View>
                <Ionicons name="ios-arrow-back" size={22} color={color}/>
                <Text style={[styles.titleBackText, {color}]}>Back</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    titleBackText: {
        marginLeft: 8,
        opacity: 0.82
    },
    container: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 6,
        paddingRight: 44,
    },
    shadow: {
        position: "absolute",
        zIndex: 0,
        top: 1,
        left: 1,
    }
});
