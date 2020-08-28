import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Colors from "@constants/Colors";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";

@inject("rootStore")
@observer
export default class NoAuthMessage extends Component<RootStoreProps> {

    static defaultProps = {
        show: false,
    };

    render() {
        const {auth} = this.props.rootStore;
        if (auth.loggedIn) {
            return null
        }

        return (
            <View style={styles.disablesLayer}>
                <View style={styles.noAuthMessageAreaWrapper}>
                    <View style={styles.noAuthMessageAreaWrapper}>
                        <View style={styles.noAuthMessageArea}>
                            <Text style={styles.noAuthMessage}>
                                Enabled after Sign in
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "rgba(247,246,255,0.66)",
        paddingTop: 34,
    },
    noAuthMessageAreaWrapper: {
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: "rgba(247,246,255,0.3)",
        borderRadius: 50,
    },
    noAuthMessageArea: {
        padding: 12,
        paddingHorizontal: 24,
        backgroundColor: "rgba(247,246,255,0.7)",
        borderRadius: 30,
    },
    noAuthMessage: {
        color: Colors.primaryColorDark,
        fontSize: 18,
        fontWeight: "700",
        opacity: 0.63
    }
});
