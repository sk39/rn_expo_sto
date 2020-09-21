import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import BlockErrorMessage from "@common/components/PageSupport/BlockErrorMessage";
import AuthStore from "@store/AuthStore";

interface Props {
    processing: boolean;
    list: any[];
    auth?: AuthStore;
    errorMessage?: string;
}

@observer
export default class ListPageSupport extends Component<Props> {

    renderMessage(type, message) {
        return (
            <View style={styles.disablesLayer} pointerEvents="none">
                <BlockErrorMessage type={type} message={message} large/>
            </View>
        )
    }

    render() {
        const {processing, list, errorMessage} = this.props;
        if (processing && (!list || list.length === 0)) {
            return (
                <BlockLoading
                    loading
                    disablesLayerColor="rgba(247,246,255,0.1)"/>
            )
        }

        const {auth} = this.props;
        if (auth && !auth.loggedIn) {
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
        justifyContent: "center"
    }
});
