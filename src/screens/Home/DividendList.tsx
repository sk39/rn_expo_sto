import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";
import data from '@constants/dummyData/dividends';
import Colors from "@constants/Colors";
import BlockLoading from "@common/components/BlockLoading";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import NumberLabel from "@common/components/Label/NumberLabel";

@observer
export default class DividendList extends Component<NavigationProps> {

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
                    this.list = data;
                }, 1200)
            }
        );
    }

    renderItem({item, index}) {
        return (
            <AnimatedRow delay={32 * index}>
                <View style={styles.row}>
                    <Text style={styles.label}>{item.date}{"         "}{item.name}</Text>
                    <NumberLabel
                        value={item.cashBalance}
                        decimals={0}
                        prefix={"$"}
                        style={styles.value}
                    />
                </View>
            </AnimatedRow>
        )
    }

    render() {
        return (
            <View style={{minHeight: 100}}>
                <BlockLoading
                    loading={this.processing}/>
                <FlatList
                    data={this.list}
                    keyExtractor={item => item.symbol + item.date}
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
    label: {
        color: Colors.labelFont,
        fontSize: 16,
    },
    value: {
        color: Colors.primaryColor,
        fontWeight: "700",
        fontSize: 16
    },
    unit: {
        color: Colors.primaryColorThin,
        opacity: 0.8
    }
});
