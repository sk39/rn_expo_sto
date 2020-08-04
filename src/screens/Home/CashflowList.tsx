import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";
import data from '@constants/dummyData/cashflow';
import userData from "@constants/dummyData/userInfo";
import Colors from "@constants/Colors";
import BlockLoading from "@common/components/BlockLoading";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";
import SimpleList from "@common/components/SimpleList";

@observer
export default class CashflowList extends Component<NavigationProps> {

    @observable processing = false;
    @observable list = [];

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.processing = true;
                this.list = [];
                setTimeout(() => {
                    this.processing = false;
                    let total = Number(userData.balance);
                    this.list = data.map(item => {
                        const totalBalance = total;
                        total = total - Number(item.cashBalance);
                        return Object.assign({}, item, {totalBalance})
                    });
                }, 1200)
            }
        );
    }

    renderItem({item, index}) {
        return (
            <AnimatedRow key={item.symbol + item.date} delay={32 * index}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.dateLabel}>{item.date}</Text>
                        <Text style={styles.eventLabel}>{item.name}</Text>
                    </View>
                    <View style={{alignItems: "flex-end"}}>
                        <NumberLabel
                            value={item.cashBalance}
                            decimals={0}
                            prefix={"$"}
                            style={styles.value}
                            prefixStyle={styles.unit}
                            sign
                        />
                        <View style={{height: 2}}/>
                        <NumberLabel
                            value={item.totalBalance}
                            decimals={0}
                            prefix={"Total $"}
                            style={styles.totalBalance}
                        />
                    </View>
                </View>
            </AnimatedRow>
        )
    }

    render() {
        return (
            <View style={{minHeight: 100}}>
                <BlockLoading
                    loading={this.processing}/>
                <SimpleList
                    data={this.list}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        // flex: 1,
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(15,20,92,0.08)",
    },
    dateLabel: {
        color: Colors.labelFontThin,
        fontSize: 12,
        letterSpacing: 1,
    },
    eventLabel: {
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        letterSpacing: 1,
    },
    unit: {
        color: Colors.labelFont,
        letterSpacing: 4,

    },
    totalBalance: {
        color: Colors.labelFont,
        fontSize: 10
    }
});
