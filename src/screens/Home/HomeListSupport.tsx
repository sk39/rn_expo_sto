import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {inject, observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";
import {Icon} from "react-native-elements";

interface Props {
    processing: boolean;
    list: any[];
}

@inject("rootStore")
@observer
export default class HomeListSupport extends Component<Props & RootStoreProps> {

    renderMessage(message) {
        return (
            <View style={styles.disablesLayer}>
                <View style={styles.messageAreaWrapper}>
                    <View style={styles.border}/>
                    <View style={styles.messageBlock}>
                        <View style={styles.iconWrapper}>
                            <View style={styles.iconCircle}>
                                <Icon name={"lock"}
                                      type="feather"
                                      color={"white"}
                                      size={18}/>
                            </View>
                        </View>
                        <Text style={styles.message}>
                            {message}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {processing, list} = this.props;
        if (processing) {
            return (
                <BlockLoading
                    loading
                    disablesLayerColor="rgba(247,246,255,0.66)"/>
            )
        }

        const {auth} = this.props.rootStore;
        if (!auth.loggedIn) {
            return this.renderMessage(t("msg.canAfterAuthed"))
        }

        if (!list || list.length === 0) {
            return this.renderMessage(t("msg.noData"))
        }
        return null;
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "rgba(247,246,255,0.8)",
        paddingTop: 46,
    },
    messageAreaWrapper: {
        paddingVertical: 26,
        width: Layout.window.width,
    },
    messageBlock: {
        alignItems: "center",
    },
    message: {
        color: Colors.second,
        fontSize: 16,
        opacity: 0.6,
        fontWeight: "700",
    },
    iconWrapper: {
        marginBottom: 12,
        backgroundColor: Colors.secondThin,
        borderRadius: 50,
        padding: 4,
    },
    iconCircle: {
        backgroundColor: Colors.second,
        borderRadius: 50,
        padding: 8,
    },
    border: {
        position: "absolute",
        height: 2,
        left: 0,
        right: 0,
        top: 48,
        zIndex: 0,
        backgroundColor: Colors.secondThin,
    }
});
