import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {inject, observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import BlockErrorMessage from "@common/components/PageSupport/BlockErrorMessage";

interface Props {
    processing: boolean;
    list: any[];
    errorMessage?: string;
}

@inject("rootStore")
@observer
export default class HomeListSupport extends Component<Props & RootStoreProps> {

    renderMessage(type, message) {
        return (
            <View style={styles.disablesLayer}>
                <BlockErrorMessage type={type} message={message}/>
            </View>
        )
    }

    render() {
        const {processing, list, errorMessage} = this.props;
        if (processing) {
            return (
                <BlockLoading
                    loading
                    disablesLayerColor="rgba(247,246,255,0.66)"/>
            )
        }

        const {auth} = this.props.rootStore;
        if (!auth.loggedIn) {
            return this.renderMessage("lock", t("msg.canAfterAuthed"))
        }

        if (!list || list.length === 0) {
            if (!s.isBlank(errorMessage)) {
                return this.renderMessage("error", errorMessage)
            }

            return this.renderMessage("empty", t("msg.noData"))
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
    }
});
