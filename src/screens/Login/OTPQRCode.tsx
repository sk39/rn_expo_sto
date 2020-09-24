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
                    <Text style={styles.explanation}>
                        {t("screen.setup2fa.explanationQRCode")}
                    </Text>
                </View>
                <View style={styles.qrWrapper}>
                    <QRCode
                        size={160}
                        value={this.props.otpauth}
                    />
                </View>
                <View>
                    <Text style={styles.label}>{t("screen.setup2fa.accountCode")}</Text>
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
    explanation: {
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
        fontSize: 16,
        letterSpacing: 3,
        color: Colors.primaryDark,
    },
    valueWrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 12,
    },
    valueBack: {
        marginTop: 10,
        backgroundColor: Colors.primaryThin,
        opacity: 0.7,
        padding: 8,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    }
});
