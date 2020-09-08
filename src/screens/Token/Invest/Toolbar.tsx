import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";
import InvestTokenState from "./InvestTokenState";
import InvestStaticInfo from "./InvestStaticInfo";
import ViewUtils from "@common/utils/ViewUtils";
import MyStatusBar from "@common/components/PageSupport/MyStatusBar";
import BackButton from "@common/components/Button/BackButton";

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
            <ImageBackground source={imageSource} style={styles.container}>
                <MyStatusBar dark={true} transparent/>
                <View style={styles.statusBar}/>
                <View style={styles.mask}/>
                <View style={{zIndex: 2}}>
                    <View style={styles.toolbarContainer}>
                        <BackButton onPress={onBackPress}/>
                    </View>
                </View>
                <View style={styles.infoArea}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleText}>Invest in</Text>
                        <Text style={styles.titleNameText}>{item.name}</Text>
                    </View>
                    <View style={styles.dataWrapper}>
                        <View style={{width: "65%"}}>
                            <InvestStaticInfo tokenState={tokenState}/>
                        </View>
                    </View>
                </View>

            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Layout.card.imageHeightLarge,
        paddingTop: ViewUtils.getPagePaddingTop(),
    },
    mask: {
        zIndex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    statusBar: {
        height: ViewUtils.getStatusBarHeight()
    },
    toolbarContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row",
        zIndex: 2
    },
    infoArea: {
        zIndex: 2,
        flex: 1,
    },
    titleWrapper: {
        paddingTop: 6,
        paddingLeft: 24,
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
        paddingBottom: 24,
        paddingRight: 16
    },
    titleText: {
        fontSize: 16,
        color: Colors.primaryColorLight2,
        fontWeight: "700",
        letterSpacing: 1,
        marginRight: 12,
    },
    titleNameText: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 3
    }
});

export default Toolbar;
