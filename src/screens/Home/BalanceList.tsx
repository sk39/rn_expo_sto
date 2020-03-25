import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";
import data from '@constants/dummyData/balances';
import Colors from "@constants/Colors";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import BlockLoading from "@common/components/BlockLoading";
import {ActionSheet, Icon} from "native-base";

@observer
export default class BalanceList extends Component<NavigationProps> {

    @observable processing = false;
    @observable list = [];

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.onSelect = this.onSelect.bind(this);
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
                }, 800)
            }
        );
    }

    onSelect() {
        const BUTTONS = ["Option 0", "Option 1", "Delete", "Cancel"];
        const DESTRUCTIVE_INDEX = 3;
        const CANCEL_INDEX = 4;
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Testing ActionSheet"
            },
            buttonIndex => {
                // this.setState({clicked: BUTTONS[buttonIndex]});
            }
        )
    }

    renderItem({item, index}) {
        return (
            <TouchableOpacity onPress={this.onSelect}>
                <AnimatedRow delay={120 * index}>
                    <View style={styles.row}>
                        <Text style={styles.label}>{item.name}</Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={styles.valueWrapper}>
                                <Text style={styles.value}>
                                    {item.balance}
                                </Text>
                                <View style={styles.unitWrapper}>
                                    <Text style={styles.unit}>{item.symbol}</Text>
                                </View>
                            </View>
                            <Icon name='more-vertical' type="Feather" style={styles.moreIcon}/>
                        </View>
                    </View>
                </AnimatedRow>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{minHeight: 100}}>
                <BlockLoading
                    loading={this.processing}/>
                <FlatList
                    data={this.list}
                    keyExtractor={item => item.symbol}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        padding: 10,
        paddingHorizontal: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e9e9ff",
        marginBottom: 4,
        marginHorizontal: 12,
        borderRadius: 4,
        // ...getPlatformElevation(2)
    },
    moreIcon: {
        fontSize: 14,
        marginLeft: 8,
        color: Colors.primaryColor
    },
    label: {
        color: Colors.labelFont,
        fontSize: 16,
    },
    valueWrapper: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    value: {
        color: Colors.primaryColor,
        fontSize: 20,
        fontWeight: "700",
    },
    unitWrapper: {
        paddingLeft: 6,
    },
    unit: {
        color: Colors.labelFont,
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 22,
        width: 38
    }
});
