import React, {PureComponent} from 'react';
import {Animated, Platform, StyleSheet, View} from 'react-native'
import Colors from "@constants/Colors";
import {observable} from "mobx";
import {inject, observer} from "mobx-react";
import TokenState from "../TokenState";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import DetailContents from "./DetailContents";
import DetailHeader from "./DetailHeader";
import DetailFooter from "./DetailFooter";
import Layout from "@constants/Layout";
import ViewUtils from "@common/utils/ViewUtils";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import AnimatedCardHeader from "@common/components/CardWithModal/AnimatedCardHeader";
import ListItemContent from "../ListItem/ListItemContent";
import CashImage from "@common/components/Image/CashImage";
import ForDirectCard from "./ForDirectCard";

@inject('rootStore')
@observer
export default class DirectDetail extends PureComponent<NavigationProps & RootStoreProps> {

    symbol: string;
    tokenState: TokenState;

    @observable phase1 = new Animated.Value(1);
    @observable phase2 = new Animated.Value(1);
    @observable scrollY = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.tokenState = new TokenState(props.navigation, props.rootStore);
        this.symbol = this.props.navigation.state.params.symbol;
        this.loadData().then();
    }

    async loadData() {
        const item = await this.tokenState.get(this.symbol);
        this.tokenState.selectItem(item);
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {selectedItem} = this.tokenState;
        if (!selectedItem) {
            return (
                <View style={styles.container}>
                    <BlockLoading loading/>
                </View>
            )
        }

        const item = selectedItem;
        const {image, localImage} = item;
        let imageSource;
        if (image) {
            imageSource = {uri: image}
        } else {
            imageSource = localImage
        }

        return (
            <View style={styles.container}>
                <AnimatedCardHeader phase={this.phase2} scrollY={this.scrollY}>
                    <DetailHeader item={this.tokenState.selectedItem}
                                  onBackPress={this.onBack}
                    />
                </AnimatedCardHeader>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: this.scrollY,
                                        },
                                    },
                                },
                            ],
                            {useNativeDriver: true})
                    }
                >
                    <View style={styles.cardWrapper}>
                        <ForDirectCard style={styles.card}
                                       imageWrapperStyle={styles.imageWrapper}
                                       scrollY={this.scrollY}>
                            <CashImage
                                style={styles.image}
                                source={imageSource}
                            />
                            <ListItemContent item={item}/>
                        </ForDirectCard>
                    </View>

                    <DetailContents selectedItem={this.tokenState.selectedItem}/>
                </Animated.ScrollView>

                <DetailFooter selectedItem={this.tokenState.selectedItem}
                              tokenState={this.tokenState}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.back
    },
    header: {
        position: "absolute",
        backgroundColor: Colors.toolBarInverse,
        zIndex: 1,
        width: Layout.window.width,
        paddingTop: ViewUtils.getStatusBarHeight(),
    },
    cardWrapper: {
        ...Platform.select({
            ios: {
                ...getPlatformElevation(2)
            }
        })
    },
    card: {
        // borderWidth: 0,
        overflow: 'hidden',
        backgroundColor: Colors.cardBack,
        ...Platform.select({
            android: {
                ...getPlatformElevation(2)
            }
        })
    },
    imageWrapper: {
        overflow: 'hidden',
        backgroundColor: "#0f153c",
        padding: 0,
        width: "100%",
        height: Layout.card.imageHeightLarge,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null
    },
});
