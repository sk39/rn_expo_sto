import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Layout from "@constants/Layout";
import InvestTokenState from "./InvestTokenState";
import InvestStaticInfo from "./InvestStaticInfo";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import BackButton from "@common/components/Button/BackButton";
import CashImage from "@common/components/Image/CashImage";
import Colors from "@constants/Colors";

interface Props {
    onBackPress: (e?: any) => void,
    tokenState: InvestTokenState
}

class Toolbar extends PureComponent<Props> {

    render() {
        const {onBackPress, tokenState} = this.props;
        const item = tokenState.selectedItem;
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
            <View style={styles.container}>
                <CashImage source={imageSource}/>
                <MyStatusBar dark={true} transparent/>
                <View style={styles.statusBar}/>
                <View style={styles.mask}/>
                <View style={{zIndex: 2}}>
                    <View style={styles.toolbarContainer}>
                        <BackButton onPress={onBackPress}
                                    color={Platform.OS === "ios" ? Colors.primaryLight : "white"}/>
                        <Text style={styles.titleText}>Invest Security Token</Text>
                    </View>
                </View>
                <View style={styles.infoArea}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleNameText}>{item.name}</Text>
                        <Text style={styles.titleSymbolText}>{item.symbol}</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <View style={{width: "65%"}}>
                            <InvestStaticInfo tokenState={tokenState}/>
                        </View>
                    </View>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Layout.card.imageHeightLarge,
        paddingTop: ViewUtils.getPagePaddingTop(),
        position: "relative"
    },
    mask: {
        zIndex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(29,25,66,0.83)"
    },
    statusBar: {
        height: ViewUtils.getStatusBarHeight()
    },
    toolbarContainer: {
        alignItems: 'center',
        paddingHorizontal: 6,
        flexDirection: "row",
        zIndex: 2,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.3)",
    },
    infoArea: {
        zIndex: 2,
        flex: 1,
    },
    titleWrapper: {
        paddingTop: 16,
        paddingLeft: 16,
        zIndex: 2,
    },
    nameWrapper: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    dataWrapper: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1,
        paddingBottom: 16,
        paddingRight: 16
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
        color: "white",
    },
    titleNameText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 3
    },
    titleSymbolText: {
        color: Colors.primaryLight,
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 3,
        marginTop: 2,
    }
});

export default Toolbar;
