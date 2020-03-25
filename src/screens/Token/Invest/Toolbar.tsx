import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from "@constants/Colors";

interface Props {
    onBackPress: (e?: any) => void,
    item: any
}

class Toolbar extends PureComponent<Props> {
    render() {
        const {onBackPress, item} = this.props;

        if (!item) {
            return null;
        }

        return (

            <ImageBackground source={{uri: item.image}} style={styles.container}>
                <View style={styles.statusBar}/>
                <View style={styles.mask}/>
                <View style={{zIndex: 2}}>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity style={styles.backContainer} onPress={onBackPress}>
                            <Ionicons name="ios-arrow-back" size={24} color="white"/>
                            <Text style={styles.titleBackText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleWrapper}>
                        <View>
                            <Text style={styles.titleText}>Invest</Text>
                        </View>
                        <View style={styles.nameWrapper}>
                            <Text style={styles.titleNameText}>{item.name}</Text>
                            <Text style={styles.titleSymbolText}>{item.symbol}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 212,
        paddingTop: 12,
        top: -25
    },
    mask: {
        zIndex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.63)"
    },
    statusBar: {
        height: 24
    },
    toolbarContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row",
    },
    titleBackText: {
        color: "white",
        marginLeft: 8,
    },
    titleWrapper: {
        flexDirection: "row",
        paddingLeft: 36,
        paddingRight: 48,
        // paddingTop: 24,
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    nameWrapper: {
        paddingTop: 12,
        paddingLeft: 24,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    titleText: {
        fontSize: 24,
        color: "rgb(224,211,255)",
        fontWeight: "700",
        letterSpacing: 4,
    },
    titleNameText: {
        color: "white",
        fontSize: 42,
        fontWeight: "700",
        letterSpacing: 3
    },
    titleSymbolText: {
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: 1,
        color: Colors.primaryColorLight,
    },
    backContainer: {
        paddingVertical: 8,
        paddingRight: 44,
        alignItems: 'center',
        flexDirection: "row"
    }
});

export default Toolbar;