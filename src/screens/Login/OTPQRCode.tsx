import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {observer} from "mobx-react";
import {View} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import Colors from "@constants/Colors";
import {computed} from "mobx";

interface Props {
    otpauth: string;
}

@observer
export default class OTPQRCode extends Component<Props> {

    @computed
    get accountCode() {
        if (!this.props.otpauth || this.props.otpauth.length === 0) {
            return "-------------"
        }
        return this.props.otpauth.match("secret=([^&]+)&(.+)")[1]
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.disp}>Please register the following account to the authentication
                        application.</Text>
                </View>
                <View style={styles.qrWrapper}>
                    <QRCode
                        size={160}
                        value={this.props.otpauth}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Account Code</Text>
                    <View style={styles.valueWrapper}>
                        <View style={styles.valueBack}>
                            <Text style={styles.value}>{this.accountCode}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    disp: {
        fontSize: 16,
        color: Colors.labelFontThin
    },
    qrWrapper: {
        padding: 24,
        paddingBottom: 36,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
        color: Colors.labelFontThin
    },
    value: {
        fontSize: 20,
        letterSpacing: 3,
        color: Colors.primaryColorDark,
    },
    valueWrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 12,
    },
    valueBack: {
        marginTop: 10,
        backgroundColor: Colors.primaryColorThin2,
        opacity: 0.7,
        padding: 8,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    }

});
