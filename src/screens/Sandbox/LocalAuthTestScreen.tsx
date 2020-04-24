import React, {Component} from 'react';
import {StyleSheet, Text} from "react-native"
import {Button, View} from "native-base";
import {observer} from "mobx-react";
import {observable} from "mobx";
import * as LocalAuthentication from 'expo-local-authentication';

@observer
export default class LocalAuthTestScreen extends Component<NavigationProps> {

    @observable status: string = "";

    async auth() {
        // const has = LocalAuthentication.hasHardwareAsync();
        // this.status = `Finish hasHardwareAsync, res=${has}`
        const types = LocalAuthentication.supportedAuthenticationTypesAsync();
        this.status = `Finish supportedAuthenticationTypesAsync, res=${JSON.stringify(types, null, "  ")}`

        const isEnrolled = LocalAuthentication.isEnrolledAsync();
        this.status += `\n\nisEnrolled=${JSON.stringify(isEnrolled, null, "  ")}`

        const ret = await LocalAuthentication.authenticateAsync({promptMessage: "Test Auth"});
        this.status += `\n\nFinish authenticateAsync, res=${JSON.stringify(ret, null, "  ")}`
    }

    render() {
        return (
            <View style={{flex: 1, padding: 16, flexDirection: "column", justifyContent: "flex-end"}}>
                <View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                    <Text style={styles.text}>{this.status}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    paddingVertical: 24,
                    justifyContent: "space-between"
                }}>
                    <Button style={{marginRight: 6, flex: 1}} block onPress={this.auth.bind(this)}>
                        <Text style={{color: "white"}}>Test Auth</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        marginBottom: 22,
    }
});
