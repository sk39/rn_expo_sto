import React, {Component} from 'react';
import {Clipboard, Share, StyleSheet, Text} from "react-native"
import {Button, View} from "native-base";
import {observer} from "mobx-react";
import {observable} from "mobx";
import PushNotification from "@common/plugins/PushNotification";

@observer
export default class PushTestScreen extends Component<NavigationProps> {

    @observable status: string = "";
    @observable token: string = "(Not get Token)";

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => this.register()
        );
    }

    async register() {
        this.status = "Start register...";
        try {
            this.token = await PushNotification.register();
            this.status = "Finish register!";
        } catch (e) {
            this.status = e.toString();
        }
    }

    setClipboard() {
        Clipboard.setString(this.token);
    }

    async share() {
        try {
            const result = await Share.share({
                message: this.token,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <View style={{flex: 1, padding: 16, flexDirection: "column", justifyContent: "flex-end"}}>
                <View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                    <Text style={styles.text}>{this.status}</Text>
                    <Text>{this.token}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    paddingVertical: 24,
                    justifyContent: "space-between"
                }}>
                    <Button style={{marginRight: 6, flex: 1}} block onPress={this.setClipboard.bind(this)}>
                        <Text style={{color: "white"}}>Copy to Clipboard</Text>
                    </Button>
                    <Button style={{marginLeft: 6, flex: 1}} block onPress={this.share.bind(this)}>
                        <Text style={{color: "white"}}>Share</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        marginBottom: 22,
    }
});
