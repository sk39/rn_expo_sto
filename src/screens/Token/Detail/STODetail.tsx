import React, {PureComponent} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Colors from "@constants/Colors";
import {observable} from "mobx";
import {inject, observer} from "mobx-react";
import TokenState from "../TokenState";
import BlockLoading from "@common/components/PageSupport/BlockLoading";
import {RootStoreProps} from "@store/RootStoreProvider";
import DetailContents from "./DetailContents";
import DetailHeader from "./DetailHeader";
import DetailFooter from "./DetailFooter";
import AnimatedCardHeader from "@common/components/CardWithModal/AnimatedCardHeader";
import DetailImage from "./DetailImage";
import MyScrollView from "@common/components/PageSupport/MyScrollView";
import {Icon} from "react-native-elements";

@inject('rootStore')
@observer
export default class STODetail extends PureComponent<NavigationProps & RootStoreProps> {

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
        this.props.navigation.pop();
    }

    showComments = () => {
        this.props.navigation.navigate("STOComment", {tokenState: this.tokenState})
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
        return (
            <View style={styles.container}>
                <AnimatedCardHeader phase={this.phase2} scrollY={this.scrollY}>
                    <DetailHeader item={this.tokenState.selectedItem}
                                  onBackPress={this.onBack}
                    />
                </AnimatedCardHeader>
                <MyScrollView scroll={this.scrollY}>
                    <DetailImage source={item.imageSource} scrollY={this.scrollY}/>
                    <DetailContents item={item}/>
                    <TouchableOpacity onPress={this.showComments} style={styles.listBtn}>
                        <Text style={{fontSize: 16, color: Colors.labelFont, fontWeight: "700"}}>Comments</Text>
                        <Icon type="feather" name="chevron-right" size={20} color={Colors.labelFont}/>
                    </TouchableOpacity>
                    <View style={{height: item.canInvest ? 56 + 24 : 24}}/>
                </MyScrollView>

                <DetailFooter item={item}
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
    listBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingVertical: 12,
        borderColor: Colors.listBorderDark,
        // borderTopWidth: 1,
        borderBottomWidth: 1
    }
});
