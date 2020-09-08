import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {inject, observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";

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
                    <View style={styles.messageBlock}>
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
        backgroundColor: "rgba(247,246,255,0.7)",
        paddingTop: 56,
    },
    messageAreaWrapper: {
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: "rgba(247,246,255,0.4)",
        // borderColor: "rgba(77,75,88,0.3)",
        // borderWidth: 1,
        borderRadius: 12,
    },
    messageBlock: {
        padding: 12,
        paddingHorizontal: 24,
        minWidth: "70%",
        alignItems: "center",
    },
    message: {
        color: "rgba(77,75,88,0.9)",
        fontSize: 16,
        fontWeight: "700",
        opacity: 0.63
    }
});
