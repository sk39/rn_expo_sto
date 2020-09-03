import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {Icon} from "react-native-elements";
import Colors from "@constants/Colors";

interface Props {
    processing: boolean;
    list: any[];
}

@observer
export default class ListPageSupport extends Component<Props> {

    renderNoData() {
        return (
            <View style={styles.disablesLayer} pointerEvents="none">
                <View style={styles.messageAreaWrapper}>
                    <View style={styles.messageBlock}>
                        <View style={styles.iconWrapper}>
                            <Icon name='smartphone'
                                  type="feather"
                                  size={200}/>
                        </View>
                        <Text style={styles.message}>
                            {t("msg.noData")}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {processing, list} = this.props;
        if (processing) {
            return (
                <BlockLoading
                    loading
                    disablesLayerColor="rgba(247,246,255,0.1)"/>
            )
        }

        if (!list || list.length === 0) {
            return this.renderNoData()
        }
        return null;
    }
}

const styles = StyleSheet.create({
    disablesLayer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    messageAreaWrapper: {
        opacity: 0.7,
    },
    messageBlock: {
        alignItems: "center",
        justifyContent: "center",
    },
    message: {
        color: Colors.fontColor,
        fontSize: 52,
        fontWeight: "700",
    },
    iconWrapper: {
        paddingBottom: 12
    }
});
