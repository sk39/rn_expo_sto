import React, {Component} from 'react';
import {Share, StyleSheet, Text} from "react-native"
import {Button, View} from "native-base";
import {observer} from "mobx-react";
import {BarCodeScanner} from 'expo-barcode-scanner';
import {action, observable} from "mobx";

@observer
export default class QRTestScreen extends Component {

    @observable hasPermission: boolean = null;
    @observable scanned: boolean = null;
    @observable type: string;
    @observable data: string;

    async componentDidMount() {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        this.hasPermission = (status === 'granted');
    }

    @action
    handleBarCodeScanned({type, data}) {
        this.type = type;
        this.data = data;
        this.scanned = true;
    }

    @action
    clear() {
        this.type = null;
        this.data = null;
        this.scanned = false;
    }

    async share() {
        try {
            const result = await Share.share({
                message: JSON.stringify(this.data),
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

    renderContents() {
        const {hasPermission, scanned, data, type} = this;
        if (hasPermission === null) {
            return (
                <View style={{minHeight: 200, padding: 24}}>
                    <Text style={styles.text}>Requesting for camera permission</Text>
                </View>
            )
        } else if (hasPermission === false) {
            return (
                <View style={{minHeight: 200, padding: 24}}>
                    <Text style={styles.text}>No access to camera</Text>
                </View>
            )
        } else if (scanned) {
            return (
                <View style={{minHeight: 200, padding: 24}}>
                    <Text style={styles.text}>
                        Loaded!
                    </Text>
                    <Text style={styles.text}>
                        {`type=${type}`}
                    </Text>
                    <Text style={styles.text}>
                        {`data=${data}`}
                    </Text>
                </View>
            )
        } else {
            return (
                <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeScanned={this.handleBarCodeScanned.bind(this)}
                    style={{flex: 1}}
                />
            )
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 80,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                {this.renderContents()}
                <View style={{
                    flexDirection: "row",
                    padding: 24,
                    justifyContent: "space-between"
                }}>
                    <Button style={{marginRight: 6, flex: 1}} block disabled={!this.scanned}
                            onPress={this.clear.bind(this)}>
                        <Text style={{color: "white"}}>Clear</Text>
                    </Button>
                    <Button style={{marginLeft: 6, flex: 1}} block disabled={!this.scanned}
                            onPress={this.share.bind(this)}>
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
    }
});
