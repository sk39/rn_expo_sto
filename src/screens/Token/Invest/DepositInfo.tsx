import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native'
import NumberLabel from "@common/components/Label/NumberLabel";
import {observer} from "mobx-react";
import {RootStoreProps} from "@store/RootStoreProvider";
import InvestTokenState from "./InvestTokenState";
import Format from "@constants/Format";
import {Icon} from "react-native-elements";
import Colors from "@constants/Colors";
import {If} from "@common/components/PageSupport/If";
import commonStyles from "@common/utils/commonStyle";

interface Props {
    tokenState: InvestTokenState;
}

@observer
export default class DepositInfo extends PureComponent<RootStoreProps & Props> {

    render() {
        const {tokenState} = this.props;
        return (
            <View style={styles.rowContainer}>
                <NumberLabel value={tokenState.userDeposit}
                             style={styles.beforeText}
                             prefix={Format.baseCcySymbol}/>
                <If test={tokenState.afterUserDeposit != null}>
                    <View style={styles.afterContainer}>
                        <ArrowIcon/>
                        <NumberLabel value={tokenState.afterUserDeposit}
                                     style={styles.valueText}
                                     prefix={Format.baseCcySymbol}/>
                    </View>
                </If>
            </View>
        );
    }
}

function ArrowIcon() {
    return (
        <View style={styles.iconWrapper}>
            <Icon name={"arrow-right"}
                  type="feather"
                  color={Colors.labelFont}
                  size={16}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-end",
        padding: 4,
    },
    valueContainer: {
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        paddingLeft: 16
    },
    valueText: {
        ...commonStyles.amountLabel,
        color: Colors.primary,
    },
    beforeText: {
        ...commonStyles.amountLabel,
        color: Colors.labelFont,
    },
    iconWrapper: {
        paddingHorizontal: 8,
    },
    afterContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }
});

