import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "@constants/Colors";
import {STO} from "@common/model/domainModel";

interface Props {
    item: STO;
}

export default class Header extends PureComponent<Props> {

    render() {
        const {name, symbol, description} = this.props.item;
        return (
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 6,
        backgroundColor: "white"
    },
    nameContainer: {
        paddingTop: 8,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    descriptionContainer: {
        paddingVertical: 4,
        paddingHorizontal: 12
    },
    title: {
        color: Colors.font,
        fontSize: 16,
        fontWeight: "700"
    },
    symbol: {
        color: Colors.primary,
        fontSize: 14,
        marginLeft: 12,
        fontWeight: "700"
    },
    description: {
        color: Colors.labelFont,
        fontSize: 14
    }
});

