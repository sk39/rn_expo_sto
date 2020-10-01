import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import BlockErrorMessage from "@common/components/PageSupport/BlockErrorMessage";
import AuthStore from "@store/AuthStore";

interface Props {
    processing: boolean;
    list: any[];
    auth?: AuthStore;
    errorMessage?: string;
    navigation?: Navigation
    onRefresh?: () => void;
}

@observer
export default class ListPageSupport extends Component<Props> {

    onAuthPress = () => {
        const {navigation} = this.props;
        return navigation.navigate("Login");
    }

    renderMessage(type, message, onPress) {
        if (onPress) {
            return (
                <View style={styles.disablesLayer}>
                    <TouchableOpacity onPress={onPress}>
                        <BlockErrorMessage type={type} message={message} large/>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.disablesLayer}>
                <BlockErrorMessage type={type} message={message} large/>
            </View>
        )
    }

    render() {
        const {processing, list, errorMessage, onRefresh} = this.props;
        const {auth} = this.props;
        if (auth && !auth.loggedIn) {
            return this.renderMessage("lock", t("msg.canAfterAuthed"), this.onAuthPress)
        }

        if (processing && (!list || list.length === 0)) {
            return (
                <BlockLoading
                    loading
                    disablesLayerColor="rgba(247,246,255,0.1)"/>
            )
        }

        if (!list || list.length === 0) {
            if (!s.isBlank(errorMessage)) {
                return this.renderMessage("error", errorMessage, onRefresh)
            }

            return this.renderMessage("empty", t("msg.noData"), onRefresh)
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
