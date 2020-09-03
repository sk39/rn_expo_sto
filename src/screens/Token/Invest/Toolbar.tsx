import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from "@constants/Colors";
import {STO} from "@common/model/domainModel";
import Layout from "@constants/Layout";

interface Props {
    onBackPress: (e?: any) => void,
    item: STO
}

class Toolbar extends PureComponent<Props> {
    render() {
        const {onBackPress, item} = this.props;
        if (!item) {
            return null;
        }

        const {image, localImage} = item;
        let imageSource;
        if (image) {
            imageSource = {uri: image}
        } else {
            imageSource = localImage
        }

        return (
            <ImageBackground source={imageSource} style={styles.container}>
                <View style={styles.statusBar}/>
                <View style={styles.mask}/>
                <View style={{zIndex: 2}}>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity style={styles.backContainer} onPress={onBackPress}>
                            <Ionicons name="ios-arrow-back" size={22} color="white"/>
                            <Text style={styles.titleBackText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>Invest</Text>
                    <Text style={styles.titleNameText}>{item.name}</Text>
                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Layout.window.height - 400,
        width: null,
        paddingTop: 36,
        paddingBottom: 24,
        // paddingTop: 12,
        top: -25
    },
    mask: {
        zIndex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    statusBar: {
        height: 24
    },
    toolbarContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row",
        zIndex: 2
    },
    titleBackText: {
        color: "white",
        marginLeft: 8,
    },
    titleWrapper: {
        position: "absolute",
        left: 36,
        bottom: 36,
        zIndex: 2,
    },
    nameWrapper: {
        paddingTop: 4,
        paddingLeft: 24,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    titleText: {
        fontSize: 18,
        color: Colors.primaryColorLight,
        fontWeight: "700",
        letterSpacing: 2,
    },
    titleNameText: {
        color: "white",
        fontSize: 26,
        fontWeight: "700",
        letterSpacing: 3
    },
    backContainer: {
        paddingVertical: 8,
        paddingRight: 44,
        alignItems: 'center',
        flexDirection: "row"
    }
});

export default Toolbar;
