import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {RootStoreProps} from "@store/RootStoreProvider";
import Layout from "@constants/Layout";
import {Icon} from "react-native-elements";
import Colors from "@constants/Colors";
import AnimatedShow from "@common/components/Animation/AnimatedShow";

interface Props {
    type: "error" | "warn" | "lock" | "empty";
    message?: string;
    large?: boolean;
}

export default class BlockErrorMessage extends Component<Props & RootStoreProps> {

    getAttr(type) {
        const {large} = this.props;
        const iconSize = large ? 26 : 18
        if (type === "lock") {
            return {
                icon: (
                    <Icon name="lock"
                          type="feather"
                          color={"white"}
                          size={iconSize}/>
                ),
                color: Colors.second,
                colorThin: Colors.secondThin
            }
        } else if (type == "warn") {
            return {
                icon: (
                    <Icon name="x"
                          type="feather"
                          color={"white"}
                          size={iconSize}/>
                ),
                color: Colors.second,
                colorThin: Colors.secondThin
            }
        } else if (type == "empty") {
            return {
                icon: (
                    <Icon name="file-text"
                          type="feather"
                          color={"white"}
                          size={iconSize}/>
                ),
                color: Colors.primary,
                colorThin: Colors.primaryThin
            }
        } else {
            return {
                icon: (
                    <Icon name="x"
                          type="feather"
                          color={"white"}
                          size={iconSize}/>
                ),
                color: Colors.error,
                colorThin: Colors.errorThin
            }
        }
    }

    render() {
        const {type, message, large} = this.props;
        const attr = this.getAttr(type);
        return (
            <AnimatedShow show={!s.isBlank(message)}>
                <View style={styles.messageAreaWrapper}>
                    <View style={styles.imageBlock}>
                        <View style={styles.borderWrapper}>
                            <View style={[styles.border, {backgroundColor: attr.colorThin}]}/>
                        </View>
                        <View style={[styles.iconWrapper, {backgroundColor: attr.colorThin}]}>
                            <View style={[styles.iconCircle, {
                                backgroundColor: attr.color,
                                padding: large ? 12 : 8
                            }]}>
                                {attr.icon}
                            </View>
                        </View>
                    </View>
                    <View style={styles.messageBlock}>
                        <Text style={[styles.message, {
                            color: attr.color,
                            fontSize: large ? 20 : 16
                        }]}>
                            {message}
                        </Text>
                    </View>
                </View>
            </AnimatedShow>
        )
    }
}

const styles = StyleSheet.create({
    messageAreaWrapper: {
        paddingVertical: 26,
        width: Layout.window.width,
    },
    imageBlock: {
        alignItems: "center",
    },
    messageBlock: {
        alignItems: "center",
        paddingTop: 12,
    },
    message: {
        opacity: 0.6,
        fontWeight: "700",
    },
    iconWrapper: {
        borderRadius: 50,
        padding: 4,
    },
    iconCircle: {
        borderRadius: 50,
        padding: 8,
    },
    borderWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
    },
    border: {
        height: 2,
        width: Layout.window.width,
    }
});
