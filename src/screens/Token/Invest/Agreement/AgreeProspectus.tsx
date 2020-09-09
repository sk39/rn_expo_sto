import React, {PureComponent} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import InvestTokenState from "../InvestTokenState";
import Skeleton from "@common/components/PageSupport/Skeleton";
import Layout from "@constants/Layout";
import Colors from "@constants/Colors";
import {Button} from "react-native-elements";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    tokenState: InvestTokenState,
    onClose: () => void;
}

@observer
export default class AgreeProspectus extends PureComponent<Props> {

    agreed = () => {
        const {tokenState, onClose} = this.props;
        tokenState.setAgreed(true)
        onClose();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Prospectus</Text>
                </View>
                <ScrollView style={styles.contents}>
                    <Skeleton line={13}/>
                    <Skeleton line={80}/>
                </ScrollView>
                <View style={styles.footer}>
                    <Button
                        title={t("btn.cancel")}
                        type="clear"
                        titleStyle={{color: Colors.labelFont}}
                        buttonStyle={styles.bottomBtn}
                        onPress={this.props.onClose}
                    />
                    <Button
                        title="Agree"
                        type="clear"
                        titleStyle={{color: Colors.primary, fontWeight: "700"}}
                        buttonStyle={styles.bottomBtn}
                        onPress={this.agreed}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Layout.window.height - 108,
        backgroundColor: Colors.back,
        // paddingHorizontal: 8,
        // paddingBottom: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    titleWrapper: {
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder
    },
    title: {
        fontSize: 18,
        color: Colors.labelFont,
        fontWeight: "700",
        letterSpacing: 1
    },
    contents: {
        flex: 1,
        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: Colors.listBorderDark,
        backgroundColor: Colors.back,
        padding: 6,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: Colors.listBorder,
        paddingBottom: ViewUtils.getBottomBtnPaddingBottom()
    },
    bottomBtn: {
        height: 56,
        width: (Layout.window.width) / 2,

    }
});
