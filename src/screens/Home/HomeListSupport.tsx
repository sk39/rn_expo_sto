import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {inject, observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import BlockErrorMessage from "@common/components/PageSupport/BlockErrorMessage";

interface Props {
    processing: boolean;
    list: any[];
    needAuth?: boolean;
    errorMessage?: string;
    paddingTop?: number;
}

@inject("rootStore")
@observer
export default class HomeListSupport extends Component<Props & RootStoreProps> {

    static defaultProps = {
        paddingTop: 16,
        needAuth: false,
    };

    renderMessage(type, message) {
        const {paddingTop} = this.props;
        return (
            <View style={[styles.disablesLayer, {paddingTop}]}>
                <BlockErrorMessage type={type} message={message}/>
            </View>
        )
    }

    render() {
        const {processing, list, errorMessage, needAuth} = this.props;
        if (processing) {
            return (
                <BlockLoading
                    loading
                    disablesLayerColor="rgba(247,246,255,0.66)"/>
            )
        }

        const {auth} = this.props.rootStore;
        if (needAuth && !auth.loggedIn) {
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
        backgroundColor: "rgba(247,246,255,0.62)",
        paddingTop: 46,
    }
});
