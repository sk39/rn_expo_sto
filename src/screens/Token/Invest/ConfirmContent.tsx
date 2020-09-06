import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import DialogContent from "@common/components/Modal/ProcessDialog/DialogContent";
import {Icon} from "react-native-elements";
import InvestTokenState from "./InvestTokenState";
import InvestInfo from "./InvestInfo";


interface Props {
    tokenState: InvestTokenState;
    onDone: () => void;
    onCancel: () => void;
}

@observer
export default class ConfirmContent extends PureComponent<Props> {

    render() {
        const {onDone, onCancel, tokenState} = this.props;
        const item = tokenState.selectedItem;
        const amount = tokenState.amount;
        return (
            <DialogContent
                show
                cancelable
                btnText="Done"
                btnStyle={styles.btnStyle}
                btnTextStyle={styles.btnTextStyle}
                onPress={onDone}
                onCancel={onCancel}>
                <View style={styles.container}>
                    <Text style={styles.title}>Do you really want to invest?</Text>
                    <View style={styles.summaryWrapper}>
                        <View style={styles.summaryItem}>
                            <Icon name='dollar-sign' type="feather" color={Colors.primaryColor2} size={24}/>
                        </View>
                        <View style={{marginHorizontal: 6}}>
                            <Icon name='arrow-right' type="feather" color={Colors.primaryColor2} size={24}/>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryItemText}>{item.symbol}</Text>
                        </View>
                    </View>
                    <View style={styles.dataWrapper}>
                        <InvestInfo tokenState={tokenState} showAmount/>
                    </View>
                </View>
            </DialogContent>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 180,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.labelFont,
        letterSpacing: 0,
        marginBottom: 24
    },
    btnStyle: {
        backgroundColor: Colors.primaryColor,
    },
    btnTextStyle: {
        color: "white",
        fontWeight: "700"
    },
    dataWrapper: {
        width: "100%",
        paddingTop: 14
    },
    summaryWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        opacity: 0.8
    },
    summaryItem: {
        borderWidth: 3,
        borderColor: Colors.primaryColor2,
        // padding: 32,
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    summaryItemText: {
        color: Colors.primaryColor2,
        fontWeight: "700",
        fontSize: 12,
    }
});

